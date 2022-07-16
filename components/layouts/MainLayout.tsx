import React from "react";
import { CircularProgress, useMediaQuery, Popover, Box } from "@mui/material";
import Image from "next/dist/client/image";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import UAicon from "../../public/images/UAIcon.png";
import USicon from "../../public/images/USIcon.png";
import uHistoryIcon from "../../public/images/logo_blue.png";
import { getOwnInfo, logOut, updateCurrency } from "../../redux/signSlice";
import s from "../../styles/mainlayout.module.css";
import { useAppDispatch, useAppSelector } from "../../Typescript/redux-hooks";
import Link from "next/dist/client/link";
import { ClickAwayListener } from "@mui/base";
import { IMainLayoutProps } from "../../Typescript/interfaces/data";


const MainLayout: React.FC<IMainLayoutProps> = ({ children, t }) => {
  const navItems: string[] = [
    "bi-layers",
    "bi-heart",
    "bi-clock-history",
    "bi-person-bounding-box",
    "bi-gear",
  ];

  const linkItems: string[] = [
    "/main",
    "/liked",
    "/viewed",
    "/profile",
    "/settings",
  ];

  const max500 = useMediaQuery("(max-width:500px)");

  const router = useRouter();

  const isInfoCheckDone = useRef<boolean>(false);
  const dispatch = useAppDispatch();

  const isAuthed = useAppSelector((state) => state.sign.isAuthed);
  const isAuthFulfilled = useAppSelector((state) => state.sign.isAuthFulfilled);

  useEffect(() => {
    if (!isInfoCheckDone.current) {
      dispatch(getOwnInfo());
      isInfoCheckDone.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isAuthed && isAuthFulfilled) {
      router.push("/");
    }
  }, [isAuthFulfilled, isAuthed]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open: boolean = Boolean(anchorEl);
  const id: string | undefined = open ? "simple-popover" : undefined;

  const handleLogOut = (): void => {
    dispatch(logOut());
  };

  const [currencyOpen, setCurrencyOpen] = useState<boolean>(false);

  const handleCurrencyClick = (): void => {
    setCurrencyOpen((prev) => !prev);
  };

  const handleClickAway = (): void => {
    setCurrencyOpen(false);
  };

  const handleUpdateCurrency = (currency: string): void => {
    dispatch(updateCurrency({currency}))
    setCurrencyOpen(false);
  }


  return (
    <>
      <main className={!isAuthFulfilled ? s.none : s.main}>
        {children}

        <section className={s.right}>
          <div className={s.right__inner}>
            <div className={s.right__icon}>
              <div
                className={s.right__navItemInner}
                style={{ minWidth: "29px" }}
              >
                <Image
                  src={uHistoryIcon.src}
                  width="45px"
                  height="49px"
                  alt="uHistory icon"
                />
              </div>
            </div>
            <nav className={s.right__nav}>
              {navItems.map((e: string, i: number) => {
                return (
                  <div style={{ width: "100%" }} key={i}>
                    {i !== navItems.length - 1 ? (
                      <div
                        className={s.right__navItem}
                        style={
                          router.pathname.includes(linkItems[i])
                            ? {
                                cursor: "pointer",
                                background: "rgba(188, 217, 255, 0.2)",
                              }
                            : { cursor: "pointer" }
                        }
                      >
                        <div className={s.right__navItemInner}>
                          <i
                            className={`bi ${e}`}
                            style={
                              max500
                                ? { fontSize: "15px", color: "#bcd9ff" }
                                : { fontSize: "23px", color: "#bcd9ff" }
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={s.right__navItem}
                        onClick={(e: any) => handleClick(e)}
                        style={
                          !anchorEl
                            ? { cursor: "pointer" }
                            : {
                              cursor: "pointer",
                              background: "rgba(188, 217, 255, 0.2)",
                            }
                            }
                      >
                        <div className={s.right__navItemInner}>
                          <i
                            className={`bi ${e}`}
                            style={
                              max500
                                ? { fontSize: "15px", color: "#bcd9ff" }
                                : { fontSize: "23px", color: "#bcd9ff" }
                            }
                          />
                        </div>
                      </div>
                    )}
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        sx: {
                          background: "rgba(41, 41, 41, 0.5)",
                          padding: 0,
                          color: "#fff",
                          borderRadius: "15px",
                        },
                      }}
                    >
                      <div className={s.popover__item}>
                        <div className={s.popoverContainer}>
                          <div className={s.popover__topInner}>
                            <span className={s.popover__topTitle}>
                              <b>{t('settings')}</b>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={s.popover__item}>
                        <div className={s.popoverContainer}>
                          <div className={s.popover__center1Inner}>
                            <span className={s.popover__center1Text}>
                              {t('currency')}:{" "}
                            </span>
                              <Box style={{ position: "relative" }}>
                                <button type='button'
                                  onClick={handleCurrencyClick}
                                  className={s.popover__center1Button}
                                >
                                  Ethereum
                                </button>
                                <ClickAwayListener
                              mouseEvent="onMouseDown"
                              touchEvent="onTouchStart"
                              onClickAway={handleClickAway}
                            >
                              <>
                                {currencyOpen ? (
                                  <div className={s.popover__currencyInner}>
                                    <div className={s.popover__currencyItem} onClick={() =>  handleUpdateCurrency('eth')} >
                                      <div
                                        className={
                                          s.popover__currencyItemContainer
                                        }
                                      >
                                        Ethereum
                                      </div>
                                    </div>
                                    <div className={s.popover__currencyItem} onClick={() => {handleUpdateCurrency('dollar')}} >
                                      <div
                                        className={
                                          s.popover__currencyItemContainer
                                        }
                                      >
                                        Us dollar
                                      </div>
                                    </div>
                                    <div className={s.popover__currencyItem} style={{border: 0}} onClick={() => {handleUpdateCurrency('hryvnia')}} >
                                      <div
                                        className={
                                          s.popover__currencyItemContainer
                                        }
                                      >
                                        {t('hryvnia')}
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                </>
                                </ClickAwayListener>
                              </Box>
                            
                           {currencyOpen ? <i className="bi bi-caret-up-fill" /> : <i className="bi bi-caret-down-fill" />}
                          </div>
                        </div>
                      </div>

                      <div className={s.popover__item}>
                        <div className={s.popoverContainer}>
                          <div className={s.popover__center2Inner}>
                            <span className={s.popover__center2Text}>
                              {t('language')}:{" "}
                            </span>
                            <div className={s.popover__center2Languages}>
                              <Link href={router.pathname} locale="ua">
                                <a style={{ cursor: "pointer" }}>
                                  <Image
                                    src={UAicon.src}
                                    width="24px"
                                    height="24px"
                                    alt="uHistory UA icon"
                                  />
                                </a>
                              </Link>
                              <Link href={router.pathname} locale="en">
                                <a style={{ cursor: "pointer" }}>
                                  <Image
                                    src={USicon.src}
                                    width="24px"
                                    height="24px"
                                    alt="uHistory US icon"
                                  />
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={s.popover__item} style={{ border: 0 }}>
                        <div className={s.popoverContainer}>
                          <div className={s.popover__bottomInner}>
                            <Link href="https://opensea.io/uHistory" passHref>
                              <a
                                target="_blank"
                                className={s.popover__bottomText1}
                              >
                                Opensea{" "}
                              </a>
                            </Link>
                            <span
                              className={s.popover__bottomText2}
                              onClick={handleLogOut}
                            >
                              {t('log_out')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Popover>
                  </div>
                );
              })}
            </nav>
          </div>
        </section>
      </main>
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

export default MainLayout;
