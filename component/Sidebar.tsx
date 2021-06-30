import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { topics } from "lib/util";

type Props = {};

const SidbarButton = (props) => {
    const { name, link } = props;
    return (
        <div>
            <Link href={link}>
                <button className={props.isNow ? "on" : ""}>{name}</button>
            </Link>
        </div>
    );
};

const SidebarOption = (props) => {
    const { name, link } = props;
    return <option value={link}>{name}</option>;
};

const Sidebar = () => {
    const router = useRouter();
    const oneDepth = router.asPath.split("/")[1];

    const [isHide, setIsHide] = useState<boolean>(false);
    return (
        <aside className="Sidebar">
            <div className="sidebar_wrapper">
                <div className="desktop">
                    <div className="head_box" onClick={() => setIsHide(!isHide)}>
                        <h5>Topics</h5>
                        <div>{isHide ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}</div>
                    </div>
                    <nav className="main_box">
                        {!isHide && (
                            <>
                                {topics.map((it, idx) => (
                                    <SidbarButton
                                        key={`${it.name}:${idx}`}
                                        {...it}
                                        isNow={it.link === `/${oneDepth}`}
                                    />
                                ))}
                            </>
                        )}
                    </nav>
                </div>

                <nav className="main_box_mobile">
                    <select
                        value={`/${oneDepth}`}
                        onChange={(e) => {
                            console.log(e.target.value);
                            router.push(e.target.value);
                        }}
                    >
                        {topics.map((it, idx) => (
                            <SidebarOption key={`${it.name}:${idx}`} {...it} />
                        ))}
                    </select>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
