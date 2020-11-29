import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { rootT } from "../store"

const useLobby = () => {
  const navigation = useNavigation()
  const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)
  const guestUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.guest.username)
  const hostUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.host.username)
  const route = useRoute();

  useEffect(() => {
    routesController()
  }, [guestUsername, hostUsername])

  const routesController = () => {
    if (!socketIoData.guest.username) return
    if (hostUsername && guestUsername && route.name === 'findMatch') {
      navigation.navigate('game')
    } else if (!hostUsername && route.name === 'game'
      || !guestUsername && route.name === 'game') {
      navigation.navigate('findMatch')
    }
  }
}

export default useLobby
