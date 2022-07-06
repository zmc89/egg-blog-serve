module.exports = () =>{
    return async function(ctx,next){
        if (!/^\/api\//.test(ctx.request.url)) {
        await next();
        return;
      }
        const token = ctx.request.headers.authorization && ctx.request.headers.authorization.split('Bearer ')[1];
        if (!token) return ctx.helper.body.UNAUTHORIZED({ ctx });
        // // 如果redis中存在此token，则认为此token已加入黑名单，则返回401
        // if ((await app.redis.exists(token)) === 1) {
        //   return ctx.helper.body.UNAUTHORIZED({ ctx });
        // }
       await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
       await next();
    }
}