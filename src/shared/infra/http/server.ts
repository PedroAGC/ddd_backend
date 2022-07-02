import express from 'express';
import * as http from 'http';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import compress from 'compression';
import v1Router from './api/v1.router';

export default class Server {
  private express: express.Express;

  private port: string;

  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'DENY' }));
    this.express.use(compress());
    this.express.use('/api/v1', v1Router);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `API is running at http://localhost:${
            this.port
          } in ${this.express.get('env')} mode`
        );
        console.log('Press CTRL-C to stop the server');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      resolve();
    });
  }
}
