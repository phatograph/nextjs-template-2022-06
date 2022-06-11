import React from 'react'
// import className from 'classnames'
import Head from 'next/head'
import {useRouter} from 'next/router'
import smoothscroll from 'smoothscroll-polyfill'
// import Link from 'next/link'
// import App, {AppProps, AppContext} from 'next/app'
import {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import NextNprogress from 'nextjs-progressbar'
import Script from 'next/script'

// import {_t} from '@lib/helpers'

import Redux from '@components/Redux'

import '../css/app.scss'

// const GA_TRACKING_ID =
//   process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
//     ? 'UA-215765813-1'
//     : 'UA-215765813-2'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MyApp = (appProps: AppProps) => {
  const {Component, pageProps} = appProps

  React.useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  const title = 'SEA'
  const description = 'SEA'

  const router = useRouter()

  // const handleRouteChange = (url: string) => {
  //   window?.gtag?.('config', GA_TRACKING_ID, {
  //     page_path: url,
  //   })
  // }

  // React.useEffect(() => {
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <QueryClientProvider client={queryClient}>
      <Redux>
        <Head>
          <title>{title}</title>

          <meta name='description' content={description} />

          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1'
            // content='width=1300, viewport-fit=cover'
          />

          <meta name='og:title' property='og:title' content={title} />
          <meta
            name='og:description'
            property='og:description'
            content={description}
          />

          {false && (
            <React.Fragment>
              <meta
                name='og:image'
                property='og:image'
                content='/images/og.png'
              />

              <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/apple-touch-icon.png'
              />
              <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/favicon-32x32.png'
              />
              <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/favicon-16x16.png'
              />
              <link rel='manifest' href='/site.webmanifest' />
              <link
                rel='mask-icon'
                href='/safari-pinned-tab.svg'
                color='#ffffff'
              />
              <meta name='msapplication-TileColor' content='#da532c' />
              <meta name='theme-color' content='#ffffff' />
            </React.Fragment>
          )}
        </Head>

        <Script src='https://js.stripe.com/v3/' strategy='beforeInteractive' />

        {/* https://nextjs.org/docs/messages/next-script-for-ga */}
        {/* https://stackoverflow.com/a/62552263 */}
        {false && (
          <React.Fragment>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=`} />

            <Script
              id='google-analytics'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '');
                `,
              }}
            />
          </React.Fragment>
        )}

        <div className='Root'>
          <Component
            {...{
              ...pageProps,
            }}
          />
        </div>
      </Redux>

      <NextNprogress
        color='#5458e4'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
        options={{
          showSpinner: false,
        }}
      />

      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext)
//
//   return {...appProps}
// }

export default MyApp
