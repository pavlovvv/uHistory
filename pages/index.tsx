import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import jwtDecode from "jwt-decode";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/dist/client/image";
import React, { useEffect, useRef } from "react";
import InitialLayout from "../components/layouts/InitialLayout";
import char from "../public/images/char.png";
import s from "../styles/index.module.css";
import { IGoogleUserData, ILocale } from "../Typescript/interfaces/data";
import { useAppDispatch, useAppSelector } from './../Typescript/redux-hooks';
import { setSigning } from "../redux/signSlice";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import { continueWithGoogle } from "../redux/signSlice";


export async function getStaticProps({ locale }: ILocale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "initial"])),
    },
  };
}

declare const window: any;

const Main: React.FC = () => {
  const max500 = useMediaQuery("(max-width:500px)");
  const max1200 = useMediaQuery("(max-width:1200px)");

  const dispatch = useAppDispatch()
  const router = useRouter()

  const isRegConfirmed = useAppSelector(state => state.sign.isRegConfirmed)
  const isAuthed = useAppSelector(state => state.sign.isAuthed)

  const { t } = useTranslation("initial");

  const moveTop = {
    visible: {
      y: 0,
      opacity: 1,
    },

    hidden: {
      y: 100,
      opacity: 0,
    },
  };

  const charRef = useRef<HTMLDivElement>();

  useEffect(() => {
    
    if (isRegConfirmed) {
      router.push('/main')
    }

    else if (isAuthed) {
      router.push('/main')
    }
  }, [isRegConfirmed, isAuthed])

  useEffect(() => {
    dispatch(setSigning(false));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if(charRef.current?.style) {
        charRef.current.style.marginLeft = -(e.pageX * 0.03) + "px";
        charRef.current.style.marginTop = -(e.pageY * 0.03) + "px";
      }
    });
  }, []);

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_CAT_TALK_GOOGLE_ACCOUNTS_CLIENT_ID,
      callback: (response: any) => {
        const userData: IGoogleUserData = jwtDecode(response.credential);
        const sentUserData: IGoogleUserData = {
          email: null,
          given_name: null,
          picture: null,
        };

        sentUserData.email = userData.email
        sentUserData.given_name = userData.given_name

        if (userData.family_name) {
          sentUserData.given_name = sentUserData.given_name.concat(' ' + userData.family_name)
        }

        const name_surname: string[] = sentUserData.given_name.split(' ')

        let str: string = ''
    
        for (let i = 0; i < name_surname.length; i++) {
          str = str.concat(name_surname[i].charAt(0).toUpperCase() +
          name_surname[i].slice(1).toLowerCase())
          str = str.concat(' ')
        }
        str = str.trimEnd()

        dispatch(
          continueWithGoogle({
            email: sentUserData.email,
            name: str
          })

        );
      },
    }); 

    window.google?.accounts.id.renderButton(
      document.getElementById("googleContinue"),
      {
        theme: "filled_black",
        locale: "en",
        size: !max500 ? "large" : "medium",
        text: "continue_with",
        logo_alignment: "left",
        type: "standard",
        width: "100",
      }
    );
  }, [max500]);

  return (
      <InitialLayout t={t}>
        <main className={s.main__main}>
          <section className={s.main__mainTop + " " + s.container}>
            <section className={s.main__mainSectionLeft + " " + s.sectionLeft}>
              <motion.h2
                className={s.sectionLeftText}
                initial="hidden"
                animate="visible"
                variants={moveTop}
                transition={{ delay: 0 }}
              >
                {t("discover")}
              </motion.h2>

              <motion.h2
                className={s.sectionLeftText}
                initial="hidden"
                animate="visible"
                variants={moveTop}
                transition={{ delay: 0.2 }}
              >
                {t("learn")}
              </motion.h2>

              <motion.h2
                className={s.sectionLeftText}
                initial="hidden"
                animate="visible"
                variants={moveTop}
                transition={{ delay: 0.4 }}
              >
                {t("collect")}
              </motion.h2>

              <motion.h2
                className={s.sectionLeftText + " " + s.outlinedText}
                style={{ marginBottom: "25px" }}
                initial="hidden"
                animate="visible"
                variants={moveTop}
                transition={{ delay: 0.6 }}
              >
                {t("with_web_3.0")}
              </motion.h2>

              <div className={s.main__mainSectionLeftAuth}>
                <Link href="/signup" passHref>
                <a className={s.sectionLeft__email}>
                  {t("continue_with_email")}
                </a>
                </Link>

                <div id="googleContinue" />
              </div>
            </section>
            <section
              className={s.main__mainSectionRight + " " + s.sectionRight}
            >
              <div className={s.sectionRight__char} ref={charRef}>
                <Image
                  src={char.src}
                  width={!max1200 ? "883px" : "600px"}
                  height={!max1200 ? "704px" : "478px"}
                  alt="uHistory_character"
                />
              </div>
            </section>
          </section>
        </main>
    </InitialLayout>
  );
};

export default Main;
