import { Popover, useMediaQuery, CircularProgress } from "@mui/material";
import Image from "next/dist/client/image";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import UAIcon from "../../public/images/UAIcon.png";
import uHistoryText from "../../public/images/uhistory_text.png";
import USIcon from "../../public/images/USIcon.png";
import s from "../../styles/main.module.css";
import { IInitialLayoutProps } from "./../../Typescript/interfaces/data";
import { useAppSelector } from "../../Typescript/redux-hooks";
import Head from "next/dist/shared/lib/head";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../Typescript/redux-hooks";
import { getOwnInfo } from "../../redux/signSlice";

const InitialLayout: React.FC<IInitialLayoutProps> = ({ t, children }) => {
  const max500 = useMediaQuery("(max-width:500px)");

  const router = useRouter();

  const isSigning = useAppSelector(state => state.sign.isSigning)
  const isAuthFulfilled = useAppSelector(state => state.sign.isAuthFulfilled)

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open: boolean = Boolean(anchorEl);
  const id: string | undefined = open ? "simple-popover" : undefined;

  const isInfoCheckDone = useRef<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInfoCheckDone.current) {
      dispatch(getOwnInfo());
      isInfoCheckDone.current = true;
    }
  }, []);

  return (
    <>
    <div className={!isAuthFulfilled ? s.none : s.main}>
      <Head>
      <script src="https://accounts.google.com/gsi/client" async defer />
      </Head>
      <header className={s.main__header}>
        <Link href="/" passHref>
          <a>
            <Image
              src={uHistoryText.src}
              width={!max500 ? "190px" : "150px"}
              height={!max500 ? "40px" : "30px"}
              alt="uHistory"
            />
          </a>
        </Link>
        <div className={s.main__headerRight}>
          <Link href="https://opensea.io/uHistory" passHref>
            <a target="_blank" className={s.main__headerRightLink}>
              {t("get_in_touch")}
            </a>
          </Link>
          <div>
            <img
              src={router.locale === "en" ? USIcon.src : UAIcon.src}
              className={s.main__headerLanguage}
              onClick={(e: any) => handleClick(e)}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ mt: "15px" }}
              PaperProps={{
                sx: {
                  background: "none",
                  padding: 0,
                },
              }}
            >
              <Link
                href={router.pathname}
                locale={router.locale === "en" ? "ua" : "en"}
              >
                <img
                  src={router.locale !== "en" ? USIcon.src : UAIcon.src}
                  className={s.main__headerLanguage}
                />
              </Link>
            </Popover>
          </div>
        </div>
      </header>

      {children}

      <footer className={s.main__mainBottom + " " + s.container} style={isSigning ? {display: 'none'} : {}}>
            <div className={s.main__mainBottomLinks}>
              <Link href="https://www.instagram.com/uhistorynft/" passHref>
              <a target='_blank'>
              <i className={"bi bi-instagram" + ' ' + s.iconOnHover}
              style={{fontSize:'30px'}}
              />
              </a>
              </Link>

              <Link href="https://t.me/uhistorynft" passHref>
              <a target='_blank'>
              <i className={"bi bi-telegram" + ' ' + s.iconOnHover}
              style={{fontSize:'30px'}}
              />
              </a>
              </Link>

              <Link href="https://discord.gg/YhfRQvrEtE" passHref>
              <a target='_blank'>
              <i className={"bi bi-discord" + ' ' + s.iconOnHover}
              style={{fontSize:'30px'}}
              />
              </a>
              </Link>

              <Link
                href="https://twitter.com/i/lists/1546545585632706561?t=rmbtytn7S4n_CSqhg67Z_A&s=09"
                passHref
              >
              <a target='_blank'>
              <i className={"bi bi-twitter" + ' ' + s.iconOnHover}
              style={{fontSize:'30px'}}
              />
              </a>
              </Link>
            </div>

            <span className={s.main__mainBottomText}>VoidFuture</span>
          </footer>
    </div>
    <div className={isAuthFulfilled ? s.none : s.undefined}>
        <div className={s.preloader}>
          <div className={s.preloaderitem}>
            <CircularProgress
              size={100}
              sx={{ display: "block", margin: "auto", color: "#fff" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialLayout;
