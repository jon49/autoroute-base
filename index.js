/// <reference path="typings/typings.d.ts" />
var requireGlob = require('require-glob');
// See http://expressjs.com/guide/routing.html under "Route methods"
var Method;
(function (Method) {
    Method[Method["get"] = 0] = "get";
    Method[Method["post"] = 1] = "post";
    Method[Method["put"] = 2] = "put";
    Method[Method["head"] = 3] = "head";
    Method[Method["delete"] = 4] = "delete";
    Method[Method["options"] = 5] = "options";
    Method[Method["trace"] = 6] = "trace";
    Method[Method["copy"] = 7] = "copy";
    Method[Method["lock"] = 8] = "lock";
    Method[Method["mkcol"] = 9] = "mkcol";
    Method[Method["move"] = 10] = "move";
    Method[Method["purge"] = 11] = "purge";
    Method[Method["propfind"] = 12] = "propfind";
    Method[Method["proppatch"] = 13] = "proppatch";
    Method[Method["unlock"] = 14] = "unlock";
    Method[Method["report"] = 15] = "report";
    Method[Method["mkactivity"] = 16] = "mkactivity";
    Method[Method["checkout"] = 17] = "checkout";
    Method[Method["merge"] = 18] = "merge";
    Method[Method["m-search"] = 19] = "m-search";
    Method[Method["notify"] = 20] = "notify";
    Method[Method["subscribe"] = 21] = "subscribe";
    Method[Method["unsubscribe"] = 22] = "unsubscribe";
    Method[Method["patch"] = 23] = "patch";
    Method[Method["search"] = 24] = "search";
    Method[Method["connect"] = 25] = "connect";
})(Method || (Method = {}));
/**
* Check if object is empty
* source: http://stackoverflow.com/a/19494359/632495
*/
var isEmpty = function (value) {
    return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
};
/**
* Give an array of values to work with from require-glob.
*/
var reducer = function (acc, file) { return (isEmpty(acc) ? [] : acc).concat(file.exports); };
exports.createAutoRoute = function (options) {
    var identity = function (_) { return _; }, glob = options.glob, _a = options._globOptions, _globOptions = _a === void 0 ? {} : _a, _b = options.createRoutes, createRoutes = _b === void 0 ? identity : _b;
    // If `undefined` do my implementation of reducer, if `null` then do require-glob's implementation,
    // otherwise do custom implementation
    _globOptions.reducer = (_globOptions.reducer === void 0) ? reducer : _globOptions.reducer;
    return createRoutes(requireGlob.sync(glob, _globOptions));
};
exports.method = Method;
//# sourceMappingURL=index.js.map