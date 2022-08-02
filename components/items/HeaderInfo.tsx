import Image from "next/dist/client/image";
import dollarIcon from "../../public/images/dollar.svg";
import ethereumIcon from "../../public/images/ethereum.svg";
import hryvniaIcon from "../../public/images/hryvnia.svg";
import s from "../../styles/item.module.scss";
import { IHeaderInfoProps } from "../../Typescript/interfaces/data";
import { useAppSelector } from "../../Typescript/redux-hooks";

const HeaderInfo: React.FC<IHeaderInfoProps> = ({
  item,
  rarityColor,
  categoryColor,
  dollarOne,
  hryvniaOne,
  t,
}) => {
  const currency = useAppSelector((state) => state.sign.currency);

  return (
    <>
      <div className={s.item__headerLeftInfoEl}>
        {t("rarity")}:{" "}
        <span
          style={{ backgroundImage: rarityColor }}
          className={s.item__headerLeftInfoRarity}
        >
          {item.rarity}
        </span>
      </div>
      <div className={s.item__headerLeftInfoEl}>
        {t("category")}:{" "}
        <span
          style={{ backgroundImage: categoryColor }}
          className={s.item__headerLeftInfoCategory}
        >
          {item.category}
        </span>
      </div>
      <div className={s.item__headerLeftInfoEl}>
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
              <span>{item.price}</span>
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
      <div className={s.item__headerLeftInfoEl}>
        {t("owner")}: <span style={{ color: "#bcd9ff" }}>{item.owner}</span>
      </div>
    </>
  );
};

export default HeaderInfo;
