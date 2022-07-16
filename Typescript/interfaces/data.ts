export interface IIdGetServerSideProps {
    params: {
      id: number
    }
  }

export interface IIdProps {
    id: number
}

export interface IGoogleUserData {
  email: string
  given_name: string
  family_name?: string
  picture: string
}

export interface ILocale {
  locale: string
}

import { ReactNode } from "../types/data";

export interface IInitialLayoutProps{
  children: ReactNode
  t: (arg: string) => string
}

export interface IInputPasswordValues {
  password: string
  showPassword: boolean
  email: string
  name?: string
}

export interface ISignUpSubmit {
  password: string
  email: string
  name: string
}

export interface ILoginSubmit {
  password: string
  email: string
}

export interface IMainProps {
  USD_ETH: number,
  USDCurrency: number
}

export interface IMainLayoutProps {
  t: (translation: string) => string
}