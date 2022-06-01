import parse from 'html-react-parser';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNoteId } from '../actions/currentNoteId';
import { getNotes } from '../actions/notes';

function Notes({ createNewNote, filter, FILTER_MAP, handleDelete }) {
    const dispatch = useDispatch();

    const currentNoteId = useSelector((state) => state.currentNoteId);

    useEffect(() => {
        dispatch(getNotes());
    }, [currentNoteId, dispatch]);

    const allNotes = useSelector((state) => state.notes);

    const currentNote = useSelector((state) =>
        currentNoteId ? state.notes.find((n) => n.id === currentNoteId) : null
    );

    const noteElements = allNotes.filter(FILTER_MAP[filter]).map((note) => (
        <div
            key={note.id}
            className={`group space-y-2 rounded-lg p-3 shadow-md transition-all duration-300 ${
                currentNote && note.id === currentNote.id
                    ? `bg-primary text-primary-content shadow-primary/50`
                    : ''
            }`}
            onClick={() => dispatch(setCurrentNoteId(note.id))}
            aria-hidden="true"
        >
            <div className="flex items-center justify-between">
                <div className="py-1 text-xs uppercase">{note.modify_date}</div>
                <div
                    aria-hidden
                    className="hidden cursor-pointer hover:text-red-500 group-hover:block"
                    onClick={(event) => handleDelete(note, event)}
                >
                    <i className="fa-solid fa-trash fa-sm" />
                </div>
            </div>

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
                onClick={createNewNote}
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
