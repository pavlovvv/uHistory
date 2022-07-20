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
  USDCurrency: number,
  items: object[]
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

export interface IItem {
  id: number
  name: string
  rarity: string
  category: string
  price: number
  avatar: string
  opensea: string
  QR1: string
  QR2?: string
  QR1img: string
  QR2img?: string 
  spline: string
  img2: string
  img3: string
  img4: string
  img4Mobile: string
  img3Mobile: string
  description: string[]
  owner: string
}

export interface IItemProps {
  item: IItem
  USDCurrency: number
  USD_ETH: number
  categoryItems: object[]
}

export interface IItemHeaderProps {
  item: IItem
  USDCurrency: number
  USD_ETH: number
  t: (translate: string) => string
}

export interface IHeaderInfoProps {
  item: IItem, 
  rarityColor: string 
  categoryColor: string 
  dollarOne: number
  hryvniaOne: number
  t: (translate: string) => string
}

export interface IHeaderDescriptionProps {
  description: string[]
  t: (translate: string) => string
}

export interface IHeaderRightElProps {
  QR: string
  QRimg: string
}

export interface IItemGetServerSideProps {
  params: {
    item: number
  }
  locale: string
}

export interface IItemBottomProps {
  USDCurrency: number
  USD_ETH: number
  categoryItems: object[]
  id: number
  t: (translate: string) => string
}

export interface IARContractProps {
  USDCurrency: number
  USD_ETH: number
}

export interface ILikedProps {
  items: object[]
  USDCurrency: number
  USD_ETH: number
}