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
    // console.log(socketIoData, 'socketIoData')
    // console.log(route.name, 'kk')
    // console.log(socketIoData, 'listening to socketIoData')
    // console.log(hostUsername, guestUsername, route.name === 'findMatch')
    if (hostUsername && guestUsername && route.name === 'findMatch') {
      // console.log('hitt1')
      navigation.navigate('game')
    } else if (!hostUsername && route.name === 'game'
      || !guestUsername && route.name === 'game') {
      // console.log('hitt2')
      navigation.navigate('findMatch')
    }
  }, [guestUsername, hostUsername])
}

export default useLobby
