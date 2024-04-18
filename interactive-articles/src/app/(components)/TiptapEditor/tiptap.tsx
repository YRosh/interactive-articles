"use client";

import { useState, useEffect } from "react";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./tiptap.module.css";
import MultipleChoice from "@/app/utils/extensions/multipleChoice";

// Editor menu bar component
const MenuBar = ({
   mode,
   onModeChange,
   editor,
}: {
   mode: string;
   onModeChange: React.ChangeEventHandler<HTMLInputElement>;
   editor: Editor;
}) => {
   if (!editor) {
      return null;
   }

   return (
      <div className={styles.menuContainer}>
         <div>
            <button
               onClick={() => editor.chain().focus().toggleBold().run()}
               disabled={!editor.can().chain().focus().toggleBold().run()}
               className={editor.isActive("bold") ? "is-active" : ""}
            >
               bold
            </button>
            <button
               onClick={() => editor.chain().focus().toggleItalic().run()}
               disabled={!editor.can().chain().focus().toggleItalic().run()}
               className={editor.isActive("italic") ? "is-active" : ""}
            >
               italic
            </button>
            <button
               onClick={() =>
                  editor
                     .chain()
                     .focus()
                     .insertContentAt(
                        editor.state.selection.anchor,
                        `<multiple-choice-question id=${Date.now()}></multiple-choice-question>`
                     )
                     .run()
               }
            >
               add mcq
            </button>
         </div>
         <div className={styles.switch}>
            <div>Mode: {mode}</div>
            <input type="checkbox" id="toggle-btn" onChange={onModeChange} />
            <label htmlFor="toggle-btn"></label>
         </div>
      </div>
   );
};

const Tiptap = () => {
   const [isEdit, setIsEdit] = useState<boolean>(true);
   const mode = isEdit ? "Edit" : "View";

   // creating the tiptap editor
   const editor = useEditor({
      extensions: [StarterKit, MultipleChoice],
      content: `<multiple-choice-question></multiple-choice-question>`,
   });

   // updating the attributes of all MCQ nodes when the mode is change to View for students
   useEffect(() => {
      if (editor) {
         const transaction = editor.state.tr; // transaction object of the editor
         // iterating through all the nodes of the editor
         editor.state.doc.descendants((node, pos) => {
            // if the node is of type multipleChoiceQuestion updating its isEdit attribute
            if (node.type.name === "multipleChoiceQuestion") {
               transaction.setNodeMarkup(pos, null, {
                  ...node.attrs,
                  isEdit,
               });
            }
         });
         // applying the transaction to change the attributes of all MCQ nodes
         if (transaction.docChanged) {
            editor.view.updateState(editor.state.apply(transaction));
         }
      }
   }, [isEdit]);

   // function to update the isEdit state
   const onModeChange = () => {
      setIsEdit(!isEdit);
   };

   if (!editor) {
      return null;
   }

   return (
      <div className={styles.editorContainer}>
         <h1>Create Quiz</h1>
         <MenuBar mode={mode} onModeChange={onModeChange} editor={editor} />
         <EditorContent editor={editor} />
      </div>
   );
};

export default Tiptap;
