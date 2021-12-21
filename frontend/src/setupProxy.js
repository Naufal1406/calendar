const { createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/sqi-schedule',
        createProxyMiddleware({
            target : 'http://localhost:888',
            changeOrigin : true
        })
    )
}