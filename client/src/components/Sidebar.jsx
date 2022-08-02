/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterBtns from './FilterBtns';
import Theme from './Theme';

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
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/login', { replace: true });
        setUser(null);
    };

    return (
        <div className="flex h-full flex-col justify-between px-4 py-5">
            <div>
                {user && (
                    <div className="rounded-xl bg-base-100 shadow-sm">
                        <div className="m-0 flex flex-row items-center justify-between overflow-visible p-2">
                            <div className="inline-flex space-x-3">
                                {user.result.picture ? (
                                    <div className="avatar">
                                        <div className="w-12 rounded-xl">
                                            <img src={user.result.picture} alt="profile_picture" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="placeholder avatar">
                                        <div className="w-12 rounded-xl bg-neutral-focus text-neutral-content">
                                            <span className="text-3xl">
                                                {user.result.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <h2 className="card-title text-lg">{user.result.name}</h2>
                            </div>
                            <div>
                                <div className="dropdown-end dropdown">
                                    <label tabIndex="0" className="btn btn-ghost btn-xs m-1">
                                        <FiChevronDown size={20} />
                                    </label>
                                    <button
                                        type="button"
                                        tabIndex="0"
                                        className="btn btn-ghost dropdown-content menu w-auto rounded-md bg-base-100 py-2 px-4 shadow-md shadow-primary/70"
                                        onClick={logout}
                                    >
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="relative mt-5">
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
                <div className="mt-20">
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
            <Theme />
        </div>
    );
}

export default Sidebar;
