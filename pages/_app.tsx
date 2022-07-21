import "bootstrap-icons/font/bootstrap-icons.css";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import "../other/firebase";
import uHistoryIcon from "../public/images/logo_blue.png";
import store from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
