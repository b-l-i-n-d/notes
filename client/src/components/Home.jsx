/* eslint-disable no-underscore-dangle */
import { showNotification, updateNotification } from '@mantine/notifications';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
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

    const dispatch = useDispatch();
    const currentNoteId = useSelector((state) => state.currentNoteId);
    const currentNote = useSelector((state) =>
        currentNoteId ? state.notes.data.find((note) => note.id === currentNoteId) : null
    );

    const { isLoading, error } = useSelector((state) => state.notes);

    const FILTER_MAP = {
        All: () => true,
        'My Notes': (note) => note.folder === 'My Notes',
        'Todo list': (note) => note.folder === 'Todo list',
        Projects: (note) => note.folder === 'Projects',
        Journal: (note) => note.folder === 'Journal',
        'Reading list': (note) => note.folder === 'Reading list',
    };

    // const notifications = useNotifications();

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

        showNotification({
            id: 'create-note',
            loading: true,
            title: 'Creating note',
            message: 'My brain is fast, you know. ⚡',
            autoClose: false,
            disallowClose: true,
        });
        dispatch(createNote(newNote));
        dispatch(setCurrentNoteId(newNote.id));
        dispatch(getNotes());
    }, [filter, dispatch]);

    if (!isLoading) {
        updateNotification({
            id: 'create-note',
            color: !error ? 'green' : 'red',
            title: !error ? 'Note created.' : error,
            message: !error ? `It's time to edit. ✒️` : 'Sad life 😭',
            icon: !error ? (
                <i className="fa-solid fa-check" />
            ) : (
                <i className="fa-solid fa-circle-xmark" />
            ),
            autoClose: 2000,
        });
        updateNotification({
            id: 'delete-note',
            color: !error ? 'green' : 'red',
            title: !error ? 'Note deleted.' : error,
            message: !error ? `Threw it in the blank space 🗑️` : 'Sad life 😭',
            icon: !error ? (
                <i className="fa-solid fa-check" />
            ) : (
                <i className="fa-solid fa-circle-xmark" />
            ),
            autoClose: 2000,
        });
    }

    const handleDelete = useCallback(
        (note, event) => {
            if (currentNote && currentNote._id === note._id) {
                dispatch(setCurrentNoteId(null));
            }
            showNotification({
                id: 'delete-note',
                loading: true,
                title: 'Deleting note',
                message: 'My brain is fast, you know. ⚡',
                style: {
                    backgroundColor: 'red',
                },
                autoClose: false,
                disallowClose: true,
            });
            dispatch(deleteNote(note._id));
            dispatch(resetIsSaved());
            dispatch(getNotes());
            if (event) {
                event.stopPropagation();
            }
        },
        [currentNote, dispatch]
    );

    return !user ? (
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
