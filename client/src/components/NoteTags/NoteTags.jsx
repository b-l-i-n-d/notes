import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import NoteTagsStyle from './NoteTags.module.scss';

function NoteTags() {
    const [tags, setTags] = useState([]);

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const onTagUpdate = (i, newTag) => {
        const updatedTags = tags.slice();
        updatedTags.splice(i, 1, newTag);
        setTags(updatedTags);
    };

    return (
        <div className={NoteTagsStyle.ReactTags}>
            <ReactTags
                inline
                tags={tags}
                handleAddition={handleAddition}
                handleDelete={handleDelete}
                onTagUpdate={onTagUpdate}
                placeholder="+ Add Tags"
                autofocus={false}
                editable
            />
        </div>
    );
}

export default NoteTags;
