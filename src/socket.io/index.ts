import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socketIoClient from 'socket.io-client';
import { rootT } from '../store';

export let socket

const useSocketIo = () => {
  const { socketIoData, enterLobby, error } = useSelector((state: rootT) => state.multiplayer)
  // redux

  useEffect(() => {

  }, [socketIoData])

  useEffect(() => {
    // configurations
    socket = socketIoClient('http://10.0.0.7:4005', {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();

    // listeners
    socket.on('multiplayer', msg => {
      console.log(msg, 'multiplayer')
    });
    socket.on(socketIoData.roomId, payload => {
      console.log(payload, 'from server')
    })
  }, [enterLobby])

}

export default useSocketIo