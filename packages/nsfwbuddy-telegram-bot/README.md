# NSFW Buddy Bot

[NSFW Buddy](https://www.nsfwbuddy.com) bot for [Telegram](https://telegram.org).

## Install

Clone the repository:

```bash
git clone https://github.com/nsfwbuddy/nsfwbuddy-bot.git && cd nsfwbuddy-bot && yarn install
```

Configure the environment variables by copying and renaming to `.local` an environment template. For example, to configure the production environment:

```bash
cp .env.production .env.production.local
vi .env.production.local
```

`.local` environments have priority over the templates and are ignored by git so they can be safely modified without risking to committing sensitive informations.

## Run

Specify the environment to use:

```bash
export NODE_ENV=production
```
and start the server:

```bash
yarn start
```