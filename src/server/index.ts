import { Server as HapiServer } from '@hapi/hapi'
import next from 'next'
import { nextHandlerWrapper } from './nextWrapper'

import routes from './routes'

const app = next({
    dev: process.env.environment !== 'production'
});

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

const server = new HapiServer({
    port: port,
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
        method: '*',
        path: '/{p*}' /* catch all route */,
        handler: nextHandlerWrapper(app),
    })

    try {
        await server.start();
        console.log(`Server is running at ${server.info.uri}`);
    } catch (e) {
        console.log(e)
    }
});




