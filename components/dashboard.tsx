"use client";

import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <Sidebar visible={sidebarVisible} />
        </div>
    );
}
