"use client";

import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import SecondSidebar from '../components/maillist';

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [secondSidebarVisible, setSecondSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const toggleSecondSidebar = () => {
        setSecondSidebarVisible(!secondSidebarVisible);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <Sidebar visible={sidebarVisible} />
            <SecondSidebar visible={secondSidebarVisible} firstSidebarVisible={sidebarVisible} />
            {/* Button zum Ein-/Ausblenden der zweiten Sidebar */}
            <button
                onClick={toggleSecondSidebar}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Toggle Second Sidebar
            </button>
        </div>
    );
}
