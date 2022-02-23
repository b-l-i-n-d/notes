import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Notes from './components/Notes';
import Sidebar from './components/Sidebar';
import notesData from './mock_data.json';
import './tailwind.css';

function App() {
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
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis beatae amet exercitationem vel eius quaerat fugiat nihil quae. Repellat, eaque.',
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    function updateTitle(event) {
        setNotes((oldNotes) => {
            const newArray = [];
            oldNotes.forEach((oldNote) => {
                if (oldNote.id === currentNoteId) {
                    newArray.unshift({
                        ...oldNote,
                        title: event.target.value.replace(/[\r\n]+/gm, ''),
                        modify_date: new Date().toDateString(),
                        modify_time: new Date().toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                    });
                } else {
                    newArray.push(oldNote);
                }
            });
            return newArray;
        });
    }

    function updateBody(body) {
        setNotes((oldNotes) => {
            const newArray = [];
            oldNotes.forEach((oldNote) => {
                if (oldNote.id === currentNoteId) {
                    newArray.unshift({
                        ...oldNote,
                        body,
                        modify_date: new Date().toDateString(),
                        modify_time: new Date().toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                    });
                } else {
                    newArray.push(oldNote);
                }
            });
            return newArray;
        });
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

            <div className="flex basis-[57.1428571%] bg-white px-10">
                <Editor
                    currentNoteId={currentNoteId}
                    currentNote={findCurrentNote()}
                    // eslint-disable-next-line react/jsx-no-bind
                    updateBody={updateBody}
                    // eslint-disable-next-line react/jsx-no-bind
                    updateTitle={updateTitle}
                />
            </div>
        </div>
    );
}

export default App;
