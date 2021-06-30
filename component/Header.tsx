import Link from "next/link";
import React, { useState, useEffect } from "react";
type Props = {};
const Header = () => {
    return (
        <header className="Header">
            <div className="header_wrapper">
                <Link href={"/home"}>
                    <h2 style={{ cursor: "pointer" }}>소문내자</h2>
                </Link>
                <div>소문내자를 사랑해주셔서 오늘도 감사드려요!</div>
            </div>
        </header>
    );
};

export default Header;
