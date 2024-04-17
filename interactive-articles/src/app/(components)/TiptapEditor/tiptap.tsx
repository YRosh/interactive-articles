"use client";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./tiptap.module.css";
import MultipleChoice from "@/app/utils/extensions/multipleChoice";

const MenuBar = () => {
   const { editor } = useCurrentEditor();

   if (!editor) {
      return null;
   }

   return (
      <div className={styles.menuContainer}>
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
                     `<multiple-choice-question>Temp</multiple-choice-question>`
                  )
                  .run()
            }
         >
            add mcq
         </button>
      </div>
   );
};

const Tiptap = () => {
   const extensions = [StarterKit, MultipleChoice];
   const content = `<multiple-choice-question>Temp 
   <input
   type="radio"
   name="option"
/></multiple-choice-question>`;

   return (
      <div className={styles.editorContainer}>
         <h1>Create Quiz</h1>
         <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={content}
            children={undefined}
         ></EditorProvider>
      </div>
   );
};

export default Tiptap;
