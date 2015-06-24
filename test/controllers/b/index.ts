import {method} from '../../../index'
import get = require('./get')

const routes = {
    route: '/api/b',
    methods: [
        [
            method.get,
            (request) => get()
        ]
    ]
}

export = routes