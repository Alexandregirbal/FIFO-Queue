import { Request, Response, NextFunction } from "express";
import moment from "moment";

const inlineSummary = (summary: any) => {
  const { method, url, params, query, body } = summary;
  return `${method} | ${url} | ${JSON.stringify(params)} | ${JSON.stringify(query)} | ${JSON.stringify(body)}`;
}


export default (req: Request, res: Response, next: NextFunction) => {
    const summary = {
      method: req.method,
      url: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
    }
    console.info(moment().format('LLL'), inlineSummary(summary));
    return next()
}