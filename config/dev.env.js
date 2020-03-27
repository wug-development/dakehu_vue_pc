'use strict'
const merge = require('webpack-merge')

module.exports = merge({
    NODE_ENV: '"development"',
    API_URL: '"/apis"',
    APIM_URL: '"/apim"',
    APIO_URL: '"/apio"',
    APIW_URL: '"/apiw"',
    IMG_URL: '"http://vip.airkx.cn"'
})
