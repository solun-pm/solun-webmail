import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInbox, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
const Sidebar = ({ visible }) => {
    if (!visible) return null;

    return (
        <aside
            className={`transform ${
                visible ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 bg-gray-950 min-h-screen p-4 w-1/6 fixed left-0 transition-all duration-300`}
        >
        <button className="w-full text-white p-2 rounded-md bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                <FontAwesomeIcon icon={faInbox} />
                <span style={{ marginLeft: '15px' }}>Inbox</span>
            </button>
            <button className="w-full text-white p-2 rounded-md bg-gray-950 hover:bg-gray-600 transition-200 duration-200 text-left" style={{ paddingLeft: '15px' }}>
                <FontAwesomeIcon icon={faPaperPlane} />
                <span style={{ marginLeft: '15px' }}>Send</span>
            </button>
        </aside>
    );
};

export default Sidebar;
