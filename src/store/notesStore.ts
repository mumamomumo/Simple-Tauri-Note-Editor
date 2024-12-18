import { create } from "zustand";
import { saveNotes } from "@/data/notesStorage";

export type NotesStore = {
  notes: Array<{ id: number; title: string; content: string }>;
  addNote: (title: string, content: string) => void;
  removeNote: (id: number) => void;
  updateNote: (id: number, title: string, content: string) => void;
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  addNote: (title?: string, content?: string) => {
    const newNote = {
      id: Date.now(),
      title: title ? title : "Untitled",
      content: content ? content : "",
    };

    set((state) => ({
      notes: [...state.notes, newNote],
    }));
    saveNotes(useNotesStore.getState());
    return newNote;
  },

  removeNote: (id: number) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
    saveNotes(useNotesStore.getState());

  },

  updateNote: (id: number, title: string, content: string) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === id) {
          return { ...note, title, content };
        }
        return note;
      }),
    }));
    saveNotes(useNotesStore.getState());
  },
}));
