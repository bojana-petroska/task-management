import socketID from 'socket.io-client';

export const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:5000";
export const socket = socketID(SOCKET_URL);