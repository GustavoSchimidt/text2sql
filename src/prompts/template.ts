export function createSqlPromptTemplate(
  tableSchemas: string,
  question: string,
): string {
  const promptTemplate: string = `
    You are a MySQL expert.
    
    Please help to generate a MySQL query to answer the question. Your response should ONLY be based on the given context and follow the response guidelines and format instructions.
    
    ===Tables
    ${tableSchemas}
    
    ===Response Guidelines
    1. If the provided context is sufficient, please generate a valid query without any explanations for the question. The query should start with a comment containing the question being asked.
    2. If the provided context is insufficient, please explain why it can't be generated.
    3. Please use the most relevant table(s).
    5. Please format the query before responding.
    6. Please always respond with a valid well-formed JSON object with the following format
    
    ===Response Format
    {
        "query": "A generated SQL query when context is sufficient.",
        "explanation": "An explanation of failing to generate the query."
    }
    
    ===Question
    ${question}
    `;

  return promptTemplate;
}
