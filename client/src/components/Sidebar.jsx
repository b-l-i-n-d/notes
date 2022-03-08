/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import FilterBtns from './FilterBtns';

function Sidebar({ setFilter, filter }) {
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
        <div className="flex h-full flex-col justify-between px-4 py-5">
            <div>
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
                    <FilterBtns
                        name="All"
                        icon="fa-solid fa-notes-medical"
                        setFilter={setFilter}
                        filter={filter}
                    />
                    <FilterBtns
                        name="My Notes"
                        icon="fa-regular fa-note-sticky"
                        setFilter={setFilter}
                        filter={filter}
                    />
                    <FilterBtns
                        name="Todo list"
                        icon="fa-solid fa-list-check"
                        setFilter={setFilter}
                        filter={filter}
                    />
                    <FilterBtns
                        name="Projects"
                        icon="fa-solid fa-diagram-project"
                        setFilter={setFilter}
                        filter={filter}
                    />
                    <FilterBtns
                        name="Journal"
                        icon="fa-solid fa-book"
                        setFilter={setFilter}
                        filter={filter}
                    />
                    <FilterBtns
                        name="Reading list"
                        icon="fa-solid fa-book-open"
                        setFilter={setFilter}
                        filter={filter}
                    />
                </div>
            </div>
            <div className="dropdown-top dropdown w-full">
                <label tabIndex="0" className="btn btn-ghost w-full space-x-2 shadow-md">
                    <i className="fa-solid fa-swatchbook" />
                    <span>Change Theme</span>
                    <i className="fa-solid fa-angle-up" />
                </label>
                <ul
                    className="dropdown-content menu menu-compact h-96 w-full overflow-y-scroll rounded bg-base-100 p-4"
                    tabIndex="0"
                >
                    <li>
                        <button
                            type="button"
                            data-set-theme=""
                            data-act-class="active"
                            className="active"
                        >
                            Default
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="light" data-act-class="active">
                            🌝 light
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="dark" data-act-class="active">
                            🌚 dark
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="cupcake" data-act-class="active">
                            🧁 cupcake
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="bumblebee" data-act-class="active">
                            🐝 bumblebee
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="emerald" data-act-class="active">
                            ✳️ Emerald
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="corporate" data-act-class="active">
                            🏢 Corporate
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="synthwave" data-act-class="active">
                            🌃 synthwave
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="retro" data-act-class="active">
                            👴 retro
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="cyberpunk" data-act-class="active">
                            🤖 cyberpunk
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="valentine" data-act-class="active">
                            🌸 valentine
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="halloween" data-act-class="active">
                            🎃 halloween
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="garden" data-act-class="active">
                            🌷 garden
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="forest" data-act-class="active">
                            🌲 forest
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="aqua" data-act-class="active">
                            🐟 aqua
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="lofi" data-act-class="active">
                            👓 lofi
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="pastel" data-act-class="active">
                            🖍 pastel
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="fantasy" data-act-class="active">
                            🧚‍♀️ fantasy
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="wireframe" data-act-class="active">
                            📝 Wireframe
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="black" data-act-class="active">
                            🏴 black
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="luxury" data-act-class="active">
                            💎 luxury
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="dracula" data-act-class="active">
                            🧛‍♂️ dracula
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="cmyk" data-act-class="active">
                            🖨 CMYK
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="autumn" data-act-class="active">
                            🍁 Autumn
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="business" data-act-class="active">
                            💼 Business
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="acid" data-act-class="active">
                            💊 Acid
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="lemonade" data-act-class="active">
                            🍋 Lemonade
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="night" data-act-class="active">
                            🌙 Night
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="coffee" data-act-class="active">
                            ☕️ Coffee
                        </button>
                    </li>
                    <li>
                        <button type="button" data-set-theme="winter" data-act-class="active">
                            ❄️ Winter
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
