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

  // executes whether lobbyId changes
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
    socket.on(socketIoData.lobbyId, payload => {
      console.log('well')

      if (payload.action === 'match up')
        dispatch({ type: JOINED_LOBBY, payload: payload.lobbyData })
      else if (payload.action === 'move') {
        dispatch({ type: UPATE_GAMEBOARD_MULTIPLAYER, payload: payload.boardgame })
      }

      // console.log(payload.gameRoom === socketIoData, 'response from lobby')
      // console.log(payload.gameRoom, 'response from lobby')

      // socket.emit('multiplayer',
      //   `{
      //   payloada: {
      //     lobbyId: joinPayload.lobbyId
      //   },
      //   move: 'host player turn...'
      //   }`)
    })

    // cleanup
    return () => socket.disconnect()

  }, [socketIoData.lobbyId])

}

export default useSocketIo