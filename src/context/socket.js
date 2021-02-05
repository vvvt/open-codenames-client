import socketio from "socket.io-client";
import React from 'react';
const SOCKET_URL = "https://open-code-names.herokuapp.com"

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext();
