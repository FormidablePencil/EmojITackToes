import { useSelector } from "react-redux"
import useCheckIfOnlineGame from "../../hooks/useCheckIfOnlineGame"
import { socket } from "../../socket.io/useSocketIo"
import { rootT } from "../../store"

const useGameControlCenter = (
   { gameOver, setSq, sq, playerOneTurn, sqTypes, setPlayerOneTurn, squaresFilled, setSquaresFilled, setGameOver }) => {
   const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)
   const username = useSelector((state: rootT) => state.multiplayer.username)
   const clientIsHost = useSelector((state: rootT) => state.multiplayer.clientIsHost)
   const isClientTurn = useSelector((state: rootT) => state.multiplayer.isClientTurn)
   const gameboard = useSelector((state: rootT) => state.multiplayer.gameboard)
   const ifOnlineGame = useCheckIfOnlineGame()

   // const isVeryFirstMove = () => {
   //    const columnsInBoard = 3
   //    let firstMove = true
   //    for (let index = 0; index < columnsInBoard; index++) {
   //       if (gameboard[index]) return firstMove = false
   //    }
   //    return firstMove
   // }


   const changeGameboard = ({ boxPressed, col }) => {
      if (gameOver) return
      if (sq[col][boxPressed] === null) {
         setSq({ ...sq, [col]: { ...sq[col], [boxPressed]: playerOneTurn ? sqTypes.p1 : sqTypes.p2 } })
         if (!ifOnlineGame) setPlayerOneTurn(prev => !prev)
         if (squaresFilled >= 8) {
            setSquaresFilled(0)
            setGameOver(true)
            return
         }
         setSquaresFilled(prev => prev + 1)
      } else {
         alert('already pressed do nothing')
      }
   }

   const makeMoveInGameBoard = ({ boxPressed, col }) => {
      if (ifOnlineGame) {
         if (ifOnlineGame && isClientTurn) {
            // ommit to other player the gameboard and toggle isClientTurn
            changeGameboard({ boxPressed, col })
            socket.emit('multiplayer', {
               action: 'move',
               lobbyData: { lobbyId: socketIoData.lobbyId },
               move: { boxPressed, col },
            })
         }
      }
      //  else {
      //    changeGameboard({ boxPressed, col })
      // }
   }



   const handleOnPressSq = (boxPressed, col) => {
      makeMoveInGameBoard({ boxPressed, col })
   }

   return { handleOnPressSq }
}

export default useGameControlCenter
