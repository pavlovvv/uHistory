import React from "react";
import { useMediaQuery, CircularProgress } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import Bottom from "../../components/items/Bottom";
import Header from "../../components/items/Header";
import MainLayout from "../../components/layouts/MainLayout";
import { getScene, watchItem } from "../../redux/signSlice";
import s from "../../styles/item.module.scss";
import { IItemGetServerSideProps } from "../../Typescript/interfaces/data";
import { useAppDispatch } from "../../Typescript/redux-hooks";
import { IItemProps } from "./../../Typescript/interfaces/data";
import Spline from '@splinetool/react-spline';
import { useRef } from "react";


export async function getServerSideProps({
  params,
  locale,
}: IItemGetServerSideProps) {
  const res = await fetch(
    `https://uhistoryapi.herokuapp.com/items/search/${params.item}`
  );

  const item = await res.json();

  const categoryRes = await fetch(
    `https://uhistoryapi.herokuapp.com/items/category/${item.category}`
  );

  const categoryItems = await categoryRes.json();

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
      categoryItems,
      item,
      ...(await serverSideTranslations(locale, ["common", "item"])),
    },
  };
}

const Item: React.FC<IItemProps> = ({
  item,
  USD_ETH,
  USDCurrency,
  categoryItems,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!item.id) {
      router.push("/404");
    }
  }, [item]);

  useEffect(() => {
    dispatch(watchItem({ id: item.id }));
  }, []);

  const st = useTranslation("settings").t;
  const { t } = useTranslation("item");

  const [activeMainStep, setActiveMainStep] = useState<number>(0);
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const loadingProgress = useRef<number>(0)
  const loadingRef = useRef<HTMLElement>()

  const handleMainStepChange = (step: number): void => {
    if (step === 0) {
      loadingProgress.current = 1
    }
    setActiveMainStep(step);
  };

  const max500 = useMediaQuery("(max-width:500px)");

  const SplineObj1: React.FC = () => {
    return (
      <>
        {activeMainStep === 0 && <><Spline
         scene={item.spline}
          onLoad={() => {
            console.log("loaded");
            loadingProgress.current++
            setLoaded(true)  
            if (loadingRef.current && loadingProgress.current === 2) {
              loadingRef.current.style.display = 'none'
            } 
          }}
          style={!isLoaded ? {display: 'none'} : max500 ? {maxWidth: '400px', maxHeight: '400px', marginTop: '-35px'} : 
          {maxWidth: '700px', maxHeight: '700px', marginTop: '-35px'}}
          onError={() => {
            console.log("error");
          }}
        />
        <CircularProgress
        size={80}
        sx={{display: "block", margin: "auto", color: "#fff"}}
        ref={loadingRef}
      />
        </>}
  </>
    );
  };

  const ImageObj2: React.FC = () => {
    return <img src={item.img2} className={s.item__frameImage} />;
  };

  const ImageObj3: React.FC = () => {
    return (
      <>
        {!max500 ? (
          <img
            src={item.img4}
            style={{ minWidth: "600px", maxWidth: "1600px" }}
          />
        ) : (
          <img
            src={item.img4Mobile}
            style={{ maxWidth: "330px", width: "100%" }}
          />
        )}
      </>
    );
  };

  const ImageObj4: React.FC = () => {
    return (
      <>
        {!max500 ? (
          <img
            src={item.img3}
            style={{ minWidth: "600px", maxWidth: "1600px" }}
          />
        ) : (
          <img src={item.img3Mobile} />
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
    <>
      {item.id ? (
        <MainLayout t={st}>
          <main className={s.itemPage}>
            <div className={s.container}>
              <Header
                item={item}
                USD_ETH={USD_ETH}
                USDCurrency={USDCurrency}
                t={t}
              />

              <section
                className={s.item__frames}
                style={{ position: "relative" }}
              >
                <SwipeableViews
                  index={activeMainStep}
                  onChangeIndex={handleMainStepChange}
                  enableMouseEvents
                >
                  {MainItems.map((e, i) =>
                    e.map((e, i) => (
                      <div key={activeMainStep} className={s.item__frame}>
                        {e}
                      </div>
                    ))
                  )}
                </SwipeableViews>
                <div
                  className={s.item__changeBtn1}
                  style={
                    activeMainStep === 0 ? { backgroundColor: "#fff" } : {}
                  }
                  onClick={() => handleMainStepChange(0)}
                />

                <div
                  className={s.item__changeBtn2}
                  style={
                    activeMainStep === 1 ? { backgroundColor: "#fff" } : {}
                  }
                  onClick={() => handleMainStepChange(1)}
                />
                <div
                  className={s.item__changeBtn3}
                  style={
                    activeMainStep === 2 ? { backgroundColor: "#fff" } : {}
                  }
                  onClick={() => handleMainStepChange(2)}
                />
                <div
                  className={s.item__changeBtn4}
                  style={
                    activeMainStep === 3 ? { backgroundColor: "#fff" } : {}
                  }
                  onClick={() => handleMainStepChange(3)}
                />
              </section>

              <Bottom
                id={item.id}
                USD_ETH={USD_ETH}
                USDCurrency={USDCurrency}
                categoryItems={categoryItems}
                t={t}
              />
            </div>
          </main>
        </MainLayout>
      ) : (
        <div style={{ color: "#fff" }}>Not found</div>
      )}
    </>
  );
};

export default Item;
