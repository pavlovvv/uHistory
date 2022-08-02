import "bootstrap-icons/font/bootstrap-icons.css";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import "../other/firebase";
import uHistoryIcon from "../public/images/logo_blue.png";
import store from "../redux/store";
import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <Head>
        <title>uHistory</title>
        <link rel="shortcut icon" href={uHistoryIcon.src} />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
