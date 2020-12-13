import { socket } from "./useSocketIo";

const socketIoCommands = {
  matchUp: ({ lobbyData }) => {
    socket.emit('multiplayer', { lobbyData, action: 'match up' })
  },
  makeMove: ({ lobbyId, boxPressed, col }) => {
    socket.emit('multiplayer', {
      action: 'move',
      lobbyData: { lobbyId },
      move: { boxPressed: boxPressed, col },
    })
  },
  characterSelected: (emoji, player, lobbyId) => {
    socket.emit('multiplayer', {
      lobbyData: {lobbyId},
      emoji,
      player,
      action: 'character changed'
    })
  },


  readyUp: (lobbyId) => {
    socket.emit('multiplayer', {
      lobbyData:{lobbyId},
      action: 'ready up'
    })
  },
  quitGame: (lobbyId) => {
    socket.emit('multiplayer', {
      lobbyData: {lobbyId},
      action: 'player left'
    })
  }
}

export default socketIoCommands