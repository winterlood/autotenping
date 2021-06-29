import Layout from "component/Layout";
import Sidebar from "component/Sidebar";
import { getDetailPages, getSlugPageData } from "lib/data";
import React, { useState, useEffect } from "react";
import { BsLink } from "react-icons/bs";
import Head from "next/head";
type Props = {};
const DetailPage = ({ pageData }) => {
    const { ContentID, ContentTitle, ContentMemo, CategoryName, OsType, ApprovalRate, LImage, SImage } = pageData;
    return (
        <Layout>
            <Head>
                <title>{ContentTitle}</title>
            </Head>
            <div className="DetailPage">
                <div className="badge_box">
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
                <div className="page_head">
                    <h2> {pageData.ContentTitle}</h2>

                    <div className="page_sub">
                        원문보기 :{" "}
                        <a target="_blank" href={pageData.Link}>
                            {pageData.Link}
                        </a>
                    </div>
                </div>

                <div
                    className="page_banner"
                    style={{ backgroundImage: `url('${pageData.Images.size1024x500 || pageData.LImage}')` }}
                ></div>
                <div className="page_article">
                    <p>안녕하세요! </p>
                    <p>오늘도 좋은 하루입니다.</p>
                    <p>
                        오늘은 <b>"{pageData.ContentTitle}"</b>을 주제로 들고왔습니다!
                    </p>
                    <p>그럼 오늘도 재미있고 흥미롭게 소개해드릴게요!</p>
                    <p>
                        <br />
                    </p>
                    {pageData.ContentMemo.split("\n").map((it) => (
                        <p>{it || " "}</p>
                    ))}
                    <p>아래 버튼을 눌러 더 자세한 내용을 확인하세요!</p>
                </div>
                <div className="promote_btn">
                    <a target="_blank" href={pageData.Link}>
                        더 자세히 알아보기
                    </a>
                </div>
                <div className="page_slide">
                    {Object.values(pageData.Images).map((it: string) => (
                        <div>
                            <img src={it} alt={it} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
export async function getStaticProps({ params }) {
    const { category, slug } = params;
    const pageData = getSlugPageData(category, slug);
    // const id = params.id.split("-")[1];
    // const data = getItemListByCategory();
    return {
        props: {
            pageData,
        },
    };
}
export async function getStaticPaths() {
    const paths = getDetailPages();
    return { paths, fallback: false };
}
export default DetailPage;
