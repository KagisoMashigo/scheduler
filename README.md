# Scheduler Project

The Scheduler is a simple interview appointment creating tool. It is a demonstration of responsive, single-page web app design using React that is suitable for use on any device. It is a sleek and responsive SPA using React. The main functionality of the app is the creating, deletion and editing of interviews. Account management is not included in the functionality. All data is stored and retrieved from a database API.

Technologies used include React, SASS, WebPack, Babel, Axios client-side, Node.js, Express, Postgres server-side, Storybook, Testing Library, WebPack Dev Server, Jest, and Cypress for development and testing.

Interview Scheduler is not suitable for real-world production use and is only for demonstration and educational purposes.

## Final Product Screenshots

!["Screenshot of homepage"](https://github.com/KagisoMashigo/scheduler/blob/master/docs/Screenshot%20from%202020-12-16%2019-00-18.png?raw=true)

!["Screenshot of new appointment"](https://github.com/KagisoMashigo/scheduler/blob/master/docs/Screenshot%20from%202020-12-16%2019-00-46.png?raw=true)

!["Screenshot of deleting appointment"](https://github.com/KagisoMashigo/scheduler/blob/master/docs/Screenshot%20from%202020-12-16%2019-01-04.png?raw=true)

# Development:

## Getting Started

- Install all dependencies (using the `npm install` command).

## Directory Structure
```sh
./                 Main project repository
./docs             Project documentation and screenshots
./public           Static files served to the client
./public/images    Static images used on the site
./src              Project source code
./src/__mocks__    Axios mocks
./src/components   React components
./src/hooks        React hooks
./src/helpers      Helper functions
./src/styles       Styling
./cypress          Cypress testing fixtures
./stories          Storybook component stories
```
## Dependencies

Interview Scheduler requires Node.js and Postgres and the following NPM packages:
```sh
- react
- react-dom
- react-scripts
- axios
- classnames
- normalize.css
```
## Dev Dependencies
```sh
- react-test-renderer
- prop-types
- node-sass
- cypress
```
## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

