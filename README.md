> **Note for DPLA Local:** For DPLA Local instance configuration, refer to [LOCAL.md](LOCAL.md).

# DPLA Frontend

This is the repository for the Digital Public Library of America's new frontend.

## Getting Started For Development

### Install the Yarn package manager

[Installation instructions](https://yarnpkg.com/en/docs/install)

### Check this project out from GitHub

```
$ git clone https://github.com/dpla/dpla-frontend.git
```

### Install Node

We are using the "Jod" version of Node.

The easiest way to manage your Node versions is with
[Mise](https://mise.jdx.dev/). Follow the instructions on that page
to set it up. Then, do the following in your shell:

```
$ cd /path/to/dpla-frontend                                   # Checked out above from GitHub
$ mise settings add idiomatic_version_file_enable_tools node  # Enables loading from .node-version
$ mise use                                                    # Picks up correct Node version from `.node-version`
```

### Install Yarn

The recommended way to install Yarn:

`npm install --global yarn`

### Set up environmental variables

Copy the `.env.example` file to `.env` and replace the example values with correct ones for your environment.

### Install dependencies and start the local development server

```
$ yarn && yarn run dev
```

You may now open http://localhost:3000/ in your browser.

### Run with Docker

Note that the environmental variables are not automatically passed to the Docker container. You can pass them in with the `--env-file` option, or set them in the Dockerfile. The Docker container needs to have the proper variables set at build time and at execution time.

```
$ docker build -t dpla-frontend .
```

See [the Docker documentation](https://docs.docker.com/) and `docker help` for
more information on using Docker containers. See package.json for more
Docker-related commands.

## More on Environmental Variables

The system makes extensive use of environment variables to decouple the different developing environments. It also uses a environment constants file for front-end runtime access of a subset of these variables. For local development it is best to use a `.env` file to provide these variables to the server. There is a `.env.example` you can work from. A `constants/env.example.js` is also provided; rename this file to `constants/env.js` and include the applicable values. Below is a list of the environment variables in use:

- `API_KEY`: your DPLA API key
- `API_URL`: the DPLA API base URL

- `MUST_FORK`: if "true", forces the server to fork and use multiple CPUs in
  development mode. This is only relevant when NODE_ENV is not equal to
  "production", e.g. when running `yarn dev`. The server always forks when
  `NODE_ENV=production`.

- `NODE_ENV`: the node environment, `development` or `production`
- `NEXT_PUBLIC_SITE_ENV`: the environment's type, `user`, `pro`, or `local`.
- `NEXT_PUBLIC_LOCAL_ID`: ID of the Local partner if this is a Local instance
- `NEXT_PUBLIC_WORDPRESS_URL`: URL of the wordpress instance for site content.
- `NEXT_PUBLIC_PRO_BASE_URL`: The base URL for the Pro site for links. Usually https://pro.dp.la.
- `NEXT_PUBLIC_USER_BASE_URL`: The base URL for the user site for links. Usually https://dp.la.
- `NEXT_PUBLIC_GA_TRACKING_ID`: The Google Analytics tracking ID for the site.

## Yarn / NPM Scripts

The project includes a number of scripts used for development, testing, and deployment. See package.json for details if you are a developer. They include:

- `yarn run clean` - Removes local Node modules, `.next` build targets, etc.
- `yarn run dev` - Builds the project and starts the server in development mode
- `yarn run build` - Builds the project for production
- `yarn run start` - Builds the project and starts the server in production mode
