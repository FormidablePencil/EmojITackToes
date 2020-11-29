import { AsyncStorage } from "react-native"

export const asyncStorageMethods = {
  storeToLocalStorage: async function (storeTo, whatData) {
    try {
      const stringifiedData = JSON.stringify(whatData)
      await AsyncStorage.setItem(storeTo.toString(), stringifiedData)
    } catch (err) {
      console.warn(err)
    }
  },
  getLocallyStoredData: async function (getFrom) {
    const localStorageString = await AsyncStorage.getItem(getFrom)
    return JSON.parse(localStorageString)
  },
  validateAndUpdateData: async function (data, dirName) {
    const localStorageResponse = await this.getLocallyStoredData(dirName)
    if (localStorageResponse === null || data !== localStorageResponse) {
      this.storeToLocalStorage(dirName, data)
      return 'cached data'
    } else {
      return `${dirName} updated`
    }
  },
}

export default asyncStorageMethods
