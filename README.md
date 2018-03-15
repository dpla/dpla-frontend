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

You may now open http://localhost:3000/ in your browser.

### Run with Docker

```
$ yarn build
$ yarn docker:build
$ yarn docker:run
```

See [the Docker documentation](https://docs.docker.com/) and `docker help` for
more information on using Docker containers.


## Environment Variables

The system makes extensive use of environment variables to decouple the different developing environments. It also uses a environment constants file for front-end runtime access of a subset of these variables. For local development it is best to use a `.env` file to provide these variables to the server. There is a `.env.example` you can work from. A `constants/env.example.js` is also provided; rename this file to `constants/env.js` and include the applicable values. Below is a list of the environment variables in use:

- `API_KEY`: your DPLA API key
- `API_URL`: the DPLA API base URL
- `OMEKA_URL`: the Omeka server base URL
- `THUMB_SERVER`: the image thumbnail server URL 
- `PSS_BASE_URL`: the primary source sets application API base URL
- `USER_BASE_URL`: base URL for user site to allow for links from pro to user site (also exposed in `constants/env.js`)
- `PRO_BASE_URL`: base URL for user site to allow for links from user to pro site (also exposed in `constants/env.js`)
- `SITE_ENV`: the environment's type, `user` or `pro` (also exposed in `constants/env.js`)
- `NODE_ENV`: the node environment, `development` or `production`
- `GOOGLE_CONTACT_SHEET_ID`: the Google spreadsheet ID where **contact form** responses are stored in
- `GOOGLE_FEEDBACK_SHEET_ID`: the Google spreadsheet ID where **feedback form** responses are stored in
- `GOOGLE_CLIENT`: Google authentication client
- `GOOGLE_SECRET`: Google authentication secret
- `GOOGLE_TOKEN`: Google authentication token
- `WORDPRESS_URL`: the headless WordPress API base URL (also exposed in `constants/env.js`)
- `MAILCHIMP_KEY`: the MailChimp list service API key

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

## Scripts

The project includes a number of scripts used for development, testing, and deployment.

- `yarn run dev` - begins bundling javascript with webpack and starts the server in development mode
- `yarn run start` - begins bundling javascript with webpack and starts the server in production mode
- `yarn run build` - builds the project for production


### Docker

This project uses a Docker container, which can be run locally or deployed to AWS Elastic Beanstalk.

Once you have [Docker](https://www.docker.com/) installed on your computer, you can run the container locally using this command:

```zsh
# Build and run the container
> yarn deploy
```

To deploy the container to AWS Elastic Beanstalk, you'll need to get set up first.

1. Get AWS credentials and [install the eb-cli tool](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-osx.html) (tl;dr ```brew install awsebcli```).
2. Using the terminal, run ```eb init```.
3. Choose us-east-1, US East (N. Virginia) as the region.
4. Enter your aws-access-id and aws-secret-key.
5. At select an application to use, choose dpla-frontend.
6. Opt out of CodeCommit.

When you've completed the one-time setup, the following command will deploy the Docker container to AWS.

```zsh
> eb deploy dpla
```

A few other useful commands:

```zsh
# List environments
> eb list

# Open the app in your browser
> eb open dpla
```

| Authors, DPLA |
| ------------- |
| Audrey Altman |
| Gretchen Gueguen |
| Mark Breedlove |
| Mauricio Giraldo |
| Michael Della Bitta |
| Scott Williams |

| Team Postlight |
| ------------- |
| Grace Pelling |
| Neil Renicker |
| Frankie Simms |
| Gina Trapani  |

[<img src="browserstack-logo-600x315.png" height="100" alt="" />](http://browserstack.com/)

We use BrowserStack to test this code in as many different devices and platforms as we can.
