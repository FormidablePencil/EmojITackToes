import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { rootT } from "../store"

const useCheckIfMatchFound = () => {
  const navigation = useNavigation()
  const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)

  useEffect(() => {
    if (socketIoData.guest.id && socketIoData.host.id)
      navigation.navigate('findMatch')
  }, [socketIoData])

}

export default useCheckIfMatchFound
