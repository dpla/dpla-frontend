# DPLA Frontend

This is the repository for the Digital Public Library of America's new frontend.

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=UzZRL0QwZzR1Mlc4V2tuMi9XMS9RUm5hZ0lCL2tDaVhJU0xnRU1KdjcrOD0tLXRmQkRDTnZLekZLM0RWdGMyMCtHNUE9PQ==--24287c43017fc50481ab631e86244f9db3ec9257)](https://www.browserstack.com/automate/public-build/UzZRL0QwZzR1Mlc4V2tuMi9XMS9RUm5hZ0lCL2tDaVhJU0xnRU1KdjcrOD0tLXRmQkRDTnZLekZLM0RWdGMyMCtHNUE9PQ==--24287c43017fc50481ab631e86244f9db3ec9257)

## Getting Started For Development

### Install the Yarn package manager

Supported version: 1.5.1

[Installation instructions](https://yarnpkg.com/en/docs/install)

Use whichever method is best for your environment, but this project expects the
supported version given above; so check the documentation for your preferred
installation method to make sure you can determine the version.

The Yarn installation page referenced above recommends against installing Yarn
from `npm`. For security, the download is supposed to have its cryptographic
signature checked and an assumption is being made that you want `yarn` to be its
own standalone utility, decoupled from this project.

If you have other projects that require different versions of Yarn, this may
not suit your needs. We may recommend a different way of managing Yarn in the
future.

### Check this project out from GitHub

```
$ git clone https://github.com/dpla/dpla-frontend.git
```

### Install Node

We are using the current LTS (long-term-support) "Carbon" version of Node.

The easiest way to manage your Node versions is with
[NVM](https://github.com/creationix/nvm). Follow the instructions on that page
to set it up. Then, do the following in your shell:

```
$ cd /path/to/dpla-frontend  # Checked out above from GitHub
$ nvm install                # Picks up correct Node version from `.nvmrc`
$ nvm use                    # Activates correct Node version
```

### Install dependencies and start the local development server

```
$ yarn dev
```

### Running tests

```
$ npm install -g mocha
$ mocha
```

You may now open http://localhost:3000/ in your browser.

### Run with Docker

```
$ yarn build
$ yarn docker:build
$ yarn docker:run
```

See [the Docker documentation](https://docs.docker.com/) and `docker help` for
more information on using Docker containers. See package.json for more
Docker-related commands.

## Environment Variables

The system makes extensive use of environment variables to decouple the different developing environments. It also uses a environment constants file for front-end runtime access of a subset of these variables. For local development it is best to use a `.env` file to provide these variables to the server. There is a `.env.example` you can work from. A `constants/env.example.js` is also provided; rename this file to `constants/env.js` and include the applicable values. Below is a list of the environment variables in use:

- `API_KEY`: your DPLA API key
- `API_URL`: the DPLA API base URL
- `API_VERSION`: the version of the DPLA API used (eg: `v2`)
- `ELASTIC_URL`: the ElasticSearch server base URL
- `GOOGLE_CLIENT`: Google authentication client
- `GOOGLE_CONTACT_SHEET_ID`: the Google spreadsheet ID where **contact form** responses are stored in
- `GOOGLE_FEEDBACK_SHEET_ID`: the Google spreadsheet ID where **feedback form** responses are stored in
- `GOOGLE_SECRET`: Google authentication secret
- `GOOGLE_TOKEN`: Google authentication token
- `LOCAL_ID`: ID of the Local partner (also exposed in `constants/env.js`)
- `MAILCHIMP_KEY`: the MailChimp list service API key
- `MUST_FORK`: if "true", forces the server to fork and use multiple CPUs in
  development mode. This is only relevant when NODE_ENV is not equal to
  "production", e.g. when running `yarn dev`. The server always forks when
  `NODE_ENV=production`.
- `NODE_ENV`: the node environment, `development` or `production`
- `OMEKA_URL`: the Omeka server base URL
- `PRO_BASE_URL`: base URL for user site to allow for links from user to pro site (also exposed in `constants/env.js`)
- `PSS_BASE_URL`: the primary source sets application API base URL (also exposed in `constants/env.js`)
- `SITE_ENV`: the environment's type, `user`, `pro`, or `local` (also exposed in `constants/env.js`)
- `WORDPRESS_URL`: the headless WordPress API base URL (also exposed in `constants/env.js`)
- `SQS_URL`: base URL to the AWS SQS service
- ~~`THUMB_SERVER`: the image thumbnail server URL~~ (removed because now app access `ELASTIC_URL` directly)
- `USER_BASE_URL`: base URL for user site to allow for links from pro to user site (also exposed in `constants/env.js`)

## CSS

### CSS Compilation

We're using the [next.js](https://github.com/zeit/next.js/) library for
server-side rendering of the JavaScript. Next.js in turn uses
[styled-jsx](https://github.com/zeit/styled-jsx) to compile and inject CSS files.

### CSS Vendor libraries

We're using a local copy of [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid)
to manage a 12-column grid. Review <http://flexboxgrid.com/> for documentation.

## Project Management

[Desktop Design Prototype](https://invis.io/3FC6KEGQV)  
[Mobile Design Prototype](https://invis.io/VGD6W7ZDQ)  
[Project Task Board](https://github.com/dpla/dpla-frontend/projects/1)

## Yarn / NPM Scripts

The project includes a number of scripts used for development, testing, and deployment. See package.json for details if you are a developer. They include:

- `yarn run clean` - Removes local Node modules, `.next` build targets, etc.
- `yarn run dev` - Builds the project and starts the server in development mode
- `yarn run build` - Builds the project for production
- `yarn run start` - Builds the project and starts the server in production mode

## Authors

| DPLA                |
| ------------------- |
| Audrey Altman       |
| Gretchen Gueguen    |
| Mark Breedlove      |
| Mauricio Giraldo    |
| Michael Della Bitta |
| Scott Williams      |

| Team Postlight |
| -------------- |
| Grace Pelling  |
| Neil Renicker  |
| Frankie Simms  |
| Gina Trapani   |

[<img src="browserstack-logo-600x315.png" height="100" alt="" />](http://browserstack.com/)

We use BrowserStack to test this code in as many different devices and platforms as we can.
