import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { themeChange } from 'theme-change';
import { createNote, getNotes } from './actions/notes';
import './App.css';
import Editor from './components/Editor';
import Notes from './components/Notes';
import Sidebar from './components/Sidebar';
import './tailwind.css';

function App() {
    const [currentNoteId, setCurrentNoteId] = useState(null);

    const [filter, setFilter] = useState('All');

    const dispatch = useDispatch();

    const FILTER_MAP = {
        All: () => true,
        'My Notes': (note) => note.folder === 'My Notes',
        'Todo list': (note) => note.folder === 'Todo list',
        Projects: (note) => note.folder === 'Projects',
        Journal: (note) => note.folder === 'Journal',
        'Reading list': (note) => note.folder === 'Reading list',
    };

    useEffect(() => {
        themeChange(false);
    }, []);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    const createNewNote = () => {
        const newNote = {
            id: nanoid(),
            modify_date: new Date().toDateString(),
            modify_time: new Date().toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            }),
            created_by: 'Anonymous',
            folder: filter === 'All' ? 'My Notes' : filter,
            title: 'Add your note',
            body: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis beatae amet exercitationem vel eius quaerat fugiat nihil quae. Repellat, eaque.</p>',
        };
        setCurrentNoteId(newNote.id);
        dispatch(createNote(newNote));
    };

    // function updateTitle(event) {
    //     setNotes((oldNotes) => {
    //         const newArray = [];
    //         oldNotes.forEach((oldNote) => {
    //             if (oldNote.id === currentNoteId) {
    //                 newArray.unshift({
    //                     ...oldNote,
    //                     title: event.target.value.replace(/[\r\n]+/gm, ''),
    //                     modify_date: new Date().toDateString(),
    //                     modify_time: new Date().toLocaleTimeString(undefined, {
    //                         hour: '2-digit',
    //                         minute: '2-digit',
    //                     }),
    //                 });
    //             } else {
    //                 newArray.push(oldNote);
    //             }
    //         });
    //         return newArray;
    //     });
    // }

    // function updateBody(body) {
    //     setNotes((oldNotes) => {
    //         const newArray = [];
    //         oldNotes.forEach((oldNote) => {
    //             if (oldNote.id === currentNoteId) {
    //                 newArray.unshift({
    //                     ...oldNote,
    //                     body,
    //                     modify_date: new Date().toDateString(),
    //                     modify_time: new Date().toLocaleTimeString(undefined, {
    //                         hour: '2-digit',
    //                         minute: '2-digit',
    //                     }),
    //                 });
    //             } else {
    //                 newArray.push(oldNote);
    //             }
    //         });
    //         return newArray;
    //     });
    // }

    return (
        <div className="flex h-screen w-full flex-row overflow-hidden">
            <div className="w-[21.4285714%] bg-base-200">
                <Sidebar setFilter={setFilter} filter={filter} />
            </div>

            <div className="flex w-[21.4285714%] bg-base-100">
                <Notes
                    createNewNote={createNewNote}
                    currentNoteId={currentNoteId}
                    setCurrentNoteId={setCurrentNoteId}
                    filter={filter}
                    FILTER_MAP={FILTER_MAP}
                />
            </div>

            <div className="divider divider-horizontal m-0 w-1" />

            <div className="flex w-[57.1428571%] bg-base-100 px-10">
                <Editor
                    currentNoteId={currentNoteId}
                    // eslint-disable-next-line react/jsx-no-bind
                    // updateBody={updateBody}
                    // eslint-disable-next-line react/jsx-no-bind
                    // updateTitle={updateTitle}
                    setFilter={setFilter}
                />
            </div>
        </div>
    );
}

export default App;
