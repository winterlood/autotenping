import "../styles/globals.scss";
import "styles/Layout.scss";
import "styles/PreviewItem.scss";
import "styles/Sidebar.scss";
import "styles/Header.scss";
import "styles/CategoryPage.scss";
import "styles/DetailPage.scss";
import Head from "next/head";
const googleAnalyticsTag = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1P7CRQH5RJ');
`;
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="google-site-verification" content="bnyIPnWg0N3HwAEFXHKZmKZdigpPzIOX7pYWfrcMcEQ" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-1P7CRQH5RJ"></script>
                <script dangerouslySetInnerHTML={{ __html: googleAnalyticsTag }}></script>
                <meta name="naver-site-verification" content="5fee2f4cf8523c85c56fb671ece341cb3b03e9b1" />
                <meta name="msvalidate.01" content="D6A67E754ABDD8C96AF1B1CDCDE1AD99" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name={"viewport"} content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
