"use client";

import React, { useState, useEffect } from 'react';
import MailItem from "@/components/mailitem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog, faInbox, faPaperPlane, faSearch, faSliders, faPen, faTimes, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {fetchMails} from "@/utils/mailService";
import formatTime from "@/utils/formatTime";

function NewMailPopup({ onClose }: any) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-950 p-8 rounded-lg w-10/12 md:w-1/2 flex flex-col">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <button
                            className="w-8 h-8 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-950 flex items-center justify-center mb-2"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                        <h2 className="text-2xl font-semibold text-white">
                            New Mail
                        </h2>
                    </div>
                    <button
                        type="submit"
                        className="w-12 h-12 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-700 flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faArrowUp} size="2x" />
                    </button>
                </div>
                <form className="mt-4 flex-grow">
                    <div className="border-t border-blue-500 bg-gray-950">
                        <input
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="email"
                            placeholder="To:"
                        />
                    </div>
                    <div className="border-t border-blue-500">
                        <input
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="text"
                            placeholder="Subject:"
                        />
                    </div>
                    <div className="border-t border-blue-500">
            <textarea
                className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                placeholder="Message:"
                rows={8}
            />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [newMailPopupVisible, setNewMailPopupVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const openNewMailPopup = () => {
        setNewMailPopupVisible(true);
    };

    const closeNewMailPopup = () => {
        setNewMailPopupVisible(false);
    };

    const [mails, setMails] = useState([]);
    const [selectedMail, setSelectedMail] = useState(null);

    useEffect(() => {
        const loadMails = async () => {
            try {
                const res = await fetch('/api/mails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if(!res.ok) {
                    console.log(data);
                } else {
                    setMails(data.mails);
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadMails();
    }, []);

    const handleMailItemClick = (mail : any) => {
        setSelectedMail(mail);
    };


    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <header className="bg-gray-950 py-4 px-8 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleSidebar} className="text-white">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <img src="/logo.svg" alt="Logo" className="hidden md:block h-8 w-8" />
                        <h1 className="hidden md:block text-white text-xl font-semibold">Solun</h1>
                    </div>
                    <div className="w-full md:w-3/5 flex items-center justify-between bg-gray-950">
                        <div className="w-full md:w-3/5 mx-4 bg-gray-950 text-white relative">
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
                </header>


            </div>
        <div className="flex flex-grow">
            <aside className={`w-full md:w-1/6 bg-gray-950 p-4 h-screen ${sidebarVisible ? 'block' : 'hidden'}`}>
                <div className="overflow-y-auto h-full">
                    <button
                        className="w-2/3 text-white p-2 rounded-lg bg-blue-500 transition-200 duration-200 text-left"
                        style={{ height: '3.5rem', paddingLeft: '15px', margin: '0.5rem 0', marginLeft: '1rem' }}
                        onClick={openNewMailPopup}
                    >
                        <FontAwesomeIcon icon={faPen} />
                        <span style={{ marginLeft: '15px' }}>Write</span>
                    </button>
                    <button className="w-full text-white p-2 rounded-r-full bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                        <FontAwesomeIcon icon={faInbox} />
                        <span style={{ marginLeft: '15px' }}>Inbox</span>
                    </button>
                    <button className="w-full text-white p-2 rounded-r-full bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span style={{ marginLeft: '15px' }}>Send</span>
                    </button>
                </div>
            </aside>

                <aside className={`bg-gray-900 min-h-screen p-4 md:w-1/6 text-white`}>
                    <div className="overflow-y-auto h-full">
                        {mails.map((mail, index) => (
                            <MailItem
                                key={index}
                                //@ts-ignore Works fine (for now)
                                subject={mail.subject}
                                //@ts-ignore Works fine (for now)
                                date={formatTime(mail.date)}
                                onClick={() => handleMailItemClick(mail)}
                            />
                        ))}
                    </div>
                </aside>

            <div className="container mx-auto p-4 text-white">
                {selectedMail && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            {/*@ts-ignore Works fine (for now)*/}
                            {selectedMail.subject}
                        </h2>
                        {/*@ts-ignore Works fine (for now)*/}
                        <p>Date: {selectedMail.date.toLocaleString()}</p>
                        <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{
                                // @ts-ignore Works fine (for now)
                                __html: selectedMail.body,
                            }}
                        />
                    </div>
                )}
                </div>
            </div>
            {newMailPopupVisible && <NewMailPopup onClose={closeNewMailPopup} />}
        </div>
    );
}