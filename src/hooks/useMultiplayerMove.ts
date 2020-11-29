import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { socket } from "../socket.io/useSocketIo"
import { rootT } from "../store"
import { GameBoardInterface } from "../TypesTypeScript/TypesAndInterface"

const useMultiplayerMove = ({ sq, setSq }: { sq: GameBoardInterface, setSq }) => {
  const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)
  const gameboard = useSelector((state: rootT) => state.multiplayer.gameboard)
  const [initialRender, setInitialRender] = useState(false)

  useEffect(() => {
    console.log(gameboard)
    setSq(gameboard)
  }, [gameboard])


  // useEffect(() => {
  //   /* I don't want to socket.emit to other player gameboard (e.g sq) hasn't changed */
  //   if (gameboard === sq)
  //     return
  //   if (!initialRender) {
  //     console.log(sq, 'sqarw')
  //     for (let col = 0; col < 3; col++) {
  //       if (sq[col].sq0 || sq[col].sq1 || sq[col].sq2) {
  //         setInitialRender(true)
  //       }
  //     }
  //   } else {
  //   }
  // }, [sq, initialRender])
}

export default useMultiplayerMove
