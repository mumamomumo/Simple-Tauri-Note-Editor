import { useEffect, useRef } from "react";

function NoteEditor(props: {
  title: string;
  content: string;
  id: number;
  updateNote: Function;
}): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const updateNote = () => {
    props.updateNote(props.id, titleRef.current!.value, contentRef.current!.value);
  };



  useEffect(() => {
    console.log("Note Editor change");
    titleRef.current!.value = props.title;
    contentRef.current!.value = props.content;
    return () => {
      console.log("Note Editor remove");
    };
  }, [props.id, props.title, props.content]);

  return (
    <div className="flex flex-col gap-4 note-editor">
      <input className="note-editor-title" ref={titleRef} onChange={updateNote} />
      <textarea className="note-editor-textarea" ref={contentRef} onChange={updateNote}/>
    </div>
  );
}

export default NoteEditor;
