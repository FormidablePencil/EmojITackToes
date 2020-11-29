import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIoClient from 'socket.io-client';
import { JOINED_LOBBY, UPATE_GAMEBOARD_MULTIPLAYER } from '../actions/types';
import { rootT } from '../store';

export let socket

const useSocketIo = () => {
  const { username, socketIoData, enterLobby, error } = useSelector((state: rootT) => state.multiplayer)
  const dispatch = useDispatch()

  const connectToSocketIo = () => {
    socket = socketIoClient('http://10.0.0.7:4005', {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();

    // listeners
    socket.on('multiplayer', msg => {
      console.log(msg, 'multiplayer')
    });
  }

  const connectToLobby = () => {
    socket.on(socketIoData.lobbyId, payload => {
      if (payload.action === 'match up')
        dispatch({ type: JOINED_LOBBY, payload: payload.lobbyData })
      else if (payload.action === 'move') {
        console.log('what is going on')
        dispatch({ type: UPATE_GAMEBOARD_MULTIPLAYER, payload: payload.move })
      }
    })
  }

  useEffect(() => {
    connectToSocketIo()
    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    if (socketIoData.lobbyId)
      connectToLobby()
  }, [socketIoData.lobbyId])
}

export default useSocketIo