module.exports = (api, _, __, invoking) => {
  api.extendPackage( {
    devDependencies: {
      "@vue/test-utils": "^1.0.0-beta.29",
      "chai": "^4.2.0",
      "mocha": "^6.2.0"
    },
    scripts: {
      "test:unit": "vue-cli-service test:unit"
    }
  } );
};
