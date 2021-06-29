import "../styles/globals.scss";
import "styles/Layout.scss";
import "styles/PreviewItem.scss";
import "styles/Sidebar.scss";
import "styles/Header.scss";
import "styles/CategoryPage.scss";
import "styles/DetailPage.scss";
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
