const Koa = require('koa')
const next = require('next')
const Router = require('koa-router');

module.exports = function(dev, serverPort){
    const nextApp = next({ dev })
    const handler = nextApp.getRequestHandler()
        nextApp.prepare().then(() => {
        const server = new Koa()
        const router = new Router()
        server.use(async (ctx, nextData) => {
            await nextData();
        });
        require('./src/routes/index')(router,nextApp, handler)
        
        server.use(async (ctx, next) => {
            ctx.res.statusCode = 200
            await next()
        })
        server.use(router.routes())
        server.listen(serverPort, () => console.log('App running on port',serverPort))
    })
}