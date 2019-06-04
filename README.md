[![Build Status](https://travis-ci.org/SamwelOpiyo/Vue.svg?branch=master)](https://travis-ci.org/SamwelOpiyo/Vue)

# CI/CD Setup.

## Generating a Github Token.

A github token is needed in order access and clone the repository containing infrastructure and application configuration/provisionment scripts.

Open https://github.com/settings/tokens and generate a new token. Ensure you check the *REPO* check box so that the token can have permissions to pull from private repositories.

## Environment Variables Setup.

Open https://travis-ci.org/{user/organization}/{repository}/settings for example https://travis-ci.org/SamwelOpiyo/Vue/settings and set the following environment variables:

* DOCKER_HUB_PASSWORD
* DOCKER_HUB_USER
* GITHUB_TOKEN
* GCP_MAIN_SERVICE_ACCOUNT :To get this value you will need the path of admin service account generated to run terraform. Use `base64 {path_to_SA} | paste -sd ''` to obtain it. For example in our case navigate to configurations repository, terraform then run `base64 service_account_keys/main_service_account.json | paste -sd ''`.

## Activating Repository for CI/CD

Open https://travis-ci.org/{user/organization}/{repository} for example https://travis-ci.org/SamwelOpiyo/Vue and click on *Activate repository*.

# Project setup.

## Install Dependencies.

```
npm install
```

## Compile with hot-reload for development.

```
npm run serve
```

### Compile and minify for production.

```
npm run build
```

### Run tests.

```
npm run test
```

### Lint and fix files.

```
npm run lint
```

### Customize configuration.

See [Configuration Reference](https://cli.vuejs.org/config/).
