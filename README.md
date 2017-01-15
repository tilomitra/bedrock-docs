# Bedrock Documentation Site
These are the source files for [Bedrock's documentation site](https://tilomitra.github.io/bedrock). It is a static website built using [Metalsmith](http://metalsmith.io), so I put it up here as an example of a static site that can be built using it.

## Installation

```
git clone git@github.com:tilomitra/bedrock-docs.git
npm install
node build.js
```

This will set up a browser-sync environment, where all your changes will automatically reload and rebuild the static site.

## To deploy to Github Pages:
```
npm run deploy --prod
```

This will push everything in the `build/` directory to the `gh-pages` branch of whatever your `origin` remote is. 