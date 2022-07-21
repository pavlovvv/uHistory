import { useMediaQuery } from "@mui/material";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import setBackground from "../../other/setBackground";
import dollarIcon from "../../public/images/dollar.svg";
import ethereumIcon from "../../public/images/ethereum.svg";
import hryvniaIcon from "../../public/images/hryvnia.svg";
import s from "../../styles/item.module.css";
import s2 from "../../styles/main.module.css";
import { IItem, IItemBottomProps } from "../../Typescript/interfaces/data";
import { useAppSelector } from "../../Typescript/redux-hooks";

const Bottom: React.FC<IItemBottomProps> = ({
  id,
  USD_ETH,
  USDCurrency,
  categoryItems,
  t,
}) => {
  const [activeCategoryStep, setActiveCategoryStep] = useState<number>(0);

  const requiredCategoryItems = categoryItems.filter((e: IItem) => {
    return e.id !== id;
  });

  const [shuffledRequiredCategoryItems, setShuffledRequiredCategoryItems] =
    useState<object[]>();

  useEffect(() => {
    setShuffledRequiredCategoryItems(
      requiredCategoryItems.sort(() => Math.random() - 0.5)
    );
  }, []);

  const subCategoryArray = [];
  let size = 6;

  const max1880 = useMediaQuery("(max-width:1880px)");
  if (max1880) size = 5;

  const max1570 = useMediaQuery("(max-width:1570px)");
  if (max1570) size = 4;

  const max1300 = useMediaQuery("(max-width:1300px)");
  if (max1300) size = 3;

  const max1100 = useMediaQuery("(max-width:1100px)");
  if (max1100) size = 4;

  const max1000 = useMediaQuery("(max-width:1000px)");
  if (max1000) size = 3;

  const max850 = useMediaQuery("(max-width:850px)");
  if (max850) size = 2;

  const max359 = useMediaQuery("(max-width:359px)");
  if (max359) size = 1;

  for (
    let i = 0;
    i < Math.ceil(shuffledRequiredCategoryItems?.length / size);
    i++
  ) {
    subCategoryArray[i] = shuffledRequiredCategoryItems?.slice(
      i * size,
      i * size + size
    );
  }

  const maxSteps = subCategoryArray.length;

  const handleCategoryNext = (): void => {
    setActiveCategoryStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleCategoryBack = (): void => {
    setActiveCategoryStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCategoryStepChange = (step: number): void => {
    setActiveCategoryStep(step);
  };

  const currency = useAppSelector((state) => state.sign.currency);

  return (
    <section className={s.item__also} style={{ position: "relative" }}>
      <h3 className={s.item__alsoTitle}>{t("like")}: </h3>
      {subCategoryArray[1] && (
        <button
          className={s.item__alsoButtonLeft}
          onClick={handleCategoryBack}
          disabled={activeCategoryStep === 0}
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "45px" }} />
        </button>
      )}
      <SwipeableViews
        index={activeCategoryStep}
        onChangeIndex={handleCategoryStepChange}
        enableMouseEvents
      >
        {subCategoryArray.map((e: any, i: number) => {
          return (
            <div
              className={s2.categoryItemsContainer}
              key={i}
              style={
                !max1000
                  ? { justifyContent: "flex-start", columnGap: "35px" }
                  : { justifyContent: "space-around", columnGap: "5px" }
              }
            >
              {e.map((e: any, i: number) => {
                const bgColor: string = setBackground(e.rarity);

                const dollarOne = Math.round(e.price * USD_ETH);
                const hryvniaOne = Math.round(e.price * USD_ETH * USDCurrency);

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
                          <i
                            className="bi bi-heart"
                            style={{
                              fontSize: "20px",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          />
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
          );
        })}
      </SwipeableViews>
      {subCategoryArray[1] && (
        <button
          className={s.item__alsoButtonRight}
          onClick={handleCategoryNext}
          disabled={activeCategoryStep === maxSteps - 1}
        >
          <i className="bi bi-arrow-right" style={{ fontSize: "45px" }} />
        </button>
      )}
    </section>
  );
};

export default Bottom;
