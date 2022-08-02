import s from "../../styles/item.module.scss";
import { IHeaderDescriptionProps } from "../../Typescript/interfaces/data";

const HeaderDescription: React.FC<IHeaderDescriptionProps> = ({
  description,
  t,
}) => {
  return (
    <>
      <h2 className={s.item__leftDescriptionTitle}>{t("description")} :</h2>
      <ul className={s.item__leftDescriptionUl}>
        {description.map((e: string, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </>
  );
};

export default HeaderDescription;
