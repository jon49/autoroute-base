/// <reference path="typings/typings.d.ts" />

const requireGlob = require('require-glob')

// See http://expressjs.com/guide/routing.html under "Route methods"
enum Method { get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, "m-search", notify, subscribe, unsubscribe, patch, search, connect }

/**
* Check if object is empty
* source: http://stackoverflow.com/a/19494359/632495
*/
const isEmpty = value =>
    Boolean(value && typeof value == 'object') && !Object.keys(value).length

/**
* Give an array of values to work with from require-glob.
*/
const reducer = (acc: any[], file) => (isEmpty(acc)? []: acc).concat(file.exports)

export const createAutoRoute = (options: Options): void => {
    const identity = (_) => _,
          {glob, _globOptions = {}, createRoutes = identity} = options

    // If `undefined` do my implementation of reducer, if `null` then do require-glob's implementation,
    // otherwise do custom implementation
    _globOptions.reducer = (_globOptions.reducer === void 0)? reducer: _globOptions.reducer

    return createRoutes(requireGlob.sync(glob, _globOptions))

}

export const method = Method