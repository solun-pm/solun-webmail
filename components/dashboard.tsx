"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog, faInbox, faPaperPlane, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <header className="bg-gray-950 py-4 px-8">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={toggleSidebar} className="text-white">
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
            </div>
        <div className="flex flex-grow">
            <aside className={`w-full md:w-1/6 bg-gray-950 p-4 h-screen ${sidebarVisible ? 'block' : 'hidden'}`}>
            <div className="overflow-y-auto h-full">
                    <button className="w-full text-white p-2 rounded-md bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                        <FontAwesomeIcon icon={faInbox} />
                        <span style={{ marginLeft: '15px' }}>Inbox</span>
                    </button>
                    <button className="w-full text-white p-2 rounded-md bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span style={{ marginLeft: '15px' }}>Send</span>
                    </button>
                </div>
            </aside>

            <aside className={`bg-blue-500 min-h-screen p-4 md:w-1/6`}>

            </aside>


                <div className="container mx-auto p-4 text-white">
                    {/* Hier kommt der Hauptinhalt der Seite hin */}
                    <h1>Main Content</h1>
                </div>
            </div>
        </div>
    );
}