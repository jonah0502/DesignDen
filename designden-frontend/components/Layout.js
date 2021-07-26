import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}

      {router.pathname.substr(0, 6) === "/admin" ? (
        <div className={styles.adminContainer}>
          <Sidebar />
          <div>{children}</div>
        </div>
      ) : (
        <div className={styles.container}>{children}</div>
      )}
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DesignDen | Find the best designs",
  description: "Find sleek and modern website solutions",
  keywords: "Website, template, designden",
};

