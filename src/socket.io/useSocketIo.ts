import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIoClient from 'socket.io-client';
import { CLIENT_TURN, JOINED_LOBBY, OPPOSING_PLAYER_READY_UP, PLAYER_LEFT_GAME, UPDATE_CHARACTER, UPDATE_GAME_BOARD } from '../actions/types';
import { rootT } from '../store';
import { sqTypes } from '../TypesTypeScript/TypesAndInterface';

export let socket

const useSocketIo = () => {
  const { socketIoData, clientIsHost } = useSelector((state: rootT) => state.multiplayer)
  const dispatch = useDispatch()

  const connectToSocketIo = () => {
    socket = socketIoClient('https://tick-tack-toes.herokuapp.com/', {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();

    // listeners
    socket.on('multiplayer', msg => {
    });
  }

  const gameLobby = () => {
    socket.on(socketIoData.lobbyId, payload => {
      switch (true) {

        case payload.action === 'match up':
          dispatch({ type: JOINED_LOBBY, payload: payload.lobbyData })
          break;

        case payload.action === 'move':
          dispatch({
            type: UPDATE_GAME_BOARD,
            payload: {
              col: payload.move.col,
              boxPressed: payload.move.boxPressed,
              player: clientIsHost ? sqTypes.p2 : sqTypes.p1,
            },
          })
          dispatch({ type: CLIENT_TURN })
          break;

        case payload.action === 'character changed':
          dispatch({
            type: UPDATE_CHARACTER,
            payload: { emoji: payload.emoji, player: clientIsHost ? 2 : 1 },
          })
          break;

        case payload.action === 'ready up':
          dispatch({ type: OPPOSING_PLAYER_READY_UP })
          break;

        case payload.action === 'player left':
          dispatch({ type: PLAYER_LEFT_GAME })
          break;

        default:
          break;
      }
    })
  }

  useEffect(() => {
    connectToSocketIo()
    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    if (socketIoData.lobbyId)
      gameLobby()
  }, [socketIoData.lobbyId])
}

export default useSocketIo