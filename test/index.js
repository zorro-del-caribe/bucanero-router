const test = require('tape');
const bucanero = require('bucanero');
const supertest = require('supertest');
const path = require('path');

test('add routes', t=> {

  const app = bucanero({
    plugins: [path.join(__dirname,'../index')],
    handlersRoot: './test/handlers',
    pluginsRoot:'./test/plugins'
  });

  app.start()
    .then(function () {
      supertest(app.server)
        .get('/tests')
        .expect(200)
        .end(function (err, result) {
          t.error(err);
          t.equal(result.body.greet,'hello');
          app.stop();
          t.end();
        });
    });
});

test('use schema as input validator directive',t=>{

  const app = bucanero({
    plugins: [path.join(__dirname,'../index')],
    handlersRoot: './test/handlers',
    pluginsRoot:'./test/plugins'
  });

  app.start()
    .then(function () {
      supertest(app.server)
        .get('/tests?name=fo')
        .expect(422)
        .end(function (err, result) {
          t.error(err);
          app.stop();
          t.end();
        });
    });
});
