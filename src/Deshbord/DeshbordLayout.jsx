import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Admin/Sidebar';
import Header from '../components/Admin/Header.jsx';


function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden ">  {/* 👈 add this */}
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;