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

export interface IInputProfileValues {
  email: string
  name: string
  telegram: string | null
  instagram: string | null
}

export interface IProfileSubmit {
  name: string
  email: string
  telegram: string
  instagram: string
}

export interface IItemProps {
  item:{
    id: number
    name: string
    rarity: string
    category: string
    price: number
    avatar: string
    opensea: string
    qr1: string
    qr2: string
    qr1img: string
    qr2img: string    
  }
}