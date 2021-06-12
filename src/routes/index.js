const send = require('koa-send');

module.exports = function(router, nextApp,  handler){
    router.all('(.*)', async (ctx) => {
        await handler(ctx.req, ctx.res)
        ctx.respond = false
    })

}
