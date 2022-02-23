import React from 'react';

function FilterBtns({ name, icon, setFilter, filter }) {
    return (
        <div
            type="button"
            aria-hidden="true"
            className={`btn btn-ghost mb-3 flex w-full justify-start space-x-5 opacity-75 hover:bg-base-300 hover:opacity-100 ${
                filter === name && `bg-base-300 font-semibold opacity-100`
            }`}
            onClick={() => setFilter(name)}
        >
            <i className={icon} />
            <span>{name}</span>
        </div>
    );
}

export default FilterBtns;
