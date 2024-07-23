import os
from flask import Flask, request, jsonify
from langchain.prompts import PromptTemplate
from crewai import Agent, Task, Crew
from langchain.llms import Ollama

app = Flask(__name__)

# Configuração da API Key e URL
os.environ["OPENAI_API_KEY"] = "NA"

# Inicialização do modelo Ollama
llm = Ollama(
    model="llama3",
    base_url="http://localhost:11434",
)

# Definição do template do prompt
prompt_template = PromptTemplate(
    input_variables=["question"],
    template="As a wise AI, can you tell me the secret of life? Please provide a detailed and insightful response to the following question: {question}"
)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question', '')

    if not question:
        return jsonify({"error": "No question provided"}), 400

    # Gerando o prompt
    custom_prompt = prompt_template.format(question=question)

    # Invocando o modelo com o prompt customizado
    response = llm.invoke(custom_prompt, stop=['<|eot_id|>'])
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
