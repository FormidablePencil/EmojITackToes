import { useEffect } from "react"
import { useSelector } from "react-redux"
import { rootT } from "../store"
import useCheckIfOnlineGame from "./useCheckIfOnlineGame"

const useReadyUp = ({startGame}) => {
  const readyUp = useSelector((state: rootT) => state.multiplayer.readyUp)
  const opposingPlayerReadyUp = useSelector((state: rootT) => state.multiplayer.opposingPlayerReadyUp)
  const ifOnlineGame = useCheckIfOnlineGame()

  useEffect(() => {
     if (ifOnlineGame && readyUp && opposingPlayerReadyUp) startGame()
  }, [readyUp, opposingPlayerReadyUp])

}

export default useReadyUp
