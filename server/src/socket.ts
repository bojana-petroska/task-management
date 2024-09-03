import { Server, Socket } from 'socket.io';
import logger from './util/logger';
import { v4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description: string;
}

const EVENTS = {
  connection: 'connection',
  CLIENT: {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
  },
  SERVER: {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
  },
};

let tasks: Task[] = [];

function socketServerHandler({ socketServer }: { socketServer: Server }) {
  logger.info(`socket enabled`);

  socketServer.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`user connected with id: ${socket.id}`);

    socket.emit(EVENTS.SERVER.ADD_TASK, tasks);

    socket.on(EVENTS.CLIENT.ADD_TASK, (newTask: Task) => {
      tasks.push(newTask);
      socketServer.emit(EVENTS.SERVER.ADD_TASK, tasks);
      logger.info(`new task added`);
    });

    socket.on(EVENTS.CLIENT.DELETE_TASK, (id: string) => {
      tasks = tasks.filter((task) => task.id !== id);
      socketServer.emit(EVENTS.SERVER.DELETE_TASK, tasks);
      logger.info(`task erased`);
    });
  });
}

export default socketServerHandler;
