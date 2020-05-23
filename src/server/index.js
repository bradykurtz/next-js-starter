const Hapi = require("@hapi/hapi");
const next = require("next");
const {
    defaultHandlerWrapper,
    nextHandlerWrapper
} = require("./nextWrapper");
const routes = require("./routes")

const app = next({
    dev: process.env.environment !== 'production'
});

const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = Hapi.Server({
    port,
    host
});


app.prepare().then(async () => {

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/_next/{p*}' /* next specific routes */,
        handler: nextHandlerWrapper(app),
    })

    server.route({
        method: 'GET',
        path: '/static/{p*}' /* use next to handle static files */,
        handler: nextHandlerWrapper(app),
    })

    server.route({
        method: '*',
        path: '/{p*}' /* catch all route */,
        handler: defaultHandlerWrapper(app),
    })

    try {
        await server.start();
        console.log(`Server is running at ${server.info.uri}`);
    } catch (e) {
        console.log(e)
    }
});




