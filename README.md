# Auto-route Base

## Summary

`Auto-route base` is a skeleton for creating custom auto routing capabilities.
Retrieves code automatically.

## Installation

Install with `npm`:

```
npm install --save autoroute-base
```

## [Project Status](http://www.walkercoderanger.com/blog/2015/06/advice-for-open-source-projects/)

- Stable/Release [![Build Status](https://secure.travis-ci.org/jon49/autoroute-base.png?branch=master)](http://travis-ci.org/jon49/autoroute-base)
- Active (June 26, 2015)

## Example

See the test for a simple example.

`autoroute-express-promise` example (in TypeScript - to see a vanilla JavaScript example see below).

```ts
import {createAutoRoute, method as method_} from 'autoroute-base'
import _ = require('lodash')

const toControllers = _.curry(({message, baseRoute, sendWrapper, routeName}: AutoRouteExpressPromise.ToControllersOptions, controllerMethod: AutoRouteExpressPromise.ControllerMethod) => {

    const [routeMethodIndex, baseController] = controllerMethod,
          methodName = method_[routeMethodIndex], // named route method
          messageInfo = {routeName: routeName, methodName: methodName}

    // Wrap base controller in express style callback.
    baseRoute[methodName]((request: any, client: any, error: any) => {

        message.call(messageInfo, messageInfo)

        var send = <any> _.compose(client.send.bind(client), sendWrapper)

        baseController(request).then(send).catch(error).done()
    })

})

const createRoutes = _.curry((o: AutoRouteExpressPromise.Options, routeDefinitions: AutoRouteExpressPromise.RouteDefinition[]) => {
    _.forEach(routeDefinitions, routeDef => {
        const {route, methods} = routeDef,
              startRoute = o.baseRoute(route), // Get router
              options_: AutoRouteExpressPromise.ToControllersOptions = <any> _.assign({}, o, {routeName: route, baseRoute: startRoute})
        _.forEach(methods, toControllers(options_)) // attach routes/methods to router
    })
})

export const routes = _.curry((options: AutoRouteExpressPromise.Options, glob: string[]) => {
    createAutoRoute({createRoutes: createRoutes(options), glob: glob})
})

export const method = method_
```

Vanilla JavaScript example of above.

```js
var autoroute_base_1 = require('autoroute-base');
var _ = require('lodash');
var toControllers = _.curry(function (_a, controllerMethod) {
    var message = _a.message, baseRoute = _a.baseRoute, sendWrapper = _a.sendWrapper, routeName = _a.routeName;
    var routeMethodIndex = controllerMethod[0], baseController = controllerMethod[1], methodName = autoroute_base_1.method[routeMethodIndex], messageInfo = { routeName: routeName, methodName: methodName };
    // Wrap base controller in express style callback.
    baseRoute[methodName](function (request, client, error) {
        message.call(messageInfo, messageInfo);
        var send = _.compose(client.send.bind(client), sendWrapper);
        baseController(request).then(send).catch(error).done();
    });
});
var createRoutes = _.curry(function (o, routeDefinitions) {
    _.forEach(routeDefinitions, function (routeDef) {
        var route = routeDef.route, methods = routeDef.methods, startRoute = o.baseRoute(route), options_ = _.assign({}, o, { routeName: route, baseRoute: startRoute });
        _.forEach(methods, toControllers(options_)); // attach routes/methods to router
    });
});
exports.routes = _.curry(function (options, glob) {
    autoroute_base_1.createAutoRoute({ createRoutes: createRoutes(options), glob: glob });
});
exports.method = autoroute_base_1.method;
```

## API

```js
import {createAutoRoute, method} from 'autoroute-base'
```

### `createAutoRoute(options)`

where `options`:

```js
{
    glob: string[]
    _globOptions?: any
    createRoutes?: (postGlobResult: any) => any
}
```
**glob**: (Required) Array of globs for files to grab. E.g.,
`['./controllers/**/index.js']`. `autoroute-base` uses a custom post parse
to get back the route/controllers in a cleaner manner for easy processing,
assuming you are using the same set up I used.

**_globOptions**: (Optional) [Options used in
`require-glob`](https://www.npmjs.com/package/require-glob#options).
Note, to override the `autoroute-base` `reducer` behaviour do `{reducer: null}`
(changes to native behaviour) or `{reducer: CustomReducer}`.

**createRoutes**: (Optional) After grabbing all the files to use. It is time to
process them for your custom project. Do your post processing here. This will
use the result of the `require-glob`.

### `method`

This is an enumeration of all the `express.js` methods:

`get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, "m-search", notify, subscribe, unsubscribe, patch, search, connect`

E.g.,

```js
method.get // => 0
method[0] // => "get"
```
