import React from 'react';
import Dashboard from '../components/dashboard';
import DisableScroll from '../components/disablescroll';



export default function Home() {
    return (
        <div className="">
            <section>
                <DisableScroll />
                <Dashboard />
            </section>
        </div>
    )
}
