import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import uHistoryIcon from '../public/images/logo_blue.png'
import '../other/firebase'
import { appWithTranslation } from "next-i18next";
import store from "../redux/store";
import { Provider } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";


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
};

export default appWithTranslation(MyApp)
