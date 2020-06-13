module.exports = {
  webpack: (config) => {
    // Based on https://github.com/vercel/next.js/blob/canary/examples/with-styletron/next.config.js
    config.externals = config.externals || {}
    config.externals['styletron-server'] = 'styletron-server'
    return config
  }
}
