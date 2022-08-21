/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';

function FilterBtns({ name, icon, setFilter, filter }) {
    return (
        <div
            type="button"
            aria-hidden="true"
            className={`group btn btn-ghost mb-3 flex w-full justify-between opacity-75 hover:bg-base-300 hover:opacity-100 ${
                filter === name && `bg-base-300 font-semibold opacity-100`
            }`}
            onClick={() => setFilter(name)}
        >
            <div className="space-x-5">
                <i className={icon} />
                <span>{name}</span>
            </div>
            <div className="dropdown-end dropdown z-10">
                <label tabIndex="0" className="hidden group-hover:block">
                    <BsThreeDotsVertical />
                </label>
                <ul
                    tabIndex="0"
                    className="dropdown-content menu rounded-box z-50 w-auto bg-base-100 p-2 shadow"
                >
                    <li>
                        <a href={`#${name}`}>
                            <FaEdit />
                            Edit
                        </a>
                    </li>
                    <li>
                        <a href="##">
                            <FaTrash />
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FilterBtns;
