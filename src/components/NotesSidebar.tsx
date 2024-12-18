import { Trash2, FilePlus2 } from "lucide-react";

function NotesSidebar(props: {
  setOpenNote: Function;
  addNote: Function;
  currentNote: any;
  removeNote: Function;
  notes: any;
}) {
  const notes = props.notes;

  const setOpenNote = props.setOpenNote;
  const addNote = props.addNote;
  const removeNote = props.removeNote;
  const current = props.currentNote;

  return (
    <aside className="flex flex-col gap-4 notes-sidebar">
      <div className="flex flex-row gap-4 notes-sidebar-header">
        <Trash2
          className="notes-delete"
          onClick={() => {
            setOpenNote(
              notes[
                notes.indexOf(current) == 0
                  ? 1
                  : notes.indexOf(current) - 1
              ]
            );
            removeNote(current.id);
          }}
        />
        <h1 className="text-2xl font-bold ">Notes</h1>
        <FilePlus2
          className="notes-add"
          onClick={() => {
            const newNote = addNote();
            setOpenNote(newNote);
          }}
        />
      </div>
      {/* Notes List */}
      <div className="notes-list">
        {notes.map((note) => (
          <div
            className="note-side"
            onClick={() => setOpenNote(note)}
            key={note.id}
          >
            <h2 className="note-side-title">{note.title}</h2>
            <p className="note-side-content">{note.content}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default NotesSidebar;
