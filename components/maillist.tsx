import React from 'react';

// @ts-ignore
const SecondSidebar = ({ visible, firstSidebarVisible }) => {
    if (!visible) return null;

    return (
        <aside
            className={`${
                visible ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 bg-blue-500 min-h-screen p-4 w-1/6 fixed left-0 transition-all duration-300 ${
                firstSidebarVisible ? 'md:ml-1/6' : 'md:ml-0'
            }`}
        >
            <button className="w-full text-white p-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-200 duration-200 text-left">
                Second Sidebar Button 1
            </button>
            <button className="w-full text-white p-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-200 duration-200 text-left">
                Second Sidebar Button 2
            </button>
        </aside>
    );
};

export default SecondSidebar;
