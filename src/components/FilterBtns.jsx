import React from 'react';

function FilterBtns({ name, icon, setFilter }) {
    return (
        <div
            type="button"
            aria-hidden="true"
            className="btn btn-ghost mb-5 flex w-full justify-start space-x-5 opacity-75 hover:bg-base-300 hover:opacity-100 active:bg-base-300 active:font-bold"
            onClick={() => setFilter(name)}
        >
            <i className={icon} />
            <span>{name}</span>
        </div>
    );
}

export default FilterBtns;
