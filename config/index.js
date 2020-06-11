'use strict'

const nconf = require('nconf')
require('dotenv').config({path: process.env.DOTENV_PATH || '.env'})

nconf.argv()
  .env()

nconf.use('memory')

const dms = (process.env.DMS || 'http://mock.ckan').replace(/\/?$/, '')
const cms = (process.env.CMS || 'http://mock.cms').replace(/\/?$/, '')

// This is the object that you want to override in your own local config
nconf.defaults({
  env: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG || false,
  DMS: dms,
  CMS: cms,
})

module.exports = {
  get: nconf.get.bind(nconf),
  set: nconf.set.bind(nconf),
  reset: nconf.reset.bind(nconf)
}
