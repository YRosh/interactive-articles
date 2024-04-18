// Volatile data storage to store the answers given by students for each question

let questions: { [id: string]: { question: string; answer: string } } = {};

export function getQuestions() {
   return questions;
}

export function updateQuestions(newQuestions: typeof questions) {
   questions = newQuestions;
}
