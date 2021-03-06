import { useEffect } from "react"
import { useDispatch } from "react-redux"
import asyncStorageMethods from "@bit/formidablepencil.react-native-reusables.async-storage-methods"
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

    /* player tag now will always be different */
    if (dirName === lsDirNames.playerTag) return furtherAction(dirName, type)

    if (locallyStored) dispatch({ type, payload: locallyStored })
    else furtherAction(dirName, type)
  }

  const furtherAction = async (dirName, type) => {
    switch (true) {
      case dirName === lsDirNames.playerTag:
        dispatch({ type, payload: generateRandomFruitName() })
        break;

      default:
        break;
    }
  }
}

const generateRandomFruitName = () => {
  let randomFruitName = getRandomFruitsName('en', { maxWords: 1 })
  if (randomFruitName.length > 12) generateRandomFruitName()
  else return randomFruitName
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
