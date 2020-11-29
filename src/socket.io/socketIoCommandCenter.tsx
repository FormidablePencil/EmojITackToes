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
  }
}

export default socketIoCommands