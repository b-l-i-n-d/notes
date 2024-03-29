import { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { getNotes, updateNote } from '../actions/notes';
import { needSaving, resetIsSaved } from '../actions/savedStatus';
import noDataImg from '../assets/images/undraw_no_data_re_kwbl.svg';
import NoteTagsStyle from './NoteTags.module.scss';

function Editor({ setFilter, handleDelete }) {
    const [noteData, setNoteData] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    const currentNoteId = useSelector((state) => state.currentNoteId);
    const note = useSelector((state) =>
        currentNoteId ? state.notes.data.notes.find((n) => n.id === currentNoteId) : null
    );
    const { isLoading, error } = useSelector((state) => state.notes);
    const isSaved = useSelector((state) => state.savedStatus);

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

    const handleTagAddition = (tag) => {
        dispatch(needSaving());
        setNoteData((prevNoteData) => ({
            ...prevNoteData,
            tags: [...prevNoteData.tags, tag],
        }));
    };

    const handleTagDelete = (i) => {
        dispatch(needSaving());
        setNoteData((prevNoteData) => ({
            ...prevNoteData,
            tags: prevNoteData.tags.filter((tag, index) => index !== i),
        }));
    };

    const onTagUpdate = (i, newTag) => {
        dispatch(needSaving());
        const updatedTags = noteData.tags.slice();
        updatedTags.splice(i, 1, newTag);
        setNoteData((prevNoteData) => ({
            ...prevNoteData,
            tags: updatedTags,
        }));
    };

    const updateNoteDataTitle = (event) => {
        dispatch(needSaving());
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
        dispatch(needSaving());
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

    const handleSave = useCallback(() => {
        if (currentNoteId) {
            toast('Saving note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-info/30',
                toastId: 'update-note',
                isLoading: true,
                type: toast.TYPE.INFO,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
                closeButton: false,
            });

            dispatch(resetIsSaved());
            dispatch(
                updateNote(note._id, {
                    ...noteData,
                })
            );
        }
    }, [currentNoteId, dispatch, note, noteData]);

    if (!isLoading) {
        if (error) {
            toast.update('update-note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-error/30',
                render: error,
                isLoading: false,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
                closeButton: null,
            });
        } else {
            toast.update('update-note', {
                className: 'bg-base-200 text-base-content shadow-xl shadow-success/30',
                render: 'Note saved',
                isLoading: false,
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
                closeButton: null,
            });
        }
    }

    return note ? (
        <div className="no-scrollbar w-full overflow-y-auto pb-5">
            <div className="sticky top-0 z-10 flex items-center bg-base-100 pt-5 pb-1">
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
                <button
                    type="button"
                    className="btn btn-error ml-4"
                    onClick={() => handleDelete(note)}
                >
                    Delete
                </button>
            </div>

            <div className="divider divider-vertical mt-2" />
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
                    <div aria-hidden="true" className="text-4xl font-bold" onClick={toggleEditable}>
                        {noteData.title}
                    </div>
                )}

                <div className="flex">
                    <div className="w-1/4 opacity-75">Created By:</div>
                    <div className="w-3/4 font-normal">
                        <div className="placeholder avatar mr-2">
                            <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                                <span className="text-xs">
                                    {noteData.created_by &&
                                        noteData.created_by.name &&
                                        noteData.created_by.name.charAt(0)}
                                </span>
                            </div>
                        </div>
                        {noteData.created_by && noteData.created_by.name}
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/4 opacity-75">Tags:</div>
                    <div className="w-3/4 font-normal">
                        <div className={NoteTagsStyle.ReactTags}>
                            <ReactTags
                                inline
                                tags={noteData.tags}
                                handleAddition={handleTagAddition}
                                handleDelete={handleTagDelete}
                                onTagUpdate={onTagUpdate}
                                placeholder="+ Add Tags"
                                autofocus={false}
                                editable
                            />
                        </div>
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
            <div data-text-editor="name">
                <ReactQuill
                    style={{ fontSize: 16 }}
                    theme="snow"
                    formats={[
                        'header',
                        'font',
                        'size',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'bullet',
                        'indent',
                        'align',
                        'link',
                        'image',
                        'video',
                    ]}
                    modules={{
                        toolbar: [
                            [{ header: '1' }, { header: '2' }, { font: [] }],
                            [{ size: [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [
                                { list: 'ordered' },
                                { list: 'bullet' },
                                { indent: '-1' },
                                { indent: '+1' },
                            ],
                            [
                                { align: '' },
                                { align: 'center' },
                                { align: 'right' },
                                { align: 'justify' },
                            ],
                            ['link', 'image', 'video'],
                            ['clean'],
                        ],
                    }}
                    bounds={`[data-text-editor="name"]`}
                    value={noteData.body}
                    onChange={updateNoteDataBody}
                />
            </div>
        </div>
    ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-3">
            <img className="w-1/2" src={noDataImg} alt="noData" />
            <h1 className="text-xl font-semibold">Select a note</h1>
        </div>
    );
}

export default Editor;
