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
                <div className="article">{children}</div>
            </div>
        </>
    );
};

export default Layout;
