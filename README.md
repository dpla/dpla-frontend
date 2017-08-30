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

## Pull requests

We like clean commit histories:

- Pull requests should be on an appropriately named branch eg. `feat-add-users`, `fix-encoding`
- Pull requests should be squashed down to 1 commit and rebased with master, preferably before asking for a review.
- Once merged, the feature branch should be deleted.

## Commit Style

### Format

```
commit_type: message in present tense
```

### Examples

```
feat: add new end point for Users
fix: disallow users from editing events that do not belong to them
style: remove trailing whitespace
refactor: move all analytics into a service
chore: improve build speed of Docker build
test: integration test for login
docs: commit style examples for readme
```

### Commit Types

- `feat` a feature or enhancement. can be incredibly small.
- `fix` a bug fix to something that was broken.
- `style` change code style, like removing whitespace. no functional code changes.
- `refactor` change code, but not functionality.
- `chore` does not effect the production version of the app in any way.
- `test` add, update, or fix a test.
- `docs` add, update, or remove documentation. no code changes.

## Project Management

[Desktop Design Prototype](https://invis.io/3FC6KEGQV)  
[Mobile Design Prototype](https://invis.io/VGD6W7ZDQ)  
[Project Task Board](https://github.com/postlight/dpla-frontend/projects/1)

## Scripts

The project includes a number of scripts used for development, testing, and deployment.

- `yarn run dev` - begins bundling javascript with webpack and starts the server in development mode
- `yarn run start` - begins bundling javascript with webpack and starts the server in production mode
- `yarn run build` - builds the project for production

| Team        |
| ------------- |
| Grace Pelling |
| Neil Renicker |
| Frankie Simms |
