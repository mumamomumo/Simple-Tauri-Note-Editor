import "./App.css";

import { useEffect, useState } from "react";
import NotesSidebar from "./components/NotesSidebar";
import TitleBar from "./components/TitleBar";
import NoteEditor from "./components/NoteEditor";
import { useNotesStore } from "./store/notesStore";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "./components/ui/resizable";

import { loadNotes } from "./data/notesStorage";

export default function App() {
  const [openNote, setOpenNote] = useState(null);
  const notes = useNotesStore((state) => state.notes);
  const addNote = useNotesStore((state) => state.addNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const removeNote = useNotesStore((state) => state.removeNote);

  async function getSavedNotes() {
    const notes = await loadNotes();
    useNotesStore.setState((prev) => {
      return { ...prev, notes: notes.notes };
    });

  }

  useEffect(() => {
    getSavedNotes();
    
  }, []);

  return (
    <div>
      <TitleBar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={25}>
          <NotesSidebar
            notes={notes}
            setOpenNote={setOpenNote}
            addNote={addNote}
            removeNote={removeNote}
            currentNote={openNote}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={40}>
          {openNote ? (
            <NoteEditor
              title={openNote?.title}
              content={openNote?.content}
              id={openNote.id}
              updateNote={updateNote}
            />
          ) : (
            <div className="no-note">No note selected</div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
