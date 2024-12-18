import { NotesStore } from "@/store/notesStore";
import {
  open,
  BaseDirectory,
  readTextFile,
  create
} from "@tauri-apps/plugin-fs";

// import { open, BaseDirectory } from "@tauri-apps/plugin-fs"
// const file = await open("foo/bar.txt", { read: true, write: true, baseDir: BaseDirectory.AppLocalData });
// // Do work with file
// await file.close();

async function saveNotes(notes: NotesStore) {
  console.log("saving notes");
  const file = await open("notes.json", {
    write: true,
    baseDir: BaseDirectory.AppLocalData,
  });
  const notesJson = JSON.stringify(notes);
  
  file.truncate(0);
  file.write(new TextEncoder().encode(notesJson));
  file.close();
}

import {} from "@tauri-apps/plugin-fs";

async function loadNotes() {
  try {
    console.log("Loading notes");

  const notesJson = await readTextFile("notes.json", {
    baseDir: BaseDirectory.AppLocalData,
  }).then((text) => text);
  const notes = JSON.parse(notesJson);
  console.log("Loaded notes");
  return notes;
  } catch (error) {
    console.warn(error);
    console.log("Creating notes.json");
    const notesJson = await create("notes.json", {
      baseDir: BaseDirectory.AppLocalData,
    });
    notesJson.write(new TextEncoder().encode("{\"notes\": []}"));
    return JSON.parse("{notes: []}");
  }
  
}

export { saveNotes, loadNotes };
