import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Notes from './components/Notes';
import Sidebar from './components/Sidebar';
import notesData from './mock_data.json';
import './tailwind.css';

function App() {
    // eslint-disable-next-line no-unused-vars
    const [notes, setNotes] = useState(notesData);

    const [currentNoteId, setCurrentNoteId] = useState();

    function findCurrentNote() {
        return notes.find((note) => note.id === currentNoteId);
    }

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            modify_date: new Date().toDateString(),
            modify_time: new Date().toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            }),
            folder: '',
            title: 'Add your note',
            note: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis beatae amet exercitationem vel eius quaerat fugiat nihil quae. Repellat, eaque.',
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    return (
        <div className="flex h-screen w-full flex-row overflow-hidden">
            <div className="basis-[21.4285714%] bg-[#FBFBFB]">
                <Sidebar />
            </div>

            <div className="flex basis-[21.4285714%] bg-white">
                <Notes
                    notes={notes}
                    createNewNote={() => createNewNote}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                />
            </div>

            <div className="divider divider-horizontal m-0 w-1" />

            <div className="basis-[57.1428571%] bg-white px-10">
                <Editor currentNoteId={currentNoteId} currentNote={findCurrentNote()} />
            </div>
        </div>
    );
}

export default App;
