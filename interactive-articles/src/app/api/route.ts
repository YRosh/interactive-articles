import { updateQuestions, getQuestions } from "./data";

// POST request handler to update the question & answers
export async function POST(request: Request) {
   const { id, question, answer } = await request.json();

   // updating the questions object with new data
   const updatedQuestions = { ...getQuestions(), [id]: { question, answer } };
   updateQuestions(updatedQuestions);

   console.log(getQuestions());

   // returning the response with the updates questions object
   return new Response(JSON.stringify(updatedQuestions), {
      headers: {
         "Content-Type": "application/json",
      },
      status: 201,
   });
}
