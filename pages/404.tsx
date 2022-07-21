import Link from "next/dist/client/link";
import s from "../styles/error.module.css";
import { ILocale } from "../Typescript/interfaces/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }: ILocale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "error",
      ])),
    },
  };
}

const ErrorComponent: React.FC = () => {

  const { t } = useTranslation('error')

  return (
    <div className={s.errorPage}>
      <div className={s.errorPage__text}>
        {t('unavailable')}
        <div className={s.errorPage__button}>
          <Link href="/" passHref>
            {t('return')}         
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
