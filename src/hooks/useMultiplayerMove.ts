import { useEffect } from "react"
import { useSelector } from "react-redux"
import { initialSqsT } from "../screens/TickTackToeScreen"
import { socket } from "../socket.io/useSocketIo"
import { rootT } from "../store"

const useMultiplayerMove = ({ sq }: { sq: initialSqsT[] }) => {
  const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)

  useEffect(() => {
    console.log(sq, 'sqsqsqsqsq')
    // console.log(sq.filter(square => square.sq0 || square.sq1 || square.sq2)[0])
    // if (sq.filter(square => square)[0]) {
    //   console.log('initial render')
    // }
    // socket.emit('multiplayer', {
    //   lobbyData: { lobbyId: socketIoData.lobbyId },
    //   boardgame: sq,
    //   action: 'match up',
    // })
  }, [sq])
}

export default useMultiplayerMove
