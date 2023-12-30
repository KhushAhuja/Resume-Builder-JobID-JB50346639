import torch
from transformers import AutoTokenizer, AutoModelForMaskedLM, Trainer, TrainingArguments


resume_data = [
    "Summary: Experienced software engineer proficient in various programming languages...",
    "Education: Master of Science in Computer Science, XYZ University...",
    "Experience: Software Developer at ABC Corp...",
    
]

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForMaskedLM.from_pretrained("bert-base-uncased")

tokenized_data = tokenizer(resume_data, padding=True, truncation=True, return_tensors="pt")

training_args = TrainingArguments(
    output_dir="./resume_model",
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=8,
    save_steps=500,
    save_total_limit=2,
    logging_dir="./logs",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_data,
)

trainer.train()

# Generation of text

generated_resume = model.generate(
    input_ids=tokenizer.encode("Summary:", return_tensors="pt"),
    max_length=100,
    num_return_sequences=1,
    temperature=0.7,
)

decoded_resume = tokenizer.decode(generated_resume[0], skip_special_tokens=True)
print(decoded_resume)
