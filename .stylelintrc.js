module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss', // https://stylelint.io/user-guide/get-started/#linting-everything-else
    'stylelint-config-prettier-scss',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    indentation: 2,
    'no-descending-specificity': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['overflow-scrolling'],
      },
    ],
    'selector-class-pattern': '^[A-Z][a-zA-Z0-9]+$', // https://stylelint.io/user-guide/rules/regex/#enforce-a-case
    'selector-nested-pattern':
      '(^&([-_:][-_:][a-z-_0-9, \n&:]+)$)|(^> .+$)|(^&:.*$)|(^.[a-zA-Z]*$)|(^\\+ .*$)|(^&\\[.*$)|(^& \\+.*$)',
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'scss/percent-placeholder-pattern': null,
    'declaration-block-no-duplicate-properties': true,
    'string-quotes': 'single',
  },
}
