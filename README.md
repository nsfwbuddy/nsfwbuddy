# NSFW Buddy

NSFW Buddy is a url shortner and a redirect service to let other people know you are sharing sensitive content with them. You can learn more at https://www.nsfwbuddy.com

## How to install

Clone the repository and install the dependencies:

```bash
git clone https://github.com/nsfwbuddy/nsfwbuddy.git
cd nsfwbuddy
yarn install
```

## How to setup package's environments

Each package has one or more `.env.*` file that can be customized. **Do not overwrite the provided environment files**, but rather use a copy with an added `.local` extension. For example, to setup an environment file for `development`, copy `.env.development` and rename it to `.env.development.local`. Local env files are ignored by git so they will not be pushed into the repo by error. Always make a copy of your `.local` configurations in case you need to reinstall the project.

## Scripts

Here's a list of scripts that can be run with `yarn`:

* `yarn test`, test all packages
* `yarn api:start`, run the api server
* `yarn api:test`, test the api server
* `yarn api:db`, run knex's db commands
* `yarn webapp:start`, run the web app client
* `yarn webapp:test`, test the web app client
* `yarn webapp:build`, build the web app client
* `yarn webapp:create:component`, create a web app component,
* `yarn webapp:create:container`, create a web app container,
* `yarn webapp:create:action`, create a web app action,
* `yarn bot:start`, start the telegram bot client
* `yarn bot:test`, test the telegram bot client

### Test scripts

By default, a package's test is run by watching for changes in order to let you work on your code while testing for errors or when you are actually writing tests and want to test your results live.

To disable this behavior set a `CI` environment variable (for example: `export CI=1`). This is especially useful when tests are run by a Continous Integration engines, in fact this how this project is tested by [travis](https://travis-ci.org/).
