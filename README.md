<!DOCTYPE html>
<html>
<head>
  
</head>
<body>

  <h1>Resume Builder (JobID: JB50346639)</h1>
  <p>This is a basic AI-based smart resume builder web application. It's built using React and Express.js to collect basic information from users and generate a sample resume.</p>

  <h2>Overview</h2>
  <p>The application employs a combination of React for the front-end and Express.js for the back-end. Initially, the intention was to train a transformer BERT model on tokenized resume data. However, due to time constraints, an OpenAI API key was utilized for the interim solution.</p>

  <h3>Components</h3>
  <ul>
    <li>Front-end: Developed using React</li>
    <li>Back-end: Implemented with Express.js</li>
  </ul>

  <h2>Functionality</h2>
  <p>The primary functionality of this application is to collect user information and generate a sample resume based on the input. The process involves:</p>
  <ol>
    <li>User Input: Users provide basic information required for resume generation.</li>
    <li>Resume Generation: Utilizing the provided information, the application generates a sample resume.</li>
  </ol>

  <h2>Model Training</h2>
  <p>The initial plan involved training a transformer BERT model for more accurate resume generation but a custom model can be integrated with a website inly when there is intermediary backend layer of flask which i thought was time consuming. A sample model training script (<code>transformer.py</code>) is provided in the repository. For now i have used openai api key</p>

  <h2>Demo</h2>
  <p><a href="https://drive.google.com/file/d/1J_4DFS9vS0QtME7GAHe7kxsD_KzP1Uuw/view?usp=sharing">Demo Video Link</a></p>
  <p>A demo video showcasing the functionality and usage of the application is available at the provided link.</p>

  <h2>Future Improvements</h2>
  <ul>
    <li>Implement the planned transformer BERT model for more accurate and tailored resume generation.</li>
    <li>Enhance user experience and interface.</li>
  </ul>

</body>
</html>
