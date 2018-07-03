const express = require('express')
const request = require('supertest')
const xss = require('../xss')

describe('headers', () => {
  let app
  beforeEach(async () => {
    app = express()
    app.use(xss)
  })
  it('should set X-XSS-Protection to block', async () => {
    const response = await request(app).get('/')
    expect(response.headers['x-xss-protection']).toEqual('1; mode=block')
  })
  it('should set X-XSS-Protection to off for IE', async () => {
    const response = await request(app).get('/').set('user-agent', 'Mozilla/4.0(compatible; MSIE 7.0b; Windows NT 6.0)')
    expect(response.headers['x-xss-protection']).toEqual('0')
  })
  it('should set x-content-type-options to nosniff', async () => {
    const response = await request(app).get('/')
    expect(response.headers['x-content-type-options']).toEqual('nosniff')
  })
})
