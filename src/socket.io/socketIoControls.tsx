export enum commandsSocketIo {
  makeMove,
  quit,
  selectEmoji,
  selectAnim,
  hostGame,
  joinGame,
}

const socketIoControls = ({ command, payload, socket, setSocketIoData }) => {
  switch (command) {
    case commandsSocketIo.makeMove:
      socket.emit('chat message', 'sd')
      break;

    case commandsSocketIo.quit:
      break;

    case commandsSocketIo.selectEmoji:
      break;

    case commandsSocketIo.selectAnim:
      break;

    case commandsSocketIo.hostGame:
      console.log('hostGame');
      break;

    case commandsSocketIo.joinGame:
      console.log('joinGame', {command, payload});
      break;

    default:
      break;
  }
}

export default socketIoControls
