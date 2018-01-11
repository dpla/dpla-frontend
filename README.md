# DPLA Frontend
This is the repository for the Digital Public Library of America's new frontend.

## Getting Started For Development

- Install [Node v7.8.0](https://nodejs.org/en/)
- Install [Yarn](https://yarnpkg.com/en/docs/install)

```
git clone https://github.com/postlight/dpla-frontend/
cd dpla-frontend

# install dependencies
yarn install

# start the local development server
yarn run dev
open http://localhost:3000/
```

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
[Project Task Board](https://github.com/postlight/dpla-frontend/projects/1)

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

| Team        |
| ------------- |
| Grace Pelling |
| Neil Renicker |
| Frankie Simms |
| Gina Trapani  |
