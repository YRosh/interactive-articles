import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MultipleChoiceComp from "@/app/(components)/MultipleChoiceComp/multipleChoiceComp";

// creating new node of type multipleChoiceQuestion
export default Node.create({
   name: "multipleChoiceQuestion",
   group: "block",
   content: "inline*",
   addAttributes() {
      return {
         question: { default: "New question..." },
         options: { default: ["Option 1", "Option 2"] },
         isEdit: { default: true }, // 'edit' or 'view'
         id: { default: Date.now() },
      };
   },
   parseHTML() {
      return [
         {
            tag: "multiple-choice-question",
         },
      ];
   },
   renderHTML({ HTMLAttributes }) {
      return ["multiple-choice-question", mergeAttributes(HTMLAttributes), 0];
   },
   addNodeView() {
      return ReactNodeViewRenderer(MultipleChoiceComp);
   },
});
