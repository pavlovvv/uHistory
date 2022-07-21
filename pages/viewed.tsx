import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MainLayout from "../components/layouts/MainLayout";
import setBackground from "../other/setBackground";
import dollarIcon from "../public/images/dollar.svg";
import ethereumIcon from "../public/images/ethereum.svg";
import hryvniaIcon from "../public/images/hryvnia.svg";
import { likeItem } from "../redux/signSlice";
import s from "../styles/liked.module.css";
import s2 from "../styles/main.module.css";
import { IItem, ILikedProps, ILocale } from "../Typescript/interfaces/data";
import { useAppDispatch, useAppSelector } from "../Typescript/redux-hooks";

export async function getStaticProps({ locale }: ILocale) {
  const resItems = await fetch(
    `https://uhistoryapi.herokuapp.com/items/getItems`
  );

  const items = await resItems.json();

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
      items,
      USDCurrency: USDCurrency.rate,
      USD_ETH,
      ...(await serverSideTranslations(locale, [
        "common",
        "settings",
        "viewed",
      ])),
    },
  };
}

const Viewed: React.FC<ILikedProps> = (props) => {
  const { t } = useTranslation("viewed");
  const st = useTranslation("settings").t;

  const likedArr = useAppSelector((state) => state.sign.likedArr);
  const watchedArr = useAppSelector((state) => state.sign.watchedArr);
  const isAuthFulfilled = useAppSelector((state) => state.sign.isAuthFulfilled);
  const currency = useAppSelector((state) => state.sign.currency);
  const isPending = useAppSelector((state) => state.sign.isPending);

  const [filteredItems, setFilteredItems] = useState(null);
  const [todayArr, setTodayArr] = useState(null);
  const [thisWeekArr, setThisWeekArr] = useState(null);
  const [thisMonthArr, setThisMonthArr] = useState(null);

  useEffect(() => {
    if (isAuthFulfilled) {
      setFilteredItems(
        props.items.filter((e: IItem) => {
          for (let i = 0; i < watchedArr.length; i++) {
            if (e.id === watchedArr[i].id) {
              return true;
            }
          }
          return false;
        })
      );
    }
  }, [isAuthFulfilled]);

  useEffect(() => {
    if (filteredItems !== null && filteredItems.length !== 0) {
      const currentDate: any = new Date();

      setTodayArr(
        filteredItems.filter((e) => {
          for (let i = 0; i < watchedArr.length; i++) {
            const date: any = new Date(watchedArr[i].date);
            const dateDifference = Math.abs(currentDate - date);
            if (
              e.id === watchedArr[i].id &&
              new Date(dateDifference).getDate() === 1
            ) {
              return true;
            }
          }
          return false;
        })
      );

      setThisWeekArr(
        filteredItems.filter((e) => {
          for (let i = 0; i < watchedArr.length; i++) {
            const date: any = new Date(watchedArr[i].date);
            const dateDifference = Math.abs(currentDate - date);
            if (
              e.id === watchedArr[i].id &&
              new Date(dateDifference).getDate() > 1 &&
              new Date(dateDifference).getDate() < 8
            ) {
              return true;
            }
          }
          return false;
        })
      );

      setThisMonthArr(
        filteredItems.filter((e) => {
          for (let i = 0; i < watchedArr.length; i++) {
            const date: any = new Date(watchedArr[i].date);
            const dateDifference = Math.abs(currentDate - date);
            if (
              e.id === watchedArr[i].id &&
              new Date(dateDifference).getDate() >= 8 &&
              new Date(dateDifference).getMonth() < 1
            ) {
              return true;
            }
          }
          return false;
        })
      );
    }
  }, [filteredItems]);

  const dispatch = useAppDispatch();

  const handleLikeItem = (id: number): void => {
    dispatch(likeItem({ id }));
  };

  const itemInner: React.FC<any> = (arr, name) => {
    return (
      <>
        {arr?.length !== 0 && (
          <section className={s.liked__main}>
            <div className={s.liked__mainTop}>
              <div className={s.liked__mainContainer}>
                <h2 className={s.liked__mainTopTitle}>
                  {name} | {arr.length}
                </h2>
              </div>
            </div>

            <div className={s.liked__mainItems}>
              <div className={s.liked__mainContainer}>
                <div className={s.liked__mainItemsInner}>
                  {arr?.map((e: any, i: number) => {
                    const bgColor: string = setBackground(e.rarity);

                    const dollarOne = Math.round(e.price * props.USD_ETH);
                    const hryvniaOne = Math.round(
                      e.price * props.USD_ETH * props.USDCurrency
                    );

                    return (
                      <Link href={`/items/${e.id}`} passHref key={e.id}>
                        <a target="_blank">
                          <div
                            className={s2.left__categoryItem}
                            style={{
                              backgroundImage: `url(${e.smallavatar})`,
                            }}
                          >
                            <div className={s2.left__categoryItemName}>
                              {e.name}
                            </div>

                            <div className={s2.left__categoryItemFooter}>
                              <button
                                className={s2.left__categoryItemFooterButton}
                                onClick={(el) => {
                                  el.preventDefault();
                                  !isPending && handleLikeItem(e.id);
                                }}
                              >
                                {!likedArr.includes(e.id) ? (
                                  <i
                                    className="bi bi-heart"
                                    style={{
                                      fontSize: "20px",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  <i
                                    className="bi bi-heart-fill"
                                    style={{
                                      fontSize: "20px",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </button>
                              <div
                                className={s2.left__categoryItemFooterRarity}
                                style={{ background: bgColor }}
                              >
                                {e.rarity[0]}
                              </div>
                              <div className={s2.left__categoryItemFooterCost}>
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
              </div>
            </div>
          </section>
        )}
      </>
    );
  };

  return (
    <MainLayout t={st}>
      <section className={s.liked}>
        <div className={s.container}>
          <h2 className={s.liked__title}>{t("viewed")}</h2>

          {todayArr || thisWeekArr || thisMonthArr ? (
            <>
              {itemInner(todayArr, t("today"))}
              {itemInner(thisWeekArr, t("this_week"))}
              {itemInner(thisMonthArr, t("this_month"))}
            </>
          ) : (
            <section className={s.liked__main}>
              <div className={s.liked__mainTop}>
                <div className={s.liked__mainContainer}>
                  <h2 className={s.liked__mainTopTitle}>{t("today")}</h2>
                </div>
              </div>

              <div className={s.liked__mainItems}>
                <div className={s.liked__mainContainer}>
                  <div className={s.liked__mainItemsInner}>
                    <div className={s.liked__mainItemsNotLiked}>
                      {t("no_activity")}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Viewed;
