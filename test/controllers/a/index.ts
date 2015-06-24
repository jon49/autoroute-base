import {method} from '../../../index'
import get = require('./get')

const routes = {
    route: '/api/a',
    methods: [
        [
            method.get,
            (request) => get()
        ]
    ]
}

export = routes