import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter();
    if (typeof window !== "undefined") {
        router.push("/home");
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>소문내자 - 잠시만 기다려주세요</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};
export default Home;
