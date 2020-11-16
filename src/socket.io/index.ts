import { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import socketIoControls, { commandsSocketIo } from './socketIoControls';

/* make it so that one could host and enter a game */
let socket

const useSocketIo = () => {
  const [socketIoData, setSocketIoData] = useState({ chatMsg: '' })

  useEffect(() => {
    // configurations
    socket = socketIoClient('http://10.0.0.7:4005', {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();
    socket.on('connect', () => {
      console.log('connected to socket server');
    });
    // listener
    socket.on("chat message", msg => {
      console.log(msg, 'from server')
      setSocketIoData({ chatMsg: msg })
    })
  }, [])

  const sendMessage = (msg = 'hello') => {
    socket.emit('chat message', msg);
    setSocketIoData({ chatMsg: msg });
  }

  const dispatchCommand = ({ command, payload }: dispatchCommandT) =>
    socketIoControls({ command, payload, socket, setSocketIoData })

  return { dispatchCommand }
}

export interface dispatchCommandT { command: commandsSocketIo, payload?: any }

export default useSocketIo