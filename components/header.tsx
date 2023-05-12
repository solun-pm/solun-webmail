import React from 'react';
import {faCog, faBars, faSearch, faSliders} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// @ts-ignore
const Header = ({ onToggleSidebar }) => {
    return (
        <header className="bg-gray-950 py-4 px-8">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onToggleSidebar} className="text-white">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <img src="/logo.png" alt="Logo" className="hidden md:block h-8 w-8" />
                    <h1 className="hidden md:block text-white text-xl font-semibold">Solun</h1>
                </div>
                <div className="flex-grow mx-10 flex items-center justify-start bg-gray-950">
                    <div className="w-full md:w-2/5 mx-8 bg-gray-950 text-white relative">
                        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border bg-gray-950 text-white border-gray-300 pl-10 pr-12 py-2 rounded"
                            style={{ height: '40px', border: '1px solid white' }}
                        />
                        <button className="p-2 rounded-full transition-200 duration-200 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faSliders} />
                        </button>
                    </div>

                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-white">
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
