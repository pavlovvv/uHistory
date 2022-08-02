import { useMediaQuery } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import MainLayout from "../components/layouts/MainLayout";
import dollarIcon from "../public/images/dollar.svg";
import ethereumIcon from "../public/images/ethereum.svg";
import hryvniaIcon from "../public/images/hryvnia.svg";
import openSeaIcon from "../public/images/opensea.png";
import s from "../styles/item.module.scss";
import { ILocale } from "../Typescript/interfaces/data";
import { useAppSelector } from "../Typescript/redux-hooks";
import { IARContractProps } from "./../Typescript/interfaces/data";

export async function getStaticProps({ locale }: ILocale) {
  const res1 = await fetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  );

  const res2 = await fetch(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=aae069f982b821a9a7f904b5e57a8b14ce233552a23feaf832ca61aa9e533f45"
  );

  const res1arr = await res1.json();
  const res2Obj = await res2.json();

  const USDCurrency = res1arr.find((e) => {
    return e.cc === "USD";
  });

  const USD_ETH = res2Obj.ETH.USD;

  return {
    props: {
      USDCurrency: USDCurrency.rate,
      USD_ETH,
      ...(await serverSideTranslations(locale, ["common", "arcontract"])),
    },
  };
}

const ARContract: React.FC<IARContractProps> = ({ USD_ETH, USDCurrency }) => {
  const st = useTranslation("settings").t;
  const { t } = useTranslation("arcontract");

  const [activeMainStep, setActiveMainStep] = useState<number>(0);

  const handleMainStepChange = (step: number): void => {
    setActiveMainStep(step);
  };

  const max800 = useMediaQuery("(max-width:800px)");
  const max500 = useMediaQuery("(max-width:500px)");
  const max973 = useMediaQuery("(max-width:973px)");
  const max1350 = useMediaQuery("(max-width:1350px)");

  const currency = useAppSelector((state) => state.sign.currency);

  const router = useRouter();

  const dollarOne = Math.round(0.5 * USD_ETH);
  const hryvniaOne = Math.round(0.5 * USD_ETH * USDCurrency);

  const [activeHeaderStep, setActiveHeaderStep] = useState<number>(0);

  const handleHeaderStepChange = (step: number): void => {
    setActiveHeaderStep(step);
  };

  const [activeHeaderRightStep, setActiveHeaderRightStep] = useState<number>(0);

  const handleHeaderRightStepChange = (step: number): void => {
    setActiveHeaderRightStep(step);
  };

  const HeaderInfo: React.FC = () => {
    return (
      <>
        <div
          className={s.item__headerLeftInfoEl}
          style={!max500 ? { fontSize: "22px" } : { fontSize: "19px" }}
        >
          {t("rarity")}:{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(70deg, rgba(255,221,60,1) 0%, rgba(255,241,146,1) 100%)",
            }}
            className={s.item__headerLeftInfoRarity}
          >
            {t("legendary")}
          </span>
        </div>
        <div
          className={s.item__headerLeftInfoEl}
          style={!max500 ? { fontSize: "22px" } : { fontSize: "19px" }}
        >
          {t("category")}:{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(70deg, rgba(255,221,60,1) 0%, rgba(255,241,146,1) 100%)",
            }}
            className={s.item__headerLeftInfoCategory}
          >
            Smart Contracts
          </span>
        </div>
        <div
          className={s.item__headerLeftInfoEl}
          style={!max500 ? { fontSize: "22px" } : { fontSize: "19px" }}
        >
          {t("price")}:{" "}
          <span className={s.item__headerLeftInfoPrice}>
            {" "}
            {currency === "eth" && (
              <>
                <Image
                  src={ethereumIcon.src}
                  width="21px"
                  height="34px"
                  alt="uHistory eth"
                />
                <span>0.5</span>
              </>
            )}
            {currency === "dollar" && (
              <>
                <Image
                  src={dollarIcon.src}
                  width="21px"
                  height="34px"
                  alt="uHistory dollar"
                />
                <span>{dollarOne}</span>
              </>
            )}
            {currency === "hryvnia" && (
              <>
                <Image
                  src={hryvniaIcon.src}
                  width="21px"
                  height="34px"
                  alt="uHistory hryvnia"
                />
                <span>{hryvniaOne}</span>
              </>
            )}
          </span>
        </div>
      </>
    );
  };

  const HeaderDescription: React.FC = () => {
    return (
      <>
        <h2 className={s.item__leftDescriptionTitle}>{t("description")} :</h2>
        <ul className={s.item__leftDescriptionUl}>
          <li>{t("d_inside")}</li>
        </ul>
      </>
    );
  };

  const headerItems = [[<HeaderInfo />], [<HeaderDescription />]];

  const SplineObj1: React.FC = () => {
    return (
      <>
        {!max800 ? (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-07-40.893Zimg1.png?imwidth=64"
            }
            style={{ minWidth: "600px", maxWidth: "1600px" }}
          />
        ) : (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-07-57.887Zimg1Mobile.png?imwidth=64"
            }
            style={{ maxWidth: "440px", width: "100%" }}
          />
        )}
      </>
    );
  };

  const ImageObj2: React.FC = () => {
    return (
      <>
        {!max800 ? (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-08-14.289Zimg2.png?imwidth=64"
            }
            style={{ minWidth: "600px", maxWidth: "1600px" }}
          />
        ) : (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-08-28.774Zimg2Mobile.png?imwidth=64"
            }
            style={{ maxWidth: "440px", width: "100%" }}
          />
        )}
      </>
    );
  };

  const ImageObj3: React.FC = () => {
    return (
      <>
        {!max800 ? (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-08-45.367Zimg3.png?imwidth=64"
            }
            style={{ minWidth: "600px", maxWidth: "1600px" }}
          />
        ) : (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-08-56.641Zimg3Mobile.png?imwidth=64"
            }
            style={{ maxWidth: "440px", width: "100%" }}
          />
        )}
      </>
    );
  };

  const ImageObj4: React.FC = () => {
    return (
      <>
        {!max800 ? (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-09-09.929Zimg4.png?imwidth=64"
            }
            style={{ minWidth: "600px", maxWidth: "1600px" }}
          />
        ) : (
          <img
            src={
              "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-10-14.753Zimg4Mobile.png?imwidth=64"
            }
            style={{ maxWidth: "440px", width: "100%" }}
          />
        )}
      </>
    );
  };

  const MainItems = [
    [<SplineObj1 />],
    [<ImageObj2 />],
    [<ImageObj3 />],
    [<ImageObj4 />],
  ];

  return (
    <MainLayout t={st}>
      <main className={s.itemPage}>
        <div className={s.container}>
          <section className={s.item__header}>
            <div
              className={s.item__headerLeft}
              style={{
                background:
                  "linear-gradient(75deg, rgba(255,255,255,0) 20%, rgba(255,229,105,0.13) 100%)",
              }}
            >
              <div
                className={s.item__headerLeftAva}
                style={!max973 ? { maxWidth: "350px" } : {}}
              >
                <img
                  src={
                    "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T21-07-57.887Zimg1Mobile.png?imwidth=64"
                  }
                  alt={`uHistory ARContract avatar`}
                  className={s.item__headerLeftAvatar}
                />
              </div>

              <div className={s.item__headerLeftInfo}>
                <h1 className={s.item__headerLeftInfoName}>AR Contract</h1>
                <SwipeableViews
                  index={activeHeaderStep}
                  onChangeIndex={handleHeaderStepChange}
                  enableMouseEvents
                >
                  {headerItems.map((e, i) => e.map((e, i) => e))}
                </SwipeableViews>
              </div>

              <div className={s.item__headerLeftUtils}>
                <div className={s.item__headerLeftUtilsTop}>
                  <Link
                    href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/15079132611063179377080374112112344216381780960247741644635325423886218035300"
                    passHref
                  >
                    <a target="_blank" style={{ minWidth: "50px" }}>
                      <Image
                        src={openSeaIcon.src}
                        width="50px"
                        height="50px"
                        alt="uHistory opensea"
                      />
                    </a>
                  </Link>
                </div>
                <div className={s.item__headerLeftUtilsBottom}>
                  <div
                    className={s.item__headerLeftUtilsBottomCircle}
                    onClick={() => handleHeaderStepChange(0)}
                    style={
                      activeHeaderStep === 0 ? { backgroundColor: "#fff" } : {}
                    }
                  />
                  <div
                    className={s.item__headerLeftUtilsBottomCircle}
                    onClick={() => handleHeaderStepChange(1)}
                    style={
                      activeHeaderStep === 1 ? { backgroundColor: "#fff" } : {}
                    }
                  />
                </div>
              </div>
            </div>

            <div
              className={s.items__headerRightOutside}
              style={
                !max1350 && router.locale === "ua" ? { maxWidth: "420px" } : {}
              }
            >
              <div
                className={s.item__headerRight}
                style={{
                  background:
                    "linear-gradient(280deg, rgba(255,255,255,0) 40%, rgba(255,229,105,0.13) 100%)",
                  justifyContent: "space-around",
                }}
              >
                <h2 className={s.item__headerRightTitle}>{t("get_this")} AR</h2>
                <div className={s.item__headerRightQR}>
                  <Image
                    src={
                      "https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-19T23-06-24.901Zqrarc.png?imwidth=64"
                    }
                    width="300px"
                    height="250px"
                    alt="uhistory AR QR"
                  />
                </div>
                <h4
                  className={s.item__headerRightText}
                  style={!max500 ? { minWidth: "max-content" } : {}}
                >
                  {t("premium1")}
                  <b className={s.item__headerRightCopyBold}>{t("premium2")}</b>
                  {t("premium3")}
                </h4>
              </div>
            </div>
          </section>

          <section className={s.item__frames} style={{ position: "relative" }}>
            <SwipeableViews
              index={activeMainStep}
              onChangeIndex={handleMainStepChange}
              enableMouseEvents
            >
              {MainItems.map((e, i) =>
                e.map((e, i) => (
                  <div
                    key={activeMainStep}
                    className={s.item__frame}
                    style={max500 ? { paddingBottom: "35px" } : {}}
                  >
                    {e}
                  </div>
                ))
              )}
            </SwipeableViews>
            <div
              className={s.item__changeBtn1}
              style={activeMainStep === 0 ? { backgroundColor: "#fff" } : {}}
              onClick={() => handleMainStepChange(0)}
            />

            <div
              className={s.item__changeBtn2}
              style={activeMainStep === 1 ? { backgroundColor: "#fff" } : {}}
              onClick={() => handleMainStepChange(1)}
            />
            <div
              className={s.item__changeBtn3}
              style={activeMainStep === 2 ? { backgroundColor: "#fff" } : {}}
              onClick={() => handleMainStepChange(2)}
            />
            <div
              className={s.item__changeBtn4}
              style={activeMainStep === 3 ? { backgroundColor: "#fff" } : {}}
              onClick={() => handleMainStepChange(3)}
            />
          </section>
        </div>
      </main>
    </MainLayout>
  );
};

export default ARContract;
