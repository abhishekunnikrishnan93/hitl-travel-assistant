import os
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

# Use gpt-4o-mini as default, it's fast and suitable for this task
def get_llm():
    return ChatOpenAI(
        model="openai/gpt-4o-mini",
        temperature=0.7,
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1"
    )

def _get_chain(base_prompt_text, feedback, previous_content, llm):
    if feedback and previous_content:
        template = base_prompt_text + "\n\n--- PREVIOUS DRAFT ---\n{previous_content}\n\n--- USER FEEDBACK ---\n{feedback}\n\nPlease revise the previous draft completely based on the user feedback. Keep the formatting standards of your role."
        return PromptTemplate.from_template(template) | llm
    else:
        return PromptTemplate.from_template(base_prompt_text) | llm

def run_planner_agent(destination: str, dates: str, budget: str, feedback: str = None, previous_content: str = None) -> str:
    llm = get_llm()
    base = (
        "You are an expert travel planner. Create a day-by-day itinerary for a trip to {destination} during {dates}. "
        "The user's budget is {budget}. Keep the itinerary realistic, brief, and structured in a clean markdown format. "
        "Do not include the budget breakdown, just the day-wise plan."
    )
    chain = _get_chain(base, feedback, previous_content, llm)
    return chain.invoke({"destination": destination, "dates": dates, "budget": budget, "feedback": feedback, "previous_content": previous_content}).content

def run_budget_agent(destination: str, budget: str, itinerary: str, feedback: str = None, previous_content: str = None) -> str:
    llm = get_llm()
    base = (
        "You are an expert travel budget analyst. Based on this itinerary to {destination} and budget of {budget}:\n{itinerary}\n"
        "Provide a high-level cost breakdown (flights, accommodation, food, activities). "
        "Use markdown tables or bullet points. Keep it clear and concise."
    )
    chain = _get_chain(base, feedback, previous_content, llm)
    return chain.invoke({"destination": destination, "budget": budget, "itinerary": itinerary, "feedback": feedback, "previous_content": previous_content}).content

def run_hotel_agent(destination: str, budget_plan: str, feedback: str = None, previous_content: str = None) -> str:
    llm = get_llm()
    base = (
        "You are a travel agent. Based on the destination {destination} and the following budget context:\n{budget_plan}\n"
        "Suggest 3-5 hotel options that fit within the implied accommodation budget. Include name, approximate price per night, and a 1-sentence reason. "
        "Format as markdown bullet points."
    )
    chain = _get_chain(base, feedback, previous_content, llm)
    return chain.invoke({"destination": destination, "budget_plan": budget_plan, "feedback": feedback, "previous_content": previous_content}).content

def run_transport_agent(destination: str, itinerary: str, feedback: str = None, previous_content: str = None) -> str:
    llm = get_llm()
    base = (
        "You are a logistics expert. For a trip to {destination} with the following itinerary:\n{itinerary}\n"
        "Suggest the best modes of transport (flights to get there, and local transport options). "
        "Keep it practical and brief. Use markdown format."
    )
    chain = _get_chain(base, feedback, previous_content, llm)
    return chain.invoke({"destination": destination, "itinerary": itinerary, "feedback": feedback, "previous_content": previous_content}).content

def run_guide_agent(destination: str, itinerary: str, feedback: str = None, previous_content: str = None) -> str:
    llm = get_llm()
    base = (
        "You are a local tour guide. For a traveler visiting {destination} with this itinerary:\n{itinerary}\n"
        "Provide 3-5 essential travel tips, cultural norms to respect, and basic safety information. "
        "Keep it to the point and format as markdown."
    )
    chain = _get_chain(base, feedback, previous_content, llm)
    return chain.invoke({"destination": destination, "itinerary": itinerary, "feedback": feedback, "previous_content": previous_content}).content
