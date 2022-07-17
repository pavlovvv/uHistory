import { ILocale } from "../../Typescript/interfaces/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import MainLayout from "../../components/layouts/MainLayout";
import { IItemProps } from './../../Typescript/interfaces/data';
import s from '../../styles/item.module.css'
import Image from "next/dist/client/image";


export async function getServerSideProps({ locale }: ILocale) {

    const item = {
        id: 1,
        name: 'Mykhailo Hrushevsky',
        rarity: 'Legendary',
        category: 'Identities',
        price: 0.03,
        avatar: 'https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-16T21-10-17.362ZMykhailo%20Hrushevsky_350x350.png?imwidth=64',
        opensea: 'https://opensea.io/uHistory',
        qr1: 'https://security.uhistory.org/MykhailoGrushevski',
        qr2: 'https://security.uhistory.org/MykhailoGrushevskiCanvas',
        qr1img: 'https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-17T20-29-45.503ZMykhailoGrushevskiQr1.png?imwidth=64',
        qr2img: 'https://cat-talk-s3.s3.eu-central-1.amazonaws.com/2022-07-17T20-30-01.989ZMykhailoGrushevskiCanvasQr2.png?imwidth=64'          
    }

    return {
      props: {
        item,
        ...(await serverSideTranslations(locale, ["common", "settings"])),
      },
    };
  }



const Item: React.FC<IItemProps> = ({item}) => {

    const st = useTranslation('settings').t

    return (
        <MainLayout t={st}>
        <main className={s.itemPage}>
            <div className={s.container}>
        <section className={s.item__header}>
            <div className={s.item__headerLeft}>
                <div>
                    <Image src={item.avatar} width='300px' height='300px' alt={`uHistory ${item.category} ${item.name}`} />
                </div>  

                <div className={s.item__headerLeftInfo}>
                    <h1 className={s.item__headerLeftInfoName}>{item.name}</h1>
                    <div className={s.item__headerLeftInfoEl}>Rarity: <span>{item.rarity}</span></div>
                    <div className={s.item__headerLeftInfoEl}>Category: <span>{item.category}</span></div>
                    <div className={s.item__headerLeftInfoEl}>Price: <span>{item.price}</span></div>
                </div>

                <div>
                a
                </div>
            </div>

            <div className={s.item__headerRight}>
a
            </div>
        </section>
        </div>
        </main>
        </MainLayout>
    )
}

export default Item