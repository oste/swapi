const withSass = require("@zeit/next-sass");

module.exports = withSass({
  sassLoaderOptions: {
    includePaths: ["./node_modules"]
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    return config;
  }
});
