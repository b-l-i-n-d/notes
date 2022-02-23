import parse from 'html-react-parser';
import React from 'react';

function Notes({ notes, createNewNote, currentNote, setCurrentNoteId, filter, FILTER_MAP }) {
    const allNotes = notes;

    const noteElements = allNotes.filter(FILTER_MAP[filter]).map((note) => (
        <div
            key={note.id}
            className={` space-y-2 rounded-lg p-3 shadow-md transition-all duration-300 ${
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
                className="btn btn-ghost mb-5 w-full bg-base-200 hover:bg-base-300"
                onClick={createNewNote()}
            >
                Add Note
            </button>
            <div className="no-scrollbar h-full space-y-5 overflow-y-auto px-1 pb-28">
                {noteElements}
            </div>
        </div>
    );
}

export default Notes;
