const defaultHeaders = {
  'X-Frame-Options': 'DENY',
  'X-DNS-Prefetch-Control': 'Off',
  'x-powered-by': null,
  'X-Download-Options': 'noopen',
  'X-Content-Type-Options': 'nosniff'
}

if (process.env.NODE_ENV === 'production') {
  defaultHeaders['cache-control'] = 'max-age=600'
} else {
  defaultHeaders['cache-control'] = 'max-age=0'
}

module.exports = (req, res, next) => {
  res.set(defaultHeaders)
  next()
}
