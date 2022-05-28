import { ScrollArea } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { RichTextEditor } from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { deleteNote, getNotes, updateNote } from '../actions/notes';
import noDataImg from '../assets/images/undraw_no_data_re_kwbl.svg';

function Editor({ currentNoteId, setCurrentNoteId, setFilter }) {
    const [noteData, setNoteData] = useState('');

    const [isSaved, setIsSaved] = useState(true);

    const note = useSelector((state) =>
        currentNoteId ? state.notes.find((n) => n.id === currentNoteId) : null
    );

    const [isEditable, setIsEditable] = useState(false);

    const notifications = useNotifications();
    const dispatch = useDispatch();

    useEffect(() => {
        if (note) {
            setNoteData(note);
        }
    }, [note]);

    useEffect(() => {
        if (isSaved === true) {
            dispatch(getNotes());
        }
    }, [isSaved, dispatch]);

    const toggleEditable = () => {
        setIsEditable((prevIsEditable) => !prevIsEditable);
    };

    const updateNoteDataTitle = (event) => {
        setIsSaved(false);

        setNoteData((prevNoteData) => ({
            ...prevNoteData,
            title: event.target.value.replace(/[\r\n]+/gm, ''),
            modify_date: new Date().toDateString(),
            modify_time: new Date().toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            }),
        }));
    };

    const updateNoteDataBody = (body) => {
        setIsSaved(false);

        setNoteData((prevNoteData) => ({
            ...prevNoteData,
            body,
            modify_date: new Date().toDateString(),
            modify_time: new Date().toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            }),
        }));
    };

    const handleSave = () => {
        if (currentNoteId) {
            setIsSaved(true);
            const id = notifications.showNotification({
                loading: true,
                title: 'Saving note.',
                message: 'My brain is fast, you know. ⚡',
                autoClose: false,
                disallowClose: true,
            });
            setTimeout(() => {
                notifications.updateNotification(id, {
                    id,
                    color: 'green',
                    title: 'Note saved.',
                    message: 'Your data is saved in my brain. 🧠',
                    icon: <i className="fa-solid fa-check" />,
                    autoClose: 2000,
                });
            }, 1000);
            dispatch(
                // eslint-disable-next-line no-underscore-dangle
                updateNote(note._id, {
                    ...noteData,
                })
            );
        }
    };

    const handleDelete = () => {
        // eslint-disable-next-line no-underscore-dangle
        dispatch(deleteNote(note._id));
        setIsSaved(true);
        setCurrentNoteId(null);
    };

    return note ? (
        <div className="no-scrollbar w-full overflow-y-auto py-5">
            <div className="flex items-center">
                <div className="no-scrollbar breadcrumbs flex-1 py-3 text-lg font-semibold">
                    <ul>
                        <li>
                            <button
                                type="button"
                                className="inline-flex items-center font-semibold  hover:underline"
                                onClick={() => setFilter(noteData.folder)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="mr-2 h-4 w-4 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                    />
                                </svg>
                                {noteData.folder}
                            </button>
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="mr-2 h-4 w-4 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            {noteData.title}
                        </li>
                    </ul>
                </div>
                {!isSaved && (
                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                        Save
                    </button>
                )}
                <button type="button" className="btn btn-error ml-4" onClick={handleDelete}>
                    Delete
                </button>
            </div>

            <div className="divider divider-vertical" />
            <ScrollArea className="h-full">
                <div className="space-y-5">
                    {isEditable ? (
                        <TextareaAutosize
                            autoFocus
                            className="h-auto w-full bg-base-100 text-4xl font-bold outline-dashed outline-primary"
                            type="text"
                            value={noteData.title}
                            onChange={updateNoteDataTitle}
                            onBlur={toggleEditable}
                        />
                    ) : (
                        <div
                            aria-hidden="true"
                            className="text-4xl font-bold"
                            onClick={toggleEditable}
                        >
                            {noteData.title}
                        </div>
                    )}

                    <div className="flex">
                        <div className="w-1/4 opacity-75">Created By:</div>
                        <div className="w-3/4 font-normal">
                            <div className="placeholder avatar mr-2">
                                <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                                    <span className="text-xs">A</span>
                                </div>
                            </div>
                            {`${noteData.created_by}`}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4 opacity-75">Last Modified:</div>
                        <div className="w-3/4 font-normal">
                            {`${noteData.modify_date}, ${noteData.modify_time}`}
                        </div>
                    </div>
                </div>
                <div className="divider divider-vertical" />
                <div>
                    <RichTextEditor
                        className="bg-base-100 text-base-content"
                        value={noteData.body}
                        onChange={updateNoteDataBody}
                    />
                </div>
            </ScrollArea>
        </div>
    ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-3">
            <img className="w-1/2" src={noDataImg} alt="noData" />
            <h1 className="text-xl font-semibold">Select a note</h1>
        </div>
    );
}

export default Editor;
