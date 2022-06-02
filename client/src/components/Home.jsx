/* eslint-disable no-underscore-dangle */
import { useNotifications } from '@mantine/notifications';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeChange } from 'theme-change';
import { setCurrentNoteId } from '../actions/currentNoteId';
import { createNote, deleteNote, getNotes } from '../actions/notes';
import { resetIsSaved } from '../actions/savedStatus';
import Editor from './Editor';
import Notes from './Notes';
import Sidebar from './Sidebar';

function Home() {
    const [filter, setFilter] = useState('All');

    const dispatch = useDispatch();
    const currentNoteId = useSelector((state) => state.currentNoteId);
    const currentNote = useSelector((state) =>
        currentNoteId ? state.notes.find((n) => n.id === currentNoteId) : null
    );

    const FILTER_MAP = {
        All: () => true,
        'My Notes': (note) => note.folder === 'My Notes',
        'Todo list': (note) => note.folder === 'Todo list',
        Projects: (note) => note.folder === 'Projects',
        Journal: (note) => note.folder === 'Journal',
        'Reading list': (note) => note.folder === 'Reading list',
    };

    const notifications = useNotifications();

    useEffect(() => {
        themeChange(false);
    }, []);

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
        dispatch(setCurrentNoteId(newNote.id));
        dispatch(createNote(newNote));
        const id = notifications.showNotification({
            loading: true,
            title: 'Creating note',
            message: 'My brain is fast, you know. ⚡',
            autoClose: false,
            disallowClose: true,
        });
        setTimeout(() => {
            notifications.updateNotification(id, {
                id,
                color: 'green',
                title: 'Note created.',
                message: `It's time to edit. ✒️`,
                icon: <i className="fa-solid fa-check" />,
                autoClose: 2000,
            });
        }, 1000);
    };

    const handleDelete = (note, event) => {
        if (currentNote._id === note._id) {
            dispatch(setCurrentNoteId(null));
            console.log('Matched', currentNote._id, note._id);
        }
        dispatch(deleteNote(note._id));
        dispatch(resetIsSaved());
        dispatch(getNotes());
        if (event) {
            event.stopPropagation();
        }
    };
    return (
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
