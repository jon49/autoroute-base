var index_1 = require('../index');
var assert = require('assert');
describe('autoroute-base', function () {
    it('gets data', function () {
        var result = index_1.createAutoRoute({
            glob: ['./test/controllers/**/index.js']
        });
        assert.equal(result[0].route, '/api/a');
        assert.equal(result[0].methods[0][0], 0);
        assert.equal(result[1].route, '/api/b');
        assert.equal(result[1].methods[0][0], 0);
    });
});
//# sourceMappingURL=spec.js.map