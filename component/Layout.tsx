import React, { useState, useEffect } from "react";
import Sidebar from "component/Sidebar";
import Header from "component/Header";
type Props = {};
const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <>
            <Header />
            <div className="Layout">
                <Sidebar />
                <section className="main_section">{children}</section>
            </div>
        </>
    );
};

export default Layout;
