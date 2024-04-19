const fs = require("fs");

interface questions {
   [id: string]: { question: string; answer: string };
}

export function getQuestions() {
   try {
      const data = fs.readFileSync("./src/app/api/data.json", "utf8");
      return JSON.parse(data);
   } catch (err) {
      console.error("Error reading JSON file:", err);
      return {};
   }
}

export function updateQuestions(newQuestions: questions) {
   try {
      const jsonData = JSON.stringify(newQuestions, null, 2);
      fs.writeFileSync("./src/app/api/data.json", jsonData);
   } catch (err) {
      console.error("Error writing JSON file:", err);
   }
}
