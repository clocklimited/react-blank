const express = require('express')
const request = require('supertest')
const headers = require('../headers')

describe('headers', () => {
  let app
  beforeEach(async () => {
    app = express()
    app.use(headers)
  })
  it('should have maxAge 600 on 200', async () => {
    const response = await request(app).get('/')
    expect(response.headers['cache-control']).toEqual('max-age=600')
  })
  it('should set x-content-type-options to nosniff', async () => {
    const response = await request(app).get('/')
    expect(response.headers['x-content-type-options']).toEqual('nosniff')
  })
  it('should set x-dns-prefetch-control to Off', async () => {
    const response = await request(app).get('/')
    expect(response.headers['x-dns-prefetch-control']).toEqual('Off')
  })
  it('should set x-download-options to noopen', async () => {
    const response = await request(app).get('/')
    expect(response.headers['x-download-options']).toEqual('noopen')
  })
  it('should set x-frame-options to DENY', async () => {
    const response = await request(app).get('/')
    expect(response.headers['x-frame-options']).toEqual('DENY')
  })
})
