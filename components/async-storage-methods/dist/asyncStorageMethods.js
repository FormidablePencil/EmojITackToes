var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncStorage } from "react-native";
export const asyncStorageMethods = {
    storeToLocalStorage: function (storeTo, whatData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stringifiedData = JSON.stringify(whatData);
                yield AsyncStorage.setItem(storeTo.toString(), stringifiedData);
            }
            catch (err) {
                console.warn(err);
            }
        });
    },
    getLocallyStoredData: function (getFrom) {
        return __awaiter(this, void 0, void 0, function* () {
            const localStorageString = yield AsyncStorage.getItem(getFrom);
            return JSON.parse(localStorageString);
        });
    },
    validateAndUpdateData: function (data, dirName) {
        return __awaiter(this, void 0, void 0, function* () {
            const localStorageResponse = yield this.getLocallyStoredData(dirName);
            if (localStorageResponse === null || data !== localStorageResponse) {
                this.storeToLocalStorage(dirName, data);
                return 'cached data';
            }
            else {
                return `${dirName} updated`;
            }
        });
    },
};
export default asyncStorageMethods;
