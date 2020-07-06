const config = require('./jest.config')

config.moduleNameMapper = {
  '^@contentkit\\/([^/]+)': '<rootDir>/$1/lib/react-$1.cjs.js',
}

module.exports = config
