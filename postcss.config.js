const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugtins: [
    autoprefixer,
    cssnano({ preset: 'default'})
  ]
};