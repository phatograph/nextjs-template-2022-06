// https://nextjs.org/docs/advanced-features/customizing-postcss-config

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      process.env.NODE_ENV === 'development'
        ? {}
        : {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
            },
          },
    ],
  ],
}
