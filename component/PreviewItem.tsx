import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
type Props = {};
const PreviewItem = (props) => {
    const router = useRouter();
    const { ContentID, ContentTitle, ContentMemo, CategoryName, OsType, ApprovalRate, SImage } = props;

    return (
        <div className="PreviewItem">
            <div className="item_wrapper">
                <div
                    className="img_box"
                    style={{
                        backgroundImage: `url('${SImage}')`,
                    }}
                ></div>
                <div className="info_box">
                    <Link href={`${router.asPath}/${ContentID}`}>
                        <h4>{ContentTitle}</h4>
                    </Link>
                    <div className="sub_text">{ContentMemo.slice(0, 80)}...</div>
                    <div className="additional_box">
                        <span className="badge">{CategoryName}</span>
                        <span className="badge">
                            {OsType === "Both" ? "안드로이드&IOS" : OsType === "And" ? "안드로이드" : "IOS"}
                        </span>
                        {ApprovalRate === "최상" ? (
                            <span className="badge">BEST</span>
                        ) : ApprovalRate === "상" ? (
                            <span className="badge">HOT</span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewItem;
