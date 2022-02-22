import React from 'react';
import noDataImg from '../assets/images/undraw_no_data_re_kwbl.svg';

function Editor({ currentNoteId, currentNote }) {
    const note = currentNote;
    return currentNoteId ? (
        <div className="pt-5 text-xl font-semibold">
            <div>Breadcrumbs</div>
            <div className="divider divider-vertical" />
            <div>{note.note}</div>
        </div>
    ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-3">
            <img className="w-1/2" src={noDataImg} alt="noData" />
            <h1 className="text-xl font-semibold">Select a note</h1>
        </div>
    );
}

export default Editor;
