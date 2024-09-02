import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import config from 'config';
import logger from './util/logger';
import socketServerHandler from './socket';

const port = config.get<number>('port'); // numbers?
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();
const httpServer = createServer(app);

const socketServer = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket'],
});

app.options('*', cors({ origin: corsOrigin, credentials: true }));

// app.get('/', (_, res) => res.send(`server is UP`));

httpServer.listen(port, host, () => {
  logger.info(`the server is listening on port: ${port}`);

  socketServerHandler({ socketServer }); //
});
