import parse from 'html-react-parser';
// import { nanoid } from 'nanoid';
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useDispatch } from "react-redux";

function Notes({ notes, createNewNote, currentNote, setCurrentNoteId, filter, FILTER_MAP }) {
    const allNotes = notes;
    // const dispatch = useDispatch();

    // const createNote = () => {
    //     const newNote = {
    //         id: nanoid(),
    //         modify_date: new Date().toDateString(),
    //         modify_time: new Date().toLocaleTimeString(undefined, {
    //             hour: '2-digit',
    //             minute: '2-digit',
    //         }),
    //         created_by: 'Anonymous',
    //         folder: filter === 'All' ? 'My Notes' : filter,
    //         title: 'Add your note',
    //         body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis beatae amet exercitationem vel eius quaerat fugiat nihil quae. Repellat, eaque.',
    //     };
    //     dispatch(createNote(newNote));
    // };

    const noteElements = allNotes.filter(FILTER_MAP[filter]).map((note) => (
        <div
            key={note.id}
            className={`space-y-2 rounded-lg p-3 shadow-md transition-all duration-300 ${
                currentNote && note.id === currentNote.id
                    ? `bg-primary text-primary-content shadow-primary/50`
                    : ''
            }`}
            onClick={() => setCurrentNoteId(note.id)}
            aria-hidden="true"
        >
            <div className="text-xs uppercase">{note.modify_date}</div>
            <div className="text-lg font-semibold leading-tight line-clamp-2">{note.title}</div>
            <div className="line-clamp-3">{parse(note.body)}</div>
        </div>
    ));

    return (
        <div className="w-full px-4 py-5">
            <div className="pb-5 text-3xl font-bold">Notes</div>
            <button
                type="button"
                className="btn btn-ghost mb-5 w-full space-x-2 bg-base-200 hover:bg-base-300"
                onClick={createNewNote()}
            >
                <i className="fa-solid fa-plus" />
                <span>Add Note</span>
            </button>
            <div className="no-scrollbar h-full space-y-5 overflow-y-auto px-1 pb-28">
                {noteElements}
            </div>
        </div>
    );
}

export default Notes;
