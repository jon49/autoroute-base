import {createAutoRoute} from '../index'
import {inspect} from 'util'
import assert = require('assert')

describe('autoroute-base', function() {
    it('gets data', () => {
        var result = createAutoRoute({
            glob: ['./test/controllers/**/index.js']
        })
        assert.equal(result[0].route, '/api/a')
        assert.equal(result[0].methods[0][0], 0)
        assert.equal(result[1].route, '/api/b')
        assert.equal(result[1].methods[0][0], 0)
    })
})