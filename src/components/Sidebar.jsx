import React from 'react';
import FilterBtns from './FilterBtns';

function Sidebar({ setFilter }) {
    // const FILTER_NAMES = Object.keys(FILTER_MAP);

    // const filterBtns = FILTER_NAMES.map((name) => (
    //     <div
    //         key={name}
    //         type="button"
    //         aria-hidden="true"
    //         className="btn btn-ghost mb-5 flex w-full justify-start space-x-5 opacity-75 hover:bg-base-300 hover:opacity-100 active:bg-base-300 active:font-bold"
    //         onClick={() => setFilter(name)}
    //     >
    //         <i className="fa-regular fa-note-sticky" />
    //         <span>{name}</span>
    //     </div>
    // ));
    return (
        <div className="px-4 pt-5">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-base-content" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    className="input w-full bg-base-100 py-3 pl-10 pr-4"
                    placeholder="Search"
                />
            </div>
            <div className="mt-24">
                <FilterBtns name="All" icon="fa-solid fa-notes-medical" setFilter={setFilter} />
                <FilterBtns
                    name="My Notes"
                    icon="fa-regular fa-note-sticky"
                    setFilter={setFilter}
                />
                <FilterBtns name="Todo list" icon="fa-solid fa-list-check" setFilter={setFilter} />
                <FilterBtns
                    name="Projects"
                    icon="fa-solid fa-diagram-project"
                    setFilter={setFilter}
                />
                <FilterBtns name="Jurnals" icon="fa-solid fa-book" setFilter={setFilter} />
                <FilterBtns
                    name="Reading list"
                    icon="fa-solid fa-book-open"
                    setFilter={setFilter}
                />
            </div>
        </div>
    );
}

export default Sidebar;
