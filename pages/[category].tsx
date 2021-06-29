import Layout from "component/Layout";
import PreviewItem from "component/PreviewItem";
import { getCategoryPageData, getCategoryPages } from "lib/data";
import { topics } from "lib/util";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const CONTENT_LIST_SIZE = 100;
const Content = ({ pageData }) => {
    const [isFinal, setIsFinal] = useState<boolean>(false);
    const [filter, setFilter] = useState<"all" | "best" | "hot">("all");
    const [renderData, setRenderData] = useState<Array<any>>([]);
    const { data } = pageData;
    const router = useRouter();

    useEffect(() => {
        setRenderData(data.slice(0, CONTENT_LIST_SIZE));
    }, [data]);

    useEffect(() => {
        var remain_data = data.slice();
        remain_data =
            filter === "all"
                ? remain_data
                : filter === "best"
                ? remain_data.filter((it) => it.ApprovalRate === "최상")
                : remain_data.filter((it) => it.ApprovalRate === "상");
        setRenderData(remain_data.slice(0, CONTENT_LIST_SIZE));
        setIsFinal(false);
    }, [filter]);

    const loadMore = () => {
        var resData = renderData.slice();
        const pivotLength = resData.length;

        var remain_data = data.slice();
        remain_data =
            filter === "all"
                ? remain_data
                : filter === "best"
                ? remain_data.filter((it) => it.ApprovalRate === "최상")
                : remain_data.filter((it) => it.ApprovalRate === "상");

        resData = resData.concat(remain_data.slice(pivotLength, pivotLength + CONTENT_LIST_SIZE));
        setRenderData(resData);

        if (pivotLength == remain_data.length) {
            setIsFinal(true);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Acha - {topics[topics.findIndex((it) => it.link === router.asPath)].name.split(" ")[1]}</title>
            </Head>
            <div className="CategoryPage">
                <div className="page_head">
                    <h5>{topics[topics.findIndex((it) => it.link === router.asPath)].name}</h5>
                    <div className="head_right_box">
                        <button onClick={() => setFilter("all")} className={`head_btn ${filter === "all" ? "on" : ""}`}>
                            전체
                        </button>
                        <div className="vertical_bar" />
                        <button
                            onClick={() => setFilter("best")}
                            className={`head_btn ${filter === "best" ? "on" : ""}`}
                        >
                            BEST
                        </button>
                        <div className="vertical_bar" />
                        <button onClick={() => setFilter("hot")} className={`head_btn ${filter === "hot" ? "on" : ""}`}>
                            HOT
                        </button>
                    </div>
                </div>
                <div>
                    {renderData.map((it, idx) => (
                        <PreviewItem key={`${it.CampaignType}${it.ContentID}`} {...it} />
                    ))}
                </div>
                {/* <div onClick={() => loadMore()} className="btn-grad">
                    더보기
                </div> */}
            </div>
        </Layout>
    );
};
export async function getStaticProps({ params }) {
    console.log(params.category);
    const pageData = getCategoryPageData(params.category);
    return {
        props: {
            pageData,
        },
    };
}
export async function getStaticPaths() {
    const paths = getCategoryPages();
    return { paths, fallback: false };
}
export default Content;
