import en from '@/locale/en.json'
import zhHans from '@/locale/zh-Hans.json'

import { createI18n } from 'vue-i18n'

type MessageSchema = typeof en

const messages = {
  en,
  'zh-Hans': zhHans // 简体中文
}

export type LocaleType = keyof typeof messages

const getLocale = () => {
  let locale = uni.getStorageSync('locale')
  const appLocale = uni.getLocale()
  const { language: systemLocale } = uni.getSystemInfoSync() || {}
  console.log('locale1', locale)
  if (!locale) {
    if (systemLocale && systemLocale !== appLocale) {
      locale = Object.keys(messages).find((key) => {
        const [lan1] = systemLocale?.split('_')
        const [lan2] = key?.split('-')
        return lan1 === lan2
      })
    }
  }
  console.log('locale2', locale)

  if (!locale) {
    locale = appLocale
  }

  console.log('systemLocale', systemLocale, 'appLocale', appLocale, 'locale', locale)

  return locale
}

export const initI18n = () => {
  const locale = getLocale()

  return createI18n<[MessageSchema], 'en' | 'zh-Hans'>({
    locale, // 获取已设置的语言
    messages,
    legacy: false
    // globalInjection: true
  })
}
