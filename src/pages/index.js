import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomePage from "../components/HomeComponents";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import footerStyles from "./footer.module.css";

function HomepageHeader() {
  // const { siteConfig } = useDocusaurusContext();
  // return (
  //   <></>
    // <header className={clsx('hero hero--primary', styles.heroBanner)}>
    //   <div className="container">
    //     <Heading as="h1" className="hero__title">
    //       {siteConfig.title}
    //     </Heading>
    //     <p className="hero__subtitle">{siteConfig.tagline}</p>
    //     <div className={styles.buttons}>
    //       <Link
    //         className="button button--secondary button--lg"
    //         to="/docs/intro">
    //        Quickstart
    //       </Link>
    //     </div>
    //   </div>
    // </header>
  //);
}

function HomepageFooter() {
  return (
    <div className={footerStyles.footerCol}>
      <div className={footerStyles.footerItem}>
        <div className={footerStyles.left}>
          © 2022-2024 Particle Labs US Inc
        </div>
        <div className={footerStyles.right}>
          {/*<div className={footerStyles.imgItem}>*/}
          {/*  <img src="/img/homepage/question.png" />*/}
          {/*</div>*/}
          <Link href='https://home.cococat.io' className={footerStyles.imgItem}>
            <img src="/img/homepage/website.png" />
          </Link>
          <Link href='https://github.com/CocoCatWeb3-Official' className={footerStyles.imgItem}>
            <img src="/img/homepage/github.png" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      {/*<main>*/}
      {/*  <HomepageFeatures />*/}
      {/*</main>*/}
      <HomePage />
      <HomepageFooter />
    </Layout>
  );
}
