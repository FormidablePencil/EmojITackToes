import { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';

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

  return { sendMessage, socketIoData, setSocketIoData }
}


export default useSocketIo