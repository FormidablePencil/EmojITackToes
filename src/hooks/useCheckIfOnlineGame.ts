import { useSelector } from "react-redux"
import { rootT } from "../store"

const useCheckIfOnlineGame = () => {
  const guestUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.guest.username)
  return guestUsername ? true : false
}

export default useCheckIfOnlineGame
