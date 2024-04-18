import { NodeViewWrapper, NodeViewContentProps } from "@tiptap/react";
import React from "react";
import styles from "./multipleChoiceComp.module.css";

const MultipleChoiceComp = ({
   node,
   updateAttributes,
   deleteNode,
}: NodeViewContentProps) => {
   const { id, question, options, isEdit } = node.attrs;

   // handle to change the question in this MCQ node
   const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuestion = e.target.value || "";
      if (newQuestion.length === 0) {
         deleteNode();
      } else {
         updateAttributes({
            question: newQuestion,
         });
      }
   };

   // handler to update an option for this question
   const handleOptionChange = (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const newOptions = [...options];
      newOptions[index] = e.target.value || "";
      if (newOptions[index].length == 0) {
         newOptions.splice(index, 1);
      }
      updateAttributes({
         options: newOptions,
      });
   };

   // Handler to add new options when the enter key is pressed
   const onKeydown = (
      idx: number,
      event: React.KeyboardEvent<HTMLInputElement>
   ) => {
      if (event?.key === "Enter") {
         const newOptions = [...options];
         newOptions.splice(idx + 1, 0, "New option");
         updateAttributes({
            options: newOptions,
         });
      }
   };

   // Post request to update the student answer
   const handleOptionSelect = async (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      await fetch("/api", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ id, question, answer: event?.target?.value }),
      });
   };

   return (
      <NodeViewWrapper className="multiple-choice-question">
         <div className={styles.questionContainer}>
            <input
               value={question}
               onChange={(e) => handleQuestionChange(e)}
               onKeyDown={(e) => onKeydown(-1, e)}
               disabled={!isEdit}
            />
            <div className={styles.optionsContainer}>
               {options.map((option: string, idx: number) => (
                  <div key={idx} className={styles.option}>
                     <input
                        type="radio"
                        id={`${id}-option-${idx}`}
                        name={`${id}-option`}
                        value={option}
                        disabled={isEdit} // Radio buttons are disabled when the teacher is editing question
                        onChange={handleOptionSelect}
                     />
                     <input
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e)}
                        onKeyDown={(e) => onKeydown(idx, e)}
                        disabled={!isEdit}
                     />
                  </div>
               ))}
            </div>
         </div>
      </NodeViewWrapper>
   );
};

export default MultipleChoiceComp;
