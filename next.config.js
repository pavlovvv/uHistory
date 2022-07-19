const {i18n} = require('./next-i18next.config')

module.exports = {
  i18n,
  output: 'standalone',
  images: {
    domains: ['cat-talk-s3.s3.eu-central-1.amazonaws.com']
  }
}
