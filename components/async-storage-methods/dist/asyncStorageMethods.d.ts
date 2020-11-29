export declare const asyncStorageMethods: {
    storeToLocalStorage: (storeTo: any, whatData: any) => Promise<void>;
    getLocallyStoredData: (getFrom: any) => Promise<any>;
    validateAndUpdateData: (data: any, dirName: any) => Promise<string>;
};
export default asyncStorageMethods;
