import jwtDecode from 'jwt-decode';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { themeChange } from 'theme-change';
import { setCurrentNoteId } from '../actions/currentNoteId';
import { createNote, deleteNote, getNotes } from '../actions/notes';
import { resetIsSaved } from '../actions/savedStatus';
import Editor from './Editor';
import Notes from './Notes';
import Sidebar from './Sidebar';

function Home() {
    const [filter, setFilter] = useState('All');
    const user = JSON.parse(localStorage.getItem('profile'));
    const decodedToken = user ? jwtDecode(user.token) : null;

    const dispatch = useDispatch();
    const currentNoteId = useSelector((state) => state.currentNoteId);
    const currentNote = useSelector((state) =>
        currentNoteId ? state.notes.data.notes.find((note) => note.id === currentNoteId) : null
    );

    const { isLoading, error } = useSelector((state) => state.notes);
    const folders = useSelector((state) => state.notes.data.folders);

    const FILTER_MAP = {
        All: () => true,
    };

    // eslint-disable-next-line no-return-assign
    folders?.map((folder) => (FILTER_MAP[folder.name] = (note) => note.folder === folder.name));

    useEffect(() => {
        themeChange(false);
    }, []);

    const createNewNote = useCallback(() => {
        const newNote = {
            id: nanoid(),
            modify_date: new Date().toDateString(),
            modify_time: new Date().toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            }),
            folder: filter === 'All' ? 'My Notes' : filter,
            title: 'Add your note',
            body: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis beatae amet exercitationem vel eius quaerat fugiat nihil quae. Repellat, eaque.</p>',
        };

        toast('Creating note', {
            className: 'bg-base-200 text-base-content shadow-xl shadow-info/30',
            toastId: 'create-note',
            isLoading: true,
            type: toast.TYPE.INFO,
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
            closeButton: false,
        });

        dispatch(createNote(newNote));
        dispatch(setCurrentNoteId(newNote.id));
        dispatch(getNotes());
    }, [filter, dispatch]);

    const handleDelete = useCallback(
        (note, event) => {
            toast('Deleting note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-info/30',
                toastId: 'delete-note',
                isLoading: true,
                type: toast.TYPE.INFO,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
                closeButton: false,
            });

            if (currentNote && currentNote._id === note._id) {
                dispatch(setCurrentNoteId(null));
            }

            dispatch(deleteNote(note._id));
            dispatch(resetIsSaved());
            dispatch(getNotes());
            if (event) {
                event.stopPropagation();
            }
        },
        [currentNote, dispatch]
    );

    if (!isLoading) {
        if (error) {
            toast.update('create-note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-error/30',
                render: error,
                isLoading: false,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
                closeButton: null,
            });
            toast.update('delete-note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-error/30',
                render: error,
                isLoading: false,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
                closeButton: null,
            });
        } else {
            toast.update('create-note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-success/30',
                render: 'Note created',
                isLoading: false,
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
                closeButton: null,
            });
            toast.update('delete-note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-success/30',
                render: 'Note deleted',
                isLoading: false,
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
                closeButton: null,
            });
        }
    }

    // eslint-disable-next-line no-nested-ternary
    return !user ? (
        <Navigate to="/login" replace />
    ) : decodedToken.exp * 1000 < new Date().getTime() ? (
        <Navigate to="/login" replace />
    ) : (
        <div className="flex h-screen w-full flex-row overflow-hidden">
            <div className="w-[21.4285714%] bg-base-200">
                <Sidebar setFilter={setFilter} filter={filter} />
            </div>

            <div className="flex w-[21.4285714%] bg-base-100">
                <Notes
                    createNewNote={createNewNote}
                    filter={filter}
                    FILTER_MAP={FILTER_MAP}
                    handleDelete={handleDelete}
                />
            </div>

            <div className="divider divider-horizontal m-0 w-1" />

            <div className="flex w-[57.1428571%] bg-base-100 px-10">
                <Editor setFilter={setFilter} handleDelete={handleDelete} />
            </div>
        </div>
    );
}

export default Home;
