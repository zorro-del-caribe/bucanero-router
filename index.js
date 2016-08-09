const validator = require('koa-json-schema');
const Router = require('koa-router');

module.exports = {
  priority: 400,
  init: function (app, handlers) {
    const routers = {};

    for (const h of handlers) {
      const {namespace, schema, path, method, handler} = h;
      if (!routers[namespace]) {
        routers[namespace] = new Router({prefix: '/' + namespace});
      }
      const router = routers[namespace];
      const hlers = Array.isArray(handler) ? handler : [handler];
      if (schema) {
        hlers.unshift(validator(schema));
      }
      router[method](path, ...hlers);
    }

    for (const np of Object.keys(routers)) {
      const router = routers[np];
      app
        .use(router.routes())
        .use(router.allowedMethods());
    }

    return app;
  }
};