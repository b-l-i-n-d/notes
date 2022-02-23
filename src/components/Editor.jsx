import RichTextEditor from '@mantine/rte';
import React from 'react';
import noDataImg from '../assets/images/undraw_no_data_re_kwbl.svg';

function Editor({ currentNoteId, currentNote, updateNote }) {
    const note = currentNote;
    return currentNoteId ? (
        <div className="no-scrollbar overflow-y-auto py-5">
            <div>Breadcrumbs</div>
            <div className="divider divider-vertical" />
            <div className="space-y-5">
                <div className="text-4xl font-bold">{note.title}</div>
                <div className="flex">
                    <div className="w-1/4 text-slate-500">Last Modified:</div>
                    <div className="w-3/4 font-medium">{`${note.modify_date}, ${note.modify_time}`}</div>
                </div>
            </div>
            <div className="divider divider-vertical" />
            <div>
                <RichTextEditor value={note.note} onChange={updateNote} />
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
