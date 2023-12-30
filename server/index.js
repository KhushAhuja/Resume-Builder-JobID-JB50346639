const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const port = 4000;
const apikey = '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';

const configuration = new Configuration({
    apiKey: apikey,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); //for parsing form data from client so that the server can understand it
app.use("/uploads",express.static("uploads")); //for serving static files

const storage = multer.diskStorage({
    destination: (res,file,cb) => {
        cb(null, "uploads");
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const generateID = () => Math.random().toString(36).substring(2, 10);

const upload = multer({storage: storage,limits: {fileSize: 1024*1024*5}}); //1mb

const database =[];

const GPTFunction = async (text) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: text,
            max_tokens: 250, // Use 'max_tokens' instead of 'maxTokens'
            temperature: 0.6,
            top_p: 1,
            presence_penalty: 1, // Use snake_case instead of camelCase
            frequency_penalty: 1, // Use snake_case instead of camelCase
        });
        return response.choices[0].text;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


app.get('/', (req, res) => {
    console.log("Hello World");
    res.send('Hello World');
});

app.post("/resume/create", upload.single("headShotImage"), async(req,res) => {
    const {fullName, currentPosition, currentLength, currentTechnologies, workHistory} = req.body;
    const workArray = JSON.parse(workHistory);

    const newEntry = {
        id: generateID(),
        fullName,
        image_url: `http://localhost:4000/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray
    }

    const prompt1 = `I am writing a resume, my details are as follows: \n\nName: ${fullName}\n\nCurrent Position: ${currentPosition}\n\nLength of Current Position: ${currentLength}\n\nTechnical Skills: ${currentTechnologies}\n\n. Can you write a 50 word description for the top of the resume(first person writing)? `;

    const prompt2 = `I am writing a resume, my details are as follows: \n\nName: ${fullName}\n\nCurrent Position: ${currentPosition}\n\nLength of Current Position: ${currentLength}\n\nTechnical Skills: ${currentTechnologies}\n\n. Can you write 5 points for what i am good at? `;

    const remainderText =() => {
        let stringText = "";
        for(let i=0;i<workArray.length;i++) {
            stringText += `\n\nCompany Name: ${workArray[i].name}\n\nPosition: ${workArray[i].position}\n\n`;
        }
        return stringText;
    }

    const prompt3 = `I am writing a resume, my details are as follows: \n\nName: ${fullName}\n\nCurrent Position: ${currentPosition}\n\nLength of Current Position: ${currentLength}\n\nTechnical Skills: ${currentTechnologies}\n\n. Can you write a 30 word description for each of my previous positions in first person? ${remainderText()}`;
    console.log("resume/create");

    const objective = await GPTFunction(prompt1);
    const keypoints = await GPTFunction(prompt2);
    const JobResponsibilities = await GPTFunction(prompt3);
    console.log("gpt worked");

    const chatgptData = {
        objective,
        keypoints,
        JobResponsibilities
    }
    const data= {
        ...newEntry,
        ...chatgptData
    }
    database.push(data);

    res.json({
        message: "Resume created successfully",
        data
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});