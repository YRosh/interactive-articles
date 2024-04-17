import { type Node } from "@tiptap/pm/model";
import {
   NodeViewWrapper,
   NodeViewContent,
   NodeViewContentProps,
} from "@tiptap/react";
import React, { useEffect, useState } from "react";
import styles from "./multipleChoiceComp.module.css";

const MultipleChoiceComp = ({
   node,
   updateAttributes,
}: NodeViewContentProps) => {
   const { question, options } = node.attrs;

   const handleQuestionChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();
      console.log(e);
      //   updateAttributes({
      //      question: e.target.textContent || "",
      //   });
   };

   console.log(question);

   const handleOptionChange = (
      index: number,
      e: React.FocusEvent<HTMLDivElement>
   ) => {
      console.log(e);
      const newOptions = [...options];
      newOptions[index] = e.target.textContent || "";
      updateAttributes({
         options: newOptions,
      });
   };

   const onKeydown = () => {
      console.log("fkrebgfs");
   };

   return (
      <NodeViewWrapper className="multiple-choice-question">
         <div className={styles.questionContainer}>
            <NodeViewContent
            //    contentEditable
            //    onKeyDown={(e) => handleQuestionChange(e)}
            //    dangerouslySetInnerHTML={{ __html: question }}
            //    suppressContentEditableWarning
            ></NodeViewContent>
            <div className={styles.optionsContainer}>
               {options.map((option: string, idx: number) => (
                  <div key={idx} className={styles.option}>
                     <input
                        type="radio"
                        id={`option-${idx}`}
                        name="option"
                        value={option}
                     />
                     <div
                        contentEditable
                        onBlur={(e) => handleOptionChange(idx, e)}
                        dangerouslySetInnerHTML={{ __html: option }}
                     />
                  </div>
               ))}
            </div>
         </div>
      </NodeViewWrapper>
   );
};

export default MultipleChoiceComp;
