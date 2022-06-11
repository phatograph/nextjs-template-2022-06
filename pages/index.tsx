import React from 'react'
// import className from 'classnames'
// import Link from 'next/link'
// import {useRouter} from 'next/router'
// import Cookies from 'js-cookie'
// import {useMutation} from 'react-query'

import {useLocale} from '@lib/hooks'

const Index = () => {
  const [t] = useLocale()

  return <div className='Index'>{t('title')}</div>
}

export default Index
