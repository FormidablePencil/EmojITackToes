import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import asyncStorageMethods from "@bit/formidablepencil.react-native-reusables.async-storage-methods"
import { rootT } from "../store"
import { LOAD_LOCALLY_SAVED_ANIM_SETTINGS, LOAD_LOCALLY_SAVED_CHARACTERS, LOAD_LOCALLY_SAVED_MUTE, LOAD_LOCALLY_SAVED_USERNAME, LOCALLY_STORED_DATA_LOADED } from "../actions/types"
import getRandomFruitsName from 'random-fruits-name'


const lsDirNames = {
  mute: 'mute',
  playerTag: 'playerTag',
  animationSetting: 'animationSetting',
  playerCharacterSettings: 'playerCharacterSettings',
}
const useLocalStorage = () => {
  //* player tag, muted, character, animation
  const dispatch = useDispatch()

  useEffect(() => {
    loadLocallyStoredData()
  }, [])

  const loadLocallyStoredData = async () => {
    await handleAsyncStorage(lsDirNames.mute, LOAD_LOCALLY_SAVED_MUTE)
    await handleAsyncStorage(lsDirNames.playerTag, LOAD_LOCALLY_SAVED_USERNAME)
    await handleAsyncStorage(lsDirNames.animationSetting, LOAD_LOCALLY_SAVED_ANIM_SETTINGS)
    await handleAsyncStorage(lsDirNames.playerCharacterSettings, LOAD_LOCALLY_SAVED_CHARACTERS)
    await dispatch({ type: LOCALLY_STORED_DATA_LOADED })
  }

  const handleAsyncStorage = async (dirName, type) => {
    const locallyStored = await asyncStorageMethods.getLocallyStoredData(dirName)
    if (locallyStored) dispatch({ type, payload: locallyStored })
    else furtherAction(dirName, type)
  }

  const furtherAction = (dirName, type) => {
    switch (true) {
      case dirName === lsDirNames.playerTag:
        getRandomFruitsName()
        dispatch({ type, payload: getRandomFruitsName() })
        break;

      default:
        break;
    }
  }
}

const saveLocallyMute = async (data) => await asyncStorageMethods.storeToLocalStorage(lsDirNames.mute, data)
const saveLocallyUsername = async (data) => await asyncStorageMethods.storeToLocalStorage(lsDirNames.playerTag, data)
const saveLocallyAnimationSetting = async (data) => await asyncStorageMethods.storeToLocalStorage(lsDirNames.animationSetting, data)
const saveLocallyPlayerCharacterSettings = async (data) => await asyncStorageMethods.storeToLocalStorage(lsDirNames.playerCharacterSettings, data)

export {
  saveLocallyMute,
  saveLocallyUsername,
  saveLocallyAnimationSetting,
  saveLocallyPlayerCharacterSettings,
}

export default useLocalStorage
