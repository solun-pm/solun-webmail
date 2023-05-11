"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog, faSliders, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <header className="fixed top-0 overflow-auto w-full flex p-5 bg-gray-950 text-white z-10 relative sticky justify-center">
                <button className="mr-4 p-2 rounded-md hover:bg-gray-700 transition-200 transition duration-200" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className="flex items-center">
                    <img src="/path/to/your/logo.png" alt="logo" className="h-10 w-10" />
                    <h1 className="ml-2 text-2xl">Solun Webmail</h1>
                </div>
                <div className="flex-grow mx-10 flex">
                    <div className="flex-grow mx-10 flex items-center justify-start bg-gray-950">
                        <div className="relative w-1/3">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                className="bg-gray-950 transition-200 text-white block rounded-md pl-10 pr-10 w-full"
                                placeholder="Search"
                                style={{ height: '40px', border: '1px solid white' }}
                            />
                            <button className="p-2 rounded-full transition-200 transition duration-200 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faSliders}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="p-2 rounded-md hover:bg-gray-700 transition-200 transition duration-200">
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
            </header>
            <Sidebar visible={sidebarVisible} />
        </>
    );
};

export default Header;
