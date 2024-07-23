import os
from langchain.prompts import PromptTemplate
from crewai import Agent, Task, Crew
from langchain.llms import Ollama

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

# Gerando o prompt
custom_prompt = prompt_template.format(question="What is the secret of life?")

# Invocando o modelo com o prompt customizado
response = llm.invoke(custom_prompt, stop=['<|eot_id|>'])
# response = llm.invoke(custom_prompt, stop=[''])
print(response)
