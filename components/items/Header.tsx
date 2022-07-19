import { useMediaQuery } from "@mui/material";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import HeaderDescription from "../../components/items/HeaderDescription";
import HeaderInfo from "../../components/items/HeaderInfo";
import setCategoryColor from "../../other/setCategoryColor";
import setHeaderLeftBackground from "../../other/setHeaderLeftBackground";
import setHeaderRightBackground from "../../other/setHeaderRightBackground";
import setRarityColor from "../../other/setRarityColor";
import openSeaIcon from "../../public/images/opensea.png";
import s from "../../styles/item.module.css";
import {
  IHeaderRightElProps,
  IItemHeaderProps
} from "./../../Typescript/interfaces/data";

const Header: React.FC<IItemHeaderProps> = ({
  item,
  USD_ETH,
  USDCurrency,
  t,
}) => {
  const rarityColor = setRarityColor(item.rarity);
  const categoryColor = setCategoryColor(item.category);
  const backgroundLeft = setHeaderLeftBackground(item.rarity);
  const backgroundRight = setHeaderRightBackground(item.rarity);

  const router = useRouter();

  const dollarOne = Math.round(item.price * USD_ETH);
  const hryvniaOne = Math.round(item.price * USD_ETH * USDCurrency);

  const [activeHeaderStep, setActiveHeaderStep] = useState<number>(0);

  const handleHeaderStepChange = (step: number): void => {
    setActiveHeaderStep(step);
  };

  const [activeHeaderRightStep, setActiveHeaderRightStep] = useState<number>(0);

  const handleHeaderRightStepChange = (step: number): void => {
    setActiveHeaderRightStep(step);
  };

  const headerItems = [
    [
      <HeaderInfo
        item={item}
        rarityColor={rarityColor}
        categoryColor={categoryColor}
        dollarOne={dollarOne}
        hryvniaOne={hryvniaOne}
        t={t}
      />,
    ],
    [<HeaderDescription t={t} description={item.description} />],
  ];

  const max500 = useMediaQuery("(max-width:500px)");
  const max1350 = useMediaQuery("(max-width:1350px)");

  const HeaderRightEl: React.FC<IHeaderRightElProps> = ({ QR, QRimg }) => {
    return (
      <div
        className={s.item__headerRight}
        style={{ background: backgroundRight }}
      >
        <h2 className={s.item__headerRightTitle}>{t("mobile")} AR</h2>
        <div className={s.item__headerRightQR}>
          <Image
            src={QRimg}
            width="300px"
            height="250px"
            alt="uhistory AR QR"
          />
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(QR)}
          className={s.item__headerRightCopy}
        >
          {t("copy")}
        </button>
        <h4
          className={s.item__headerRightText}
          style={!item.QR2 && !max500 ? { minWidth: "max-content" } : {}}
        >
          {t("premium1")}{" "}
          <b className={s.item__headerRightCopyBold}>{t("premium2")}</b>
          {t("premium3")}
        </h4>
      </div>
    );
  };

  let HeaderRightElements = [];

  if (item.QR2) {
    HeaderRightElements = [
      [<HeaderRightEl QR={item.QR1} QRimg={item.QR1img} />],
      [<HeaderRightEl QR={item.QR2} QRimg={item.QR2img} />],
    ];
  }

  return (
    <section className={s.item__header}>
      <div
        className={s.item__headerLeft}
        style={{ background: backgroundLeft }}
      >
        <div className={s.item__headerLeftAva}>
          <img
            src={item.avatar}
            alt={`uHistory ${item.category} ${item.name}`}
            className={s.item__headerLeftAvatar}
          />
        </div>

        <div className={s.item__headerLeftInfo}>
          <h1 className={s.item__headerLeftInfoName}>{item.name}</h1>
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
            <i
              className="bi bi-heart"
              style={{
                fontSize: "45px",
                color: "#fff",
                cursor: "pointer",
              }}
            />
            <Link href="https://opensea.io/uHistory" passHref>
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
              style={activeHeaderStep === 0 ? { backgroundColor: "#fff" } : {}}
            />
            <div
              className={s.item__headerLeftUtilsBottomCircle}
              onClick={() => handleHeaderStepChange(1)}
              style={activeHeaderStep === 1 ? { backgroundColor: "#fff" } : {}}
            />
          </div>
        </div>
      </div>

      <div
        className={s.items__headerRightOutside}
        style={!max1350 && router.locale === "ua" ? { maxWidth: "420px" } : {}}
      >
        {item.QR2 && (
          <button
            className={s.items__headerRightArrowLeft}
            onClick={() => handleHeaderRightStepChange(0)}
            disabled={activeHeaderRightStep === 0}
          >
            <i className="bi bi-arrow-left" style={{ fontSize: "45px" }} />
          </button>
        )}
        {!item.QR2 ? (
          <HeaderRightEl QR={item.QR1} QRimg={item.QR1img} />
        ) : (
          <SwipeableViews
            index={activeHeaderRightStep}
            onChangeIndex={handleHeaderRightStepChange}
            enableMouseEvents
          >
            {HeaderRightElements.map((e) => e.map((e) => e))}
          </SwipeableViews>
        )}
        {item.QR2 && (
          <button
            className={s.items__headerRightArrowRight}
            onClick={() => handleHeaderRightStepChange(1)}
            disabled={activeHeaderRightStep === 1}
          >
            <i className="bi bi-arrow-right" style={{ fontSize: "45px" }} />
          </button>
        )}
      </div>
    </section>
  );
};

export default Header;
