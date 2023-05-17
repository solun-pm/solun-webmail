"use client";

import React, { useState, useEffect } from 'react';
import MailItem from "@/components/mailitem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatTime from "@/utils/formatTime";
import extactTime from "@/utils/extactTime";
import { faBars, faSearch, faTimes, faArrowUp, faSliders, faCog, faPen, faPaperPlane, faInbox } from "@fortawesome/free-solid-svg-icons";


function NewMailPopup({ onClose }: { onClose: () => void }) {
    const [to, setTo] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/smtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, subject, message }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message);
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-950 p-8 rounded-lg w-10/12 lg:w-1/2 flex flex-col">
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
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faArrowUp} size="2x" />
                    </button>
                </div>
                <form className="mt-4 flex-grow" onSubmit={handleSubmit}>
                    <div className="border-t border-blue-500 bg-gray-950">
                        <input
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="email"
                            placeholder="To:"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                    <div className="border-t border-blue-500">
                        <input
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="text"
                            placeholder="Subject:"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="border-t border-blue-500">
            <textarea
                className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                placeholder="Message:"
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                const res = await fetch('/api/imap', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if(!res.ok) {
                    console.log(data);
                } else {
                    //@ts-ignore works fine for now
                    const sortedMails = data.mails.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setMails(sortedMails);
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

    const [showEmail, setShowEmail] = useState(false);

    const toggleEmail = () => {
        setShowEmail(!showEmail);
    };


        return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <header className="bg-gray-950 py-4 px-8 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleSidebar} className="text-white">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <img src="/logo.svg" alt="Logo" className="hidden lg:block h-8 w-8" />
                        <h1 className="hidden lg:block text-white text-xl font-semibold">Solun</h1>
                    </div>
                    <div className="w-full lg:w-3/5 flex items-center justify-between bg-gray-950">
                        <div className="w-full lg:w-3/5 mx-4 bg-gray-950 text-white relative">
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
            <div className="flex">
                <div className="flex-initial">
                    <aside className={`w-full lg:w-64 bg-gray-950 p-4 h-screen ${sidebarVisible ? 'block' : 'hidden'}`}>
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
                </div>
                <div className="flex-initial">
                    <aside className={`w-full lg:w-80 bg-gray-900 min-h-screen p-4 text-white`}>
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
                </div>
                <div className="container mx-auto p-4 text-white">
                    {selectedMail && (
                        <div>
                            <div className="w-full mb-4">
                                <div className="border-b-2 border-gray-800 p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <p
                                                className="text-sm mb-1 cursor-pointer"
                                                onClick={toggleEmail}
                                            >
                                                {/*@ts-ignore Works fine (for now)*/}
                                                From: {selectedMail.senderName}
                                            </p>
                                            {showEmail && (
                                                <p className="text-sm">
                                                    {/*@ts-ignore Works fine (for now)*/}
                                                    {selectedMail.senderEmail}
                                                </p>
                                            )}
                                            {/*@ts-ignore Works fine (for now)*/}
                                            <p className="text-sm mt-2">To: {selectedMail.recipient}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            {/*@ts-ignore Works fine (for now)*/}
                                            <p className="text-sm">{extactTime(selectedMail.date)}</p>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-semibold mt-2">
                                    {/*@ts-ignore Works fine (for now)*/}
                                    {selectedMail.subject}
                                </h2>
                            </div>
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