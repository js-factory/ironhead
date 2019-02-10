Ironhead 
======
NodeJS Framework over [express](https://github.com/expressjs/express) based on functional and declarative programming.


# Motivation

> In typical fast pace dev environment, code review is a challenge and simply causes more and more tech debt. Functional Programming enables developers to refactor a simple program or function. Taking control over execution reduces repetitive work to be done by programmer and eventually help in reducing number of lines of code to be written.


#### Key features
1. Code decoupling.
2. Functional programming.
3. Clear boundries between presentation and business logic.
4. Declarative program.
5. Refactoring smaller functions are much more easy.


#### MVC
> MVC pattern has severed us exceptionally well over the period and still does. But it's no more fit for our next generation UI framework.


## Contents

1. [Routes](#router)
2. [Middleware](#middleware)
3. [Views](#views---templaing-engine)
4. [Userhooks](#userhooks)
5. [Configuration](#configuration)
7. [Custom Path Configuration for components](#custom-path-configuration)

## Router

**Route** is plain javascript object. It defines how a particular http request will be handled by the web application.

And here's sample **route**!

```javascript
// routes/foo.js
const requestSchema = require('../schema/request/foo');
const responseSchema = require('../schema/response/foo');
const gateway = require('../gateway/foo.js');
const { fn1, fn2 } = require('../dekorators');
const prehandler = require('../prehandler/foo');

module.exports = {
    domain: 'index',
    method: 'GET',
    url: '/',
    template: 'index',
    responseType: 'html',
    allowRedirect: false,
    isReqValidation: true,
    schema: {
        ...requestSchema,
        ...responseSchema
    },
    prehandlers: [
       prehandler
    ],
    gateway,
    dekorators: [  
    	fn1,
        fn2
    ]
};

// sample url - https://www.example.com/?cid=foo&pos=0
// request schema
// schema/request/foo.js
module.exports = {
    query: {
        type: 'object',
        properties: {
            cid: { type: 'string' },
            pos: { type: 'integer' },
        },
        required: ['cid']
    },
    cookies: {
        type: 'object',
        properties: {
            sid: { type: 'string' }
        },
        required: ['sid']
    },
    config: {
        type: 'object',
        properties: {
            showWelComeMessage: { type: 'boolean' }
        }
    }
}

// response schema
// schema/response/foo.js
module.exports = {
	response: {
        ok: { // A successful response
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    fkc: { type: 'integer' }
                }
            }
        },
        notOk: { // Unsuccessful response
        	badReq: { // Bad request 
            	success: false,
                error: {
                	statusCode: 1001,
                    message: ''
                },
                data: {}
            },
            badRes: { // Api failed or some other exception
            	success: false,
                error: {
                	statusCode: 400, // 4xx, 5xx
                    message: ''
                },
                data: {}
            }
        }
    }
};

```

#### Route Schema
- **domain -:** You may want to group your application into different pages or modules. You can define these logical grouping in the route. 

- **method -:** An  [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) i.e. GET or POST 
- **url -:** External url to be handled by the application
- **responseType -:** Http Response format  <br/>
  ```javascript 
  ResponseType Options: html|json
  Default Value: json
	```
	****<small>Note -:**** If it is set to json, template will be ignored and json response will be sent to client </small>
- **allowRedirect -:** Allow http redirect 301|302. If the flag is set true framework attach redirect middleware which expect a redirect node in the decorators output.
  ```javascript
  {
      ... // other props
      redirect: {
          code: 302, // Default value 302, other option 301
          path: '/' // if path is not provided it will redirect to referrer
      }
  }

  ```
- **isReqValidation -:** It enables request validation. If validation fails it will respond with `schema.response.notOk.badReq` defined in response schema.
- **template -:** A template file path. The template will be used to prepare html response when `responseType` is set to `html`
- **schema -:** A request and response validator. Also it filters the data and send only those defined in the shcema. Please refer [AJV](http://epoberezkin.github.io/ajv/) documentations for further details. Refer above route definition for more details.

- **prehandlers -:** 
A `pre handler` is a plain JavaScript function. It has access to request parameters such as query params, path params, cookies, request body, headers etc. Developer can use these parameters and modify them for future use during request lifecycle.
A prehandler gets access to properties defined in the request schema.

- **gateway -:** A `gateway` is bridge between your application and external systems i.e. rest apis, databases etc. `gateway` attaches final response into response. Your application response module can access it calling `res.props('data');

```js
// express middleware
// sendToClinet.js

const sendToClinet = (req, res) => {
    const data = res.props('data');
    // application logic ...
    // application logic ...
    if(sendJson) {
        return res.json(data);
    }
    return res.render('templateName', data);
}

```

- **dekorators -:** A `dekorator` is a pure javascript function that can bind to certain properties of bigger response, it can modify the data. A dekorator must return an object. Having dekorator in place offers you to define functions with single responsibility.

```javascript
// Simple dekorator

// title.js

const title = (props) => {
    const { name, brand, done } = props; // dispatch is injected by connect.
    const newName = name.replace(brand.name, '');

    return done({
        name: newName   // name is propery in initial state
    });
  };

  module.exports = connect(['name', 'brand'], title);

```


## Middleware

**Middlewares** are the functions which are executed in the middle of <i>request response cycle</i>.

**Custom Middlewares** definition is similar to middlewares

And here's how you define the custom **middlewares** and its **execution chain!!**

```javascript
// Defining middleware chain


// Custom Middlewares definition
const {
	responseFactory,
    notFound,
    defaultErrorHandler
} = require('./app/middleware');

{
    order: [
        'cookieParser',
        ....
        ....
        .....
        'router',
        'responseFactory',
        'notFound',
        'defaultErrorHandler'
    ],
    {
        responseFactory,
        notFound,
        defaultErrorHandler
    }
}

```

```javascript
// Default Error handler
const defaultErrorHandler = (err, req, res, next) => {
};

// Custom Middleware Definition
const customMiddleware = (req, res, next) => {};
```

#### Order
It is an array in which we can define the execution order of the middlewares. One can specify the custom middlewares and some are given to the application by the framework like:

1. **Cookie Parser** - `cookieParser` key to be used in **order**.
2. **Router** - `router` key to be used in **order**.

#### Cookie Parser
It is a middleware which is offered by the framework and it internally uses [Cookie-Parser](https://github.com/expressjs/cookie-parser) by express.

> NOTE: For signing the cookies with a secret, one should use cookies configuration.

#### Router
It is also a middleware, which needs to be plugged in **order** list and the **routes** declared by the application will be executed at that particular point in the <i>request response lifecycle </i>.


## Views - templaing engine

A templating engine/view engine enables the application to use static templates files to genarate HTML which is rendered at the client side.

And here's the example of configuring the `Template/View Engine`!!

```javascript 
 // config/views.js
 
 module.exports = {
 	engine: <engine>
 };
```

*Templates path* can be configured using **rc configuration**

Framework Supports **express-compliant** template engines. More about it can be explored at [Express Template Engines](https://expressjs.com/en/guide/using-template-engines.html)

## Userhooks

***Hooks*** are an array of functions that are executed prior to application binding. Only after successfull execution of all the hooks, **Application** binds to the specified port.

And here's the sample **hook!!**

```javascript

// Custom Hook definition
function customHook(app, cb) {
    try {
        app.setLocals('key', 'value');
    } catch (err) {
        console.log('\n---------------------------------------------------\n');
        console.error('Error.');
        console.log('\n---------------------------------------------------\n');
    }
    cb();
}
```

**Custom Hook** receives two arguments:

1. **app** - <i>Application Instance</i>
2. **cb** - <i>Callback function</i>


> NOTE: **cb** function must be called otherwise your application won't start.

## Configuration

Framework supports the **default** and **environment** configs.

####  Config - `config/*`

`config/config.js` It should contain the default configuration of the application.

And here's the sample to define the configuration, to set the **secret** value of the **cookies** for sigining and **port**!!

```javascript
// secret will be used by cookie parser for signing the cookies
module.exports = {
    cookie: {
        secret: '123123123'
    },
    port: 1447
};
```

#### Environment Config - `/config/env/*`

**NODE_ENV** defines the environment of the application and depending on that **environment** config is loaded.

If no `environment` is set, it will try to load the **development.js**

> NOTE: Environment configs overrides the default configuration.

## Custom path configuration

One can specify the custom path for components.

```
{
    "cluster": true,
    "paths": {
        "config": '/config',
        "routes": '/app/routes',
        "middleware": '/app/middleware',
        "hooks": "/app/hooks",
        "views": "/public/templates"

    }
}

```

## Concept and Fundamentals
---

>Prehandlers, gateway, dekorators must follow [functional programming](https://www.youtube.com/watch?v=e-5obm1G_FY) fundamentals. Please refer below resources for more details

[******Learning Functional Programming with JavaScript - JSUnconf 2016******](https://www.youtube.com/watch?v=e-5obm1G_FY)<br/>
[******Master Functional Programming******](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)

---

## License

  [MIT](LICENSE)