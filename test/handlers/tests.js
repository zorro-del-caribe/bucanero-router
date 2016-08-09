exports.greet = {
  method: 'get',
  path: '/',
  schema: {
    type: 'object',
    properties: {
      name: {type: 'string', minLength: 3}
    }
  },
  handler: function * () {
    this.body = {greet: 'hello'};
    if (this.request.query) {
      this.body.query = this.request.query;
    }
  }
};