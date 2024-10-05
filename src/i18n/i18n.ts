import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import ACCOUNT_EN from 'src/locales/en/account.json'
import HEADER_EN from 'src/locales/en/header.json'
import CART_EN from 'src/locales/en/cart.json'
import PROFILE_EN from 'src/locales/en/profile.json'
import FOOTER_EN from 'src/locales/en/footer.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import ACCOUNT_VI from 'src/locales/vi/account.json'
import HEADER_VI from 'src/locales/vi/header.json'
import CART_VI from 'src/locales/vi/cart.json'
import PROFILE_VI from 'src/locales/vi/profile.json'
import FOOTER_VI from 'src/locales/vi/footer.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    account: ACCOUNT_EN,
    header: HEADER_EN,
    cart: CART_EN,
    profile: PROFILE_EN,
    footer: FOOTER_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    account: ACCOUNT_VI,
    header: HEADER_VI,
    cart: CART_VI,
    profile: PROFILE_VI,
    footer: FOOTER_VI
  }
} as const

export const defaultNS = 'product'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'product', 'account', 'header', 'cart', 'profile', 'footer'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
