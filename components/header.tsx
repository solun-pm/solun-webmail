import React from 'react';
import {faCog, faBars} from "@fortawesome/free-solid-svg-icons";
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
                <div className="flex-1 mx-8 bg-gray-950 transition-200 text-white">
                    <input
                        type="text"
                        placeholder="Search"
                        className="md:w-2/5 border bg-gray-950 text-white border-gray-300 px-3 py-2 rounded"
                        style={{ height: '40px', border: '1px solid white' }}
                    />
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
