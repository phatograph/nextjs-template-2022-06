import React from 'react'
// import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'
// import {isNil} from 'lodash'
// import Cookies from 'js-cookie'
// import dayjs from 'dayjs'

import {_t} from '@lib/helpers'

export const useLocale = () => {
  const router = useRouter()
  const t = _t(router.locale)

  return [t]
}

export const useAutoFocus = () => {
  const ___$el = React.useRef()

  React.useEffect(() => {
    window.setTimeout(() => {
      const _$el = ___$el?.current as HTMLInputElement

      _$el?.focus?.()
    }, 200)
  }, [])

  return [___$el]
}
