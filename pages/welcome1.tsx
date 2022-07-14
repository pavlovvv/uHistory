import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../Typescript/redux-hooks"
import s from '../styles/welcome.module.css'
import { useRouter } from "next/dist/client/router"
import InitialLayout from "../components/layouts/InitialLayout"
import { ILocale } from "../Typescript/interfaces/data"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { logOut } from "../redux/signSlice"


export async function getStaticProps({ locale }: ILocale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "initial"])),
      },
    };
  }

const Welcome1: React.FC = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const {t} = useTranslation('initial')

    const isAuthed = useAppSelector(state => state.sign.isAuthed)
    const isRegConfirmed = useAppSelector(state => state.sign.isRegConfirmed)
    const isAuthFulfilled = useAppSelector(state => state.sign.isAuthFulfilled)

    useEffect(() => {
        if (!isRegConfirmed) {
            if (!isAuthed && isAuthFulfilled) {
                router.push('/')
            }
        }
    }, [isAuthFulfilled, isAuthed, isRegConfirmed])

    return (
        <InitialLayout t={t}>
        <main className={s.welcome}>
        <div className={s.welcome__title}>
            Successfully registered
        </div>
        <button onClick={() => {
            dispatch(logOut())
        }} className={s.welcome__btn}>
            Log out
        </button>
        </main>
        </InitialLayout>
    )
}

export default Welcome1
