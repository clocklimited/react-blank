import express from 'express'
import { join } from 'path'
import headers from './middleware/headers'
import xss from './middleware/xss'

const applyCommonMiddleware = app =>
  app
    .use(headers)
    .use(xss)
    .use('/', express.static(join(__dirname, '/../static')))

export default applyCommonMiddleware
