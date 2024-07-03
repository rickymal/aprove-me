from langchain_core.prompts import PromptTemplate
from crewai import Agent, Task, Crew
from langchain.llms import Ollama
import os

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

# Agente que irá usar o modelo com o prompt personalizado
class CustomAgent(Agent):
    def run(self, task: Task):
        question = task.inputs["question"]
        custom_prompt = prompt_template.format(question=question)
        response = llm.invoke(custom_prompt, stop=[''])
        return response

# Definindo a tarefa
task = Task(
    agent=CustomAgent(
        role="AI assistant",
        goal="Provide insightful answers to complex questions",
        backstory="An advanced AI developed to assist with answering philosophical questions and offering wisdom."
    ),
    description="A task to ask the AI about the secret of life",
    inputs={"question": "What is the secret of life?"}
)

# Criando o Crew e adicionando a tarefa
crew = Crew()
crew.add_task(task)

# Executando as tarefas do Crew
results = crew.execute_tasks()

# Print dos resultados
print(results)
