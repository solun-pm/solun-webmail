import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInbox, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
const Sidebar = ({ visible }) => {
    if (!visible) return null;

    return (
        <aside className="w-full md:w-1/6 bg-gray-950 p-4 h-screen">
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
    );
};

export default Sidebar;
