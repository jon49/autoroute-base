var index_1 = require('../../../index');
var get = require('./get');
var routes = {
    route: '/api/a',
    methods: [
        [
            index_1.method.get,
            function (request) { return get(); }
        ]
    ]
};
module.exports = routes;
//# sourceMappingURL=index.js.map