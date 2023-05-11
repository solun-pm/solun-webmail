"use client";

import React from 'react';
import { Spacer } from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faInbox} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 w- h-full overflow-auto bg-gray-950 p-5">
            <div className="logo">
                {/* Hier können Sie Ihr Logo einfügen */}
            </div>
            <div className="mt-5 space-y-2">
                <Spacer y={3} />
                <button className="w-full text-white p-2 rounded-md bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                    <FontAwesomeIcon icon={faInbox} />
                    <span style={{ marginLeft: '15px' }}>Inbox</span>
                </button>
                <button className="w-full text-white p-2 rounded-md bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span style={{ marginLeft: '15px' }}>Send</span>
                </button>

            </div>
        </div>
    );
}

