This is a Next.js web application that uses
[React Query](https://react-query.tanstack.com) and
[Redux Toolkit](https://redux-toolkit.js.org).

## Requirements

- Node.js, see its version at `.nvmrc`.
- Yarn, v1.22.10 at the time of development.
- [Foreman](https://github.com/ddollar/foreman) for consuming `.env`.
  I [couldn't get AWS Amplify to work](https://ap-northeast-1.console.aws.amazon.com/amplify/home?region=ap-northeast-1#/d2ku0fltwetht3/main/60)
  with [dotenv](https://www.npmjs.com/package/dotenv) somehow.
  So we'll make do with Foreman for the time being.

## Installation

```bash
gem install foreman
yarn
cp .env.example .env
```

## Environment variables

You can get `.env` information from developers.

If any changes is made to `.env`, please also update the `.env.example` and properly redact secret values. Then update the environment variables in the servers here https://ap-northeast-1.console.aws.amazon.com/amplify/home?region=ap-northeast-1#/d2ku0fltwetht3/settings/variables.

## Development

### Running the project locally.

```bash
foreman start
```

### Formatting and linting

It's a good practice to keep the code formatted properly. So please always run the formatter.

```bash
yarn format
```

And it's also a good practice to lint the code before making any PR.

```bash
yarn lint
```

## Cypress

To use Cypress, first you'll have to setup its configuration.

```bash
cp cypress.env.json.sample cypress.env.json
```

Fill in the login credentials for all the accounts. Then you're ready to go.

```bash
# Open test suite for development
foreman run yarn run cypress open

# Test as a CLI
foreman run yarn run cypress run
```

## Deployment

To deploy to STG, simply push/merge the changes to `main` branch.

To deploy to PROD, simply push/merge the changes to `master` branch.

After push/merge the changes, the build process can be checked at Then check the build process at https://ap-northeast-1.console.aws.amazon.com/amplify/home?region=ap-northeast-1#/d2ku0fltwetht3.
