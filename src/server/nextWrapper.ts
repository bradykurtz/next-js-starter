import Server from "next/dist/next-server/server/next-server"
import { Request, ResponseToolkit } from "@hapi/hapi";
import urlModule from 'url'

export const nextHandlerWrapper = ( app: Server ) => {
    
    const handler = app.getRequestHandler()

    return async ({ raw: { req, res }, url }: Request, h: ResponseToolkit) => {
        await handler(req, res, urlModule.parse(url.toString(), true, true))
        return h.close
    }

}

export const defaultHandlerWrapper = ( app: Server ) => async (
    { raw: { req, res }, url }: Request, 
    h: ResponseToolkit
) => {
    const { pathname, query } = urlModule.parse(url.toString(), true, true)
    const html = await app.renderToHTML(req, res, pathname || "", query)
    return h.response(html || undefined).code(res.statusCode)
}

export const pathWrapper = (app: Server, pathName: string) => async (
    { raw, query, params }: Request,
    h: ResponseToolkit
) => {
    const html = await app.renderToHTML(
        raw.req,
        raw.res,
        pathName,
        { ...query, ...params }
    )
    return h.response(html || undefined).code(raw.res.statusCode)
}