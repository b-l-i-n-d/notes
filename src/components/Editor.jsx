import RichTextEditor from '@mantine/rte';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import noDataImg from '../assets/images/undraw_no_data_re_kwbl.svg';

function Editor({ currentNoteId, currentNote, updateBody, updateTitle }) {
    const note = currentNote;
    const [isEditable, setIsEditable] = useState(false);

    const handleEditable = () => {
        setIsEditable((prevIsEditable) => !prevIsEditable);
    };

    return currentNoteId ? (
        <div className="no-scrollbar overflow-y-auto py-5">
            <div className="text-xl font-semibold">Breadcrumbs</div>
            <div className="divider divider-vertical" />
            <div className="space-y-5">
                {isEditable ? (
                    <TextareaAutosize
                        autoFocus
                        className="h-auto w-full text-4xl font-bold outline-dashed outline-violet-500"
                        type="text"
                        value={note.title}
                        onChange={updateTitle}
                        onBlur={handleEditable}
                    />
                ) : (
                    <div aria-hidden="true" className="text-4xl font-bold" onClick={handleEditable}>
                        {note.title}
                    </div>
                )}

                <div className="flex">
                    <div className="w-1/4 text-slate-500">Last Modified:</div>
                    <div className="w-3/4 font-normal">{`${note.modify_date}, ${note.modify_time}`}</div>
                </div>
            </div>
            <div className="divider divider-vertical" />
            <div>
                <RichTextEditor className="text-base" value={note.body} onChange={updateBody} />
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
