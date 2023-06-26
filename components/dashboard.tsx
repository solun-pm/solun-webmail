"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import MailItem from "@/components/mailitem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFormattedDateWithTime, getFormattedDate, extractContentOutsideTags } from "solun-general-package";
import { faBars, faSearch, faSliders, faCog, faSignOutAlt , faPen, faPaperPlane, faInbox, faUser, faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { NewMailPopup} from "@/components/NewMailPopup";
import Image from 'next/image';
import { formatEmailContent } from '@/utils/formatMail';

const { version } = require('../package.json');


export default function Home({userInfo, userDetails}: any) {
    const router = useRouter();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [newMailPopupVisible, setNewMailPopupVisible] = useState(false);

    const [activeView, setActiveView] = useState('inbox'); // 'inbox', 'email', 'sidebar'

    const changeActiveView = (view: any) => {
        if (window.innerWidth < 640) {  // you can change the number 640 to any other number depending on your breakpoint for mobile devices
            setActiveView(view);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
      };

    const toggleSidebar = () => {
        if (window.innerWidth < 640) {
            setSidebarVisible(!sidebarVisible);
            setActiveView(sidebarVisible ? 'inbox' : 'sidebar');
        } else {
            setSidebarVisible(!sidebarVisible);
        }
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
                const res = await fetch('/api/mail/fetchMails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fqe: userInfo.fqe,
                        password: userInfo.password,
                    }),
                });
                if(!res.ok) {
                    console.error('Error fetching mails' + res)
                }
                const data = await res.json();
                //@ts-ignore works fine for now
                const sortedMails = data.mails.sort((a, b) => new Date(b.date) - new Date(a.date));
                setMails(sortedMails);
            } catch (e) {
                console.error(e);
            }
        };
        loadMails();
    }, [userInfo.fqe, userInfo.password]);

    const handleMailItemClick = (mail : any) => {
        setSelectedMail(mail);
        changeActiveView('email');
    };


    const emailRef = useRef(null);

    useEffect(() => {
        // Funktion, um das Pop-up zu schließen, wenn außerhalb geklickt wird
        // @ts-ignore
        const handleClickOutside = (event) => {
            // @ts-ignore
            if (emailRef.current && !emailRef.current.contains(event.target)) {
                setShowEmail(false);
            }
        }

        // Event-Listener beim Mounten des Components hinzufügen
        document.addEventListener("mousedown", handleClickOutside);

        // Event-Listener beim Unmounten des Components entfernen
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emailRef]); // Abhängigkeit von useRef


    const [showEmail, setShowEmail] = useState(false);

        return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <header className="bg-slate-950 py-4 px-8 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleSidebar} className="text-white">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <img src="/logo.svg" alt="Logo" className="hidden lg:block h-8 w-8" />
                        <h1 className="hidden lg:block text-white text-xl font-semibold">Solun</h1>
                    </div>
                    <div className="w-full lg:w-3/5 flex items-center justify-between bg-slate-950">
                        <div className="w-full lg:w-3/5 mx-4 bg-slate-950 text-white relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full border bg-slate-950 text-white border-slate-500 pl-10 pr-12 py-2 rounded appearance-none focus:outline-none"
                                style={{ height: '40px'}}
                            />
                            <button className="p-2 rounded-full transition-200 duration-200 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                <FontAwesomeIcon icon={faSliders} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 justify-end">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                            <Menu.Button className="block rounded bg-blue-500 p-2 text-white transition-colors cursor-pointer">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="md:inline hidden ml-2">{userInfo.fqe}</span>
                            </Menu.Button>
                            </div>
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <p className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-slate-900">
                                <FontAwesomeIcon icon={faUser} className="mr-3"/>
                                    {userInfo.fqe}
                                </p>
                                <Menu.Item>
                                {({ active }) => (
                                    <button
                                    className={`${
                                        active ? "bg-blue-500 text-white" : "text-slate-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={() => router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/dashboard/settings')}
                                    >
                                    <FontAwesomeIcon icon={faCog} className="mr-3"/>
                                    Settings
                                    </button>
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <button
                                    className={`${
                                        active ? "bg-blue-500 text-white" : "text-slate-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={handleLogout}
                                    >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-3"/>
                                    Logout
                                    </button>
                                )}
                                </Menu.Item>
                                <p className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-slate-900">
                                <FontAwesomeIcon icon={faCodeCompare} className="mr-3"/>
                                    {version}
                                </p>
                            </div>
                            </Menu.Items>
                        </Menu>
                    </div>
                </header>
            </div>
            <div className="flex">
                <div className="flex-initial">
                    <aside className={`lg:w-64 bg-slate-900 p-4 h-screen w-screen ${sidebarVisible ? 'block' : 'hidden'}`}>
                        <div className="overflow-y-auto h-full">
                            <button
                                className="w-2/3 text-white p-2 rounded-lg bg-blue-500 transition-200 duration-200 text-left"
                                style={{ height: '3.5rem', paddingLeft: '15px', margin: '0.5rem 0', marginLeft: '1rem' }}
                                onClick={openNewMailPopup}
                            >
                                <FontAwesomeIcon icon={faPen} />
                                <span className='ml-2'>New</span>
                            </button>
                            <button className="w-full text-white p-2 rounded-r-full bg-slate-900 hover:bg-slate-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                                <FontAwesomeIcon icon={faInbox} />
                                <span style={{ marginLeft: '15px' }}>Inbox</span>
                            </button>
                            <button className="w-full text-white p-2 rounded-r-full bg-slate-900 hover:bg-slate-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                <span style={{ marginLeft: '15px' }}>Send</span>
                            </button>
                        </div>
                    </aside>
                </div>
                <div className="flex-initial h-screen">
                    <aside className={`w-screen h-full max-h-screen lg:w-80 bg-slate-800 min-h-screen p-4 text-white`}>
                            <div className="overflow-y-auto h-full">
                                {mails.map((mail, index) => (
                                    <MailItem
                                        key={index}
                                        //@ts-ignore Works fine (for now)
                                        subject={mail.subject}
                                        //@ts-ignore Works fine (for now)
                                        date={getFormattedDateWithTime(mail.date)}
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
                                <div className="border-b-2 border-slate-800 p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="relative flex flex-col">
                                            <p
                                                className="text-lg mb-1 cursor-pointer"
                                                onClick={() => setShowEmail(!showEmail)}
                                                ref={emailRef}
                                            >
                                                {/*@ts-ignore Works fine (for now)*/}
                                                {extractContentOutsideTags(selectedMail.senderName)}
                                            </p>
                                            {showEmail && (
                                                <div className="absolute bg-slate-800 border p-2 mt-1 text-xs">
                                                    {/*@ts-ignore Works fine (for now)*/}
                                                    {selectedMail.senderEmail}
                                                </div>
                                            )}
                                            {/*@ts-ignore Works fine (for now)*/}
                                            <p className="text-sm mt-2">To: {selectedMail.senderEmail}</p>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            {/*@ts-ignore Works fine (for now)*/}
                                            <p className="text-sm">{getFormattedDate(selectedMail.date)}</p>
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
                                    __html: formatEmailContent(selectedMail.body),
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {newMailPopupVisible && <NewMailPopup onClose={closeNewMailPopup} userInfo={userInfo} userDetails={userDetails}/>}
        </div>
    );
}