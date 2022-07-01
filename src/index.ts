/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();
import Server from './shared/infra/http/server';

const server = new Server(process.env.PORT || '8000');
server.listen();
