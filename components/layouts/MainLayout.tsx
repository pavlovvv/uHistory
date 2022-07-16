import { CircularProgress, useMediaQuery } from "@mui/material";
import Image from "next/dist/client/image";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef } from "react";
import uHistoryIcon from "../../public/images/logo_blue.png";
import { getOwnInfo } from "../../redux/signSlice";
import s from "../../styles/mainlayout.module.css";
import { useAppDispatch, useAppSelector } from "../../Typescript/redux-hooks";

const MainLayout: React.FC = ({ children }) => {
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
                    key={i}
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
