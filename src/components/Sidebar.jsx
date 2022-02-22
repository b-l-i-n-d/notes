import React from 'react';

function Sidebar() {
    return (
        <div className="px-4 pt-5">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
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
                    className="input w-full bg-white py-3 pl-10 pr-4"
                    placeholder="Search"
                />
            </div>
        </div>
    );
}

export default Sidebar;
