import { NoSsr } from "@mui/base";
import { useMediaQuery } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import Bottom from "../../components/items/Bottom";
import Header from "../../components/items/Header";
import MainLayout from "../../components/layouts/MainLayout";
import s from "../../styles/item.module.css";
import { IItemGetServerSideProps } from "../../Typescript/interfaces/data";
import { IItemProps } from "./../../Typescript/interfaces/data";

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
  const st = useTranslation("settings").t;
  const { t } = useTranslation("item");

  const [activeMainStep, setActiveMainStep] = useState<number>(0);

  const handleMainStepChange = (step: number): void => {
    setActiveMainStep(step);
  };

  const max500 = useMediaQuery("(max-width:500px)");

  const SplineObj1: React.FC = () => {
    return (
      <NoSsr>
        <iframe
          src={item.spline}
          className={s.item__frameSpline}
          frameBorder="0"
          width="600px"
          height={!max500 ? "800px" : "600px"}
          onLoad={() => {
            console.log("loaded");
          }}
          onError={() => {
            console.log("error");
          }}
        />
      </NoSsr>
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
    <MainLayout t={st}>
      <main className={s.itemPage}>
        <div className={s.container}>
          <Header
            item={item}
            USD_ETH={USD_ETH}
            USDCurrency={USDCurrency}
            t={t}
          />

          <section className={s.item__frames} style={{position: 'relative'}}>
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
  );
};

export default Item;
