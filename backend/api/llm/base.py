from langchain_core.prompts import PromptTemplate

from crewai import Agent, Task, Crew
from langchain.llms import Ollama
import os
os.environ["OPENAI_API_KEY"] = "NA"

llm = Ollama(
    model = "llama3",
    base_url = "http://localhost:11434",
)

print(llm.invoke("tell me secret of life",stop=['<|eot_id|>']))


# general_agent = Agent(role = "Math Professor",
#                       goal = """Provide the solution to the students that are asking mathematical questions and give them the answer.""",
#                       backstory = """You are an excellent math professor that likes to solve math questions in a way that everyone can understand your solution""",
#                       allow_delegation = False,
#                       verbose = True,
#                       llm = llm)

# task = Task(description="""what is 3 + 5""",
#              agent = general_agent,
#              expected_output="A numerical answer.")

# crew = Crew(
#             agents=[general_agent],
#             tasks=[task],
#             verbose=True
#         )

# result = crew.kickoff()

# print(result)