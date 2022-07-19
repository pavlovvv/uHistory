import Image from "next/dist/client/image";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import ethereumIcon from "../public/images/ethereum.svg";
import dollarIcon from "../public/images/dollar.svg";
import hryvniaIcon from "../public/images/hryvnia.svg";
import openSeaIcon from "../public/images/opensea.png";
import s from "../styles/main.module.css";
import setBackground from "./../other/setBackground";
import MainLayout from "../components/layouts/MainLayout";
import Link from "next/dist/client/link";
import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "../Typescript/redux-hooks";
import { ILocale, IMainProps } from "../Typescript/interfaces/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { IItem } from './../Typescript/interfaces/data';

export async function getStaticProps({ locale }: ILocale) {

  const res1 = await fetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  );

  const resItems = await fetch(
    `https://uhistoryapi.herokuapp.com/items/getItems`
  );

  const items = await resItems.json()

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
      items,
      ...(await serverSideTranslations(locale, ["common", "main", "settings"])),
    },
  };
}

const Main: React.FC<IMainProps> = (props) => {

  const identities = props.items.filter((e: IItem) => {
    return e.category === 'Identities'
  })

  const weapons = props.items.filter((e: IItem) => {
    return e.category === 'Weapons'
  })

  const subarray = [];
  const subWeaponsArray = [];

  let size = 5;

  const max1550 = useMediaQuery("(max-width:1550px)");
  if (max1550) {
    size = 4;
  }

  const max1300 = useMediaQuery("(max-width:1300px)");
  if (max1300) {
    size = 3;
  }

  const max1100 = useMediaQuery("(max-width:1100px)");
  if (max1100) {
    size = 4;
  }

  const max950 = useMediaQuery("(max-width:950px)");
  if (max950) {
    size = 3;
  }

  const max700 = useMediaQuery("(max-width:700px)");
  if (max700) {
    size = 2;
  }

  const max359 = useMediaQuery("(max-width:359px)");
  if (max359) {
    size = 1;
  }

  for (let i = 0; i < Math.ceil(identities.length / size); i++) {
    subarray[i] = identities.slice(i * size, i * size + size);
  }

  for (let i = 0; i < Math.ceil(weapons.length / size); i++) {
    subWeaponsArray[i] = weapons.slice(i * size, i * size + size);
  }

  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeCategory2Step, setActiveCategory2Step] = useState<number>(0);
  const maxSteps = subarray.length;

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCategory2Next = (): void => {
    setActiveCategory2Step((prevActiveStep) => prevActiveStep + 1);
  };

  const handleCategory2Back = (): void => {
    setActiveCategory2Step((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number): void => {
    setActiveStep(step);
  };

  const handleStepCategory2Change = (step: number): void => {
    setActiveCategory2Step(step);
  };

  const name = useAppSelector((state) => state.sign.name);
  const currency = useAppSelector((state) => state.sign.currency);

  const { t } = useTranslation("main");
  const st = useTranslation("settings").t;

  return (
    <MainLayout t={st}>
      <section className={s.left}>
        <div className={s.container}>
          <h2 className={s.left__title}>
            {t("welcome")}, {name}{" "}
          </h2>

          <section className={s.left__category}>
            <div className={s.categoryContainer}>
              <h4 className={s.left__categoryTitle}>{t("identities")}</h4>
              <Link href="https://opensea.io/collection/uhistory?search[stringTraits][0][name]=Category&search[stringTraits][0][values][0]=Identities&search[sortAscending]=true&search[sortBy]=PRICE" passHref>
                <a target="_blank">
                  <Image
                    src={openSeaIcon.src}
                    width="50px"
                    height="50px"
                    alt="uHistory_opensea"
                  />
                </a>
              </Link>
            </div>

            <div className={s.left__categoryItems}>
              <button
                className={s.left__categoryItemsButtonLeft}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <i
                  className="bi bi-arrow-left"
                  style={!max1100 ? { fontSize: "45px" } : { fontSize: "30px" }}
                />
              </button>

              <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {subarray.map((e: any, i: number) => {
                  return (
                    <div className={s.categoryItemsContainer} key={i}>
                      {e.map((e: any, i: number) => {
                        const bgColor: string = setBackground(e.rarity);

                        const dollarOne = Math.round(e.price * props.USD_ETH);
                        const hryvniaOne = Math.round(
                          e.price * props.USD_ETH * props.USDCurrency
                        );

                        return (
                          <Link href={`/items/${e.id}`} passHref key={e.id}>
                            <a target="_blank">
                              <div
                                className={s.left__categoryItem}
                                style={{
                                  backgroundImage: `url(${e.smallavatar})`,
                                }}
                              >
                                <div className={s.left__categoryItemName}>
                                  {e.name}
                                </div>

                                <div className={s.left__categoryItemFooter}>
                                  <i
                                    className="bi bi-heart"
                                    style={{
                                      fontSize: "20px",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <div
                                    className={s.left__categoryItemFooterRarity}
                                    style={{ background: bgColor }}
                                  >
                                    {e.rarity[0]}
                                  </div>
                                  <div
                                    className={s.left__categoryItemFooterCost}
                                  >
                                    {currency === "eth" && (
                                      <>
                                        <Image
                                          src={ethereumIcon.src}
                                          width="11px"
                                          height="19px"
                                          alt="uHistory eth"
                                        />
                                        <span>{e.price}</span>
                                      </>
                                    )}
                                    {currency === "dollar" && (
                                      <>
                                        <Image
                                          src={dollarIcon.src}
                                          width="11px"
                                          height="19px"
                                          alt="uHistory dollar"
                                        />
                                        <span>{dollarOne}</span>
                                      </>
                                    )}
                                    {currency === "hryvnia" && (
                                      <>
                                        <Image
                                          src={hryvniaIcon.src}
                                          width="11px"
                                          height="19px"
                                          alt="uHistory hryvnia"
                                        />
                                        <span>{hryvniaOne}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </SwipeableViews>
              <button
                className={s.left__categoryItemsButtonRight}
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                <i
                  className="bi bi-arrow-right"
                  style={
                    max700
                      ? { fontSize: "30px" }
                      : max1100
                      ? { fontSize: "30px" }
                      : { fontSize: "45px" }
                  }
                />
              </button>
            </div>
          </section>

          <section className={s.left__category}>
            <div className={s.categoryContainer}>
              <h4 className={s.left__categoryTitle}>{t("weapons")}</h4>
              <Link href="https://opensea.io/collection/uhistory?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Category&search[stringTraits][0][values][0]=Weapons" passHref>
                <a target="_blank">
                  <Image
                    src={openSeaIcon.src}
                    width="50px"
                    height="50px"
                    alt="uHistory_opensea"
                  />
                </a>
              </Link>
            </div>

            <div className={s.left__categoryItems}>
              <button
                className={s.left__categoryItemsButtonLeft}
                onClick={handleCategory2Back}
                disabled={activeCategory2Step === 0}
              >
                <i
                  className="bi bi-arrow-left"
                  style={!max1100 ? { fontSize: "45px" } : { fontSize: "30px" }}
                />
              </button>

              <SwipeableViews
                index={activeCategory2Step}
                onChangeIndex={handleStepCategory2Change}
                enableMouseEvents
              >
                {subWeaponsArray.map((e: any, i: number) => {
                  return (
                    <div className={s.categoryItemsContainer} key={i}>
                      {e.map((e: any, i: number) => {
                        const bgColor: string = setBackground(e.rarity);

                        const dollarOne = Math.round(e.price * props.USD_ETH);
                        const hryvniaOne = Math.round(
                          e.price * props.USD_ETH * props.USDCurrency
                        );

                        return (
                          <Link href={`/items/${e.id}`} passHref key={e.id}>
                            <a target="_blank">
                              <div
                                className={s.left__categoryItem}
                                style={{
                                  backgroundImage: `url(${e.smallavatar})`,
                                }}
                              >
                                <div className={s.left__categoryItemName}>
                                  {e.name}
                                </div>

                                <div className={s.left__categoryItemFooter}>
                                  <i
                                    className="bi bi-heart"
                                    style={{
                                      fontSize: "20px",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <div
                                    className={s.left__categoryItemFooterRarity}
                                    style={{ background: bgColor }}
                                  >
                                    {e.rarity[0]}
                                  </div>
                                  <div
                                    className={s.left__categoryItemFooterCost}
                                  >
                                    {currency === "eth" && (
                                      <>
                                        <Image
                                          src={ethereumIcon.src}
                                          width="11px"
                                          height="19px"
                                          alt="uHistory eth"
                                        />
                                        <span>{e.price}</span>
                                      </>
                                    )}
                                    {currency === "dollar" && (
                                      <>
                                        <Image
                                          src={dollarIcon.src}
                                          width="11px"
                                          height="19px"
                                          alt="uHistory dollar"
                                        />
                                        <span>{dollarOne}</span>
                                      </>
                                    )}
                                    {currency === "hryvnia" && (
                                      <>
                                        <Image
                                          src={hryvniaIcon.src}
                                          width="11px"
                                          height="19px"
                                          alt="uHistory hryvnia"
                                        />
                                        <span>{hryvniaOne}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </SwipeableViews>
              <button
                className={s.left__categoryItemsButtonRight}
                onClick={handleCategory2Next}
                disabled={activeCategory2Step === maxSteps - 1}
              >
                <i
                  className="bi bi-arrow-right"
                  style={
                    max700
                      ? { fontSize: "30px" }
                      : max1100
                      ? { fontSize: "30px" }
                      : { fontSize: "45px" }
                  }
                />
              </button>
            </div>
          </section>
        </div>
      </section>
    </MainLayout>
  );
};

export default Main;
