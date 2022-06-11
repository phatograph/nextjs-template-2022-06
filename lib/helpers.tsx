import get from 'lodash/get'
import entries from 'lodash/entries'
import nth from 'lodash/nth'
import * as __axios from 'axios'
import {ResponseType} from 'axios'
import Cookies from 'js-cookie'
import {GetServerSidePropsContext} from 'next'

import ja from '@locales/ja.yml'
import en from '@locales/en.yml'

const locales = {
  ja,
  en,
}

export const _t = (currentLocale: string) => {
  return (key: string, args = {}) => {
    try {
      const _key = `${currentLocale}.${key}`

      let text = get(locales, _key, _key)
      const argsEntries = entries(args)

      if (argsEntries.length) {
        text = argsEntries.reduce((result, current) => {
          const pattern = new RegExp(`%{${nth(current, 0)}}`, 'g')

          return result.replace(pattern, nth(current, 1)?.toString?.() || '')
        }, text)
      }

      return text
    } catch (e) {
      console.log(e)
    }
  }
}

export const COOKIE_SESSION_SHOP = 'session-shop'

export const AXIOS_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const axiosConfig = {
  baseURL: AXIOS_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json' as ResponseType,
}

// Some of the headers need to be fresh values
// by the time of the call. So we'll just
// slap in said headers for every Axios call.
const getAxiosFreshConfig = () => {
  return {
    'x-href': typeof window != 'undefined' ? window.location.href : null,
  }
}

const _axios = __axios.default.create(axiosConfig)

const axiosGenerator = (options: {cookieKey?: string} = {}) => {
  const {cookieKey} = options

  return {
    // The 3rd `token` param here is explicitly provided
    // from `getServerSideProps`.
    get: async (url: string, data?: any, token?: string, csv?: boolean) => {
      return await _axios.get(url, {
        params: data,
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Token ${
                  token ? token : Cookies.get(cookieKey)
                }`,
              }
            : {}),
          ...(csv
            ? {
                Accept: 'text/csv',
                'Content-Type': 'text/csv',
              }
            : {}),
        },
      })
    },

    post: async (url: string, data?: any) => {
      return await _axios.post(url, data, {
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Token ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },

    patch: async (url: string, data?: any) => {
      return await _axios.patch(url, data, {
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Token ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },

    put: async (url: string, data?: any) => {
      return await _axios.put(url, data, {
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Token ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },

    delete: async (url: string, data?: any) => {
      return await _axios.delete(url, {
        data,
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Token ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },
  }
}

export const axiosAnonymous = axiosGenerator()

export const axiosShop = axiosGenerator({
  cookieKey: COOKIE_SESSION_SHOP,
})

export const getCookies = (context: GetServerSidePropsContext) => {
  const rawCookie = context?.req?.headers?.cookie

  const cookies: {
    [COOKIE_SESSION_SHOP]?: string
  } = rawCookie?.split(';')?.reduce((accumulator, currentValue) => {
    const parts = currentValue.split('=')

    return {
      ...accumulator,
      [parts.shift().trim()]: decodeURI(parts.join('=')),
    }
  }, {})

  return cookies
}
