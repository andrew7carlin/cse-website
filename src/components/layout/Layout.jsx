import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SchemaMarkup from '../common/SchemaMarkup';

const Layout = () => {
    return (
        <div className="app-shell">
            <SchemaMarkup />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
