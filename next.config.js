module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'js-yaml-loader',
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ['@svgr/webpack'],
    })

    // https://github.com/webpack/webpack/issues/196#issuecomment-889603503
    config.module.exprContextCritical = false

    return config
  },
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    localeDetection: false,
  },
  swcMinify: true, // https://nextjs.org/docs/upgrading#swc-replacing-terser-for-minification
}
