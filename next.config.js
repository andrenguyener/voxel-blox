const withTM = require("next-transpile-modules")([]);

module.exports = withTM({
    // Target must be serverless
    target: "serverless",
});
