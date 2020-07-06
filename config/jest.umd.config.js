const config = require('./jest.config')

config.moduleNameMapper = {
  '^@contentkit\\/([^/]+)': '<rootDir>/$1/lib/react-$1.umd.js'
}

module.exports = config
