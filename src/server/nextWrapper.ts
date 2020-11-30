import Server from "next/dist/next-server/server/next-server"
import { Request, ResponseToolkit } from "@hapi/hapi";
import urlModule from 'url'

export const nextHandlerWrapper = (app: Server) => {
    const handler = app.getRequestHandler()
    return async ({ raw, url, query }: Request, h: ResponseToolkit) => {
        const parsedUrl = urlModule.parse(url.toString(), true, true)
        parsedUrl.query = query
        await handler(raw.req, raw.res, parsedUrl)
        return h.close
    }
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