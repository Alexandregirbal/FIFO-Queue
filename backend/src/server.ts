import express, { NextFunction, Request, Response } from "express";
import { PORT } from './config';
import HttpException from "./Exceptions/http";
import logger from "./Middlewares/logger";
import routes from './Routes';

const app = express()
const port = PORT || 5000

// To log all requests for development purposes, 
// we can imagine a more complex logger with trigger only on development servers
app.use(logger)
app.use(express.json())

// remove cors policy for development purposes
app.use((rreq: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// All routes
app.use("/", routes); 

// Error handling
app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(error.status)
    .send({ message: error.message });
});

// Start the server
app.listen(port, () => {
  console.info(`Server listening on port ${port}...`)
})