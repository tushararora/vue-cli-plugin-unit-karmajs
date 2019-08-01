# vue-cli-plugin-unit-karmajs

Run unit tests in a @vue/cli project with Karma and Mocha

## Install

```bash
$ vue add vue-cli-plugin-unit-karmajs
```

If you want to install it using npm:

```bash
$ npm install vue-cli-plugin-unit-karmajs
$ vue invoke vue-cli-plugin-unit-karmajs
```

If you don't want to use `vue invoke`, install required devDependencies which are present in `generator/index.js`.

## Usage

`vue-cli-service test:unit [options] [...files]`

### Injected commands:
* `vue-cli-service test:unit`

  Default files matches are: any files in tests/unit that end in `.spec.js`.

  Command line options: 

  * `--watch, -w`: run in watch mode

NOTE: If you want to override default karma settings, you can use the `pluginOptions.karma` key in `vue.config.js` like this:

```javascript
pluginOptions: {
  karma: {
    files: [ 'tests/**/*.spec.js' ]
  }
}
```

This module is inspired from [vue-cli-plugin-unit-karma] which is not actively maintained now.


[vue-cli-plugin-unit-karma]: https://github.com/davidwallacejackson/vue-cli-plugin-unit-karma