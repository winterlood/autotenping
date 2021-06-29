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
                <button className={props.isNow && "on"}>{name}</button>
            </Link>
        </div>
    );
};

const Sidebar = () => {
    const router = useRouter();
    const oneDepth = router.asPath.split("/")[1];

    const [isHide, setIsHide] = useState<boolean>(false);
    return (
        <div className="Sidebar">
            <div className="sidebar_wrapper">
                <div className="head_box" onClick={() => setIsHide(!isHide)}>
                    <h5>Topics</h5>
                    <div>{isHide ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}</div>
                </div>
                <div className="main_box">
                    {!isHide && (
                        <>
                            {topics.map((it, idx) => (
                                <SidbarButton key={`${it.name}:${idx}`} {...it} isNow={it.link === `/${oneDepth}`} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
