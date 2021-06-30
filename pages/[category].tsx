import Layout from "component/Layout";
import PreviewItem from "component/PreviewItem";
import { getCategoryPageData, getCategoryPages } from "lib/data";
import { topics } from "lib/util";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const CONTENT_LIST_SIZE = 100;

const ContentArticleList = ({ pageData }) => {
    const [isFinal, setIsFinal] = useState<boolean>(false);
    const [filter, setFilter] = useState<"all" | "best" | "hot">("all");
    const [renderData, setRenderData] = useState<Array<any>>([]);
    const { data } = pageData;
    const router = useRouter();
    console.log(router.asPath);

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
        <>
            <Head>
                <meta property="og:description" content={data.map((it) => it.ContentTitle).join(", ")} />
                <meta property="og:image" content={pageData.thumbnailUrl} />
            </Head>
            <div className="page_head">
                <h5>{topics[topics.findIndex((it) => it.link === router.asPath)].name}</h5>
                <div className="head_right_box">
                    <button onClick={() => setFilter("all")} className={`head_btn ${filter === "all" ? "on" : ""}`}>
                        전체
                    </button>
                    <div className="vertical_bar" />
                    <button onClick={() => setFilter("best")} className={`head_btn ${filter === "best" ? "on" : ""}`}>
                        BEST
                    </button>
                    <div className="vertical_bar" />
                    <button onClick={() => setFilter("hot")} className={`head_btn ${filter === "hot" ? "on" : ""}`}>
                        HOT
                    </button>
                </div>
            </div>
            {router.asPath !== "/home" && (
                <article>
                    {renderData.map((it, idx) => (
                        <PreviewItem key={`${it.CampaignType}${it.ContentID}`} {...it} />
                    ))}
                </article>
            )}
            {router.asPath === "/home" && <article>HOME</article>}

            {/* <div onClick={() => loadMore()} className="btn-grad">
                    더보기
                </div> */}
        </>
    );
};

type ContentItem = {
    category: string;
    item_count: number;
    thumbnailUrl: string;
    link: string;
    korCategory?: string;
};
type ContentHomeProps = {
    pageData: Array<ContentItem>;
};
const ContentHome = ({ pageData }: ContentHomeProps) => {
    console.log(pageData);

    const curPageData = pageData.map((pageItem) => {
        return {
            ...pageItem,
            korCategory: topics[topics.findIndex((it) => it.link === `/${pageItem.category}`)].name,
        };
    });
    const ContentBoxItem = (props: ContentItem) => {
        return (
            <Link href={props.link}>
                <div className="ContentBoxItem">
                    <div className="img_box" style={{ backgroundImage: `url('${props.thumbnailUrl}')` }}></div>
                    <div className="info_box">
                        <h5>{props.korCategory}</h5>
                        <label>{props.item_count}개의 소식이 있어요</label>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <>
            <Head>
                <meta
                    property="og:description"
                    content={curPageData.map((it) => `${it.korCategory.split(" ")[1]}${it.item_count}개`).join(", ")}
                />
                {/* <meta property="og:image" content={pageData.thumbnailUrl} /> */}
            </Head>
            <div className="page_head">
                <h5>🏡 홈</h5>
            </div>
            <article className="ContentHome">
                {curPageData.map((pageItem, idx) => {
                    return <ContentBoxItem key={`contentbox:${idx}`} {...pageItem} />;
                })}
            </article>
        </>
    );
};

const Content = ({ pageData }) => {
    const router = useRouter();

    const pageTitle = `소문내자 - ${topics[topics.findIndex((it) => it.link === router.asPath)].name.split(" ")[1]}`;
    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>

                <meta name="description" content={pageTitle} />
                <meta property="og:site_name" content={"소문내자"} />
                <meta property="og:type" content={"article"} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:image" content={pageData.thumbnailUrl} />
                <meta property="og:locale" content="ko_KR" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </Head>
            <div className="CategoryPage">
                {router.asPath !== "/home" && <ContentArticleList pageData={pageData} />}
                {router.asPath === "/home" && <ContentHome pageData={pageData} />}
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
