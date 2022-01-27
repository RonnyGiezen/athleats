import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "athleats_token"


export default class deviceStorage {
    static async hasJWT(){
        const token = await this.loadJWT();
        return token != null;
    }

    static saveKey(valueToSave) {
        return AsyncStorage.setItem(KEY, valueToSave)
            .catch((error) => {
                console.log('AsyncStorage Error: ' + error.message);
            });
    }

    static loadJWT() {
        return new Promise((resolve, fail) =>AsyncStorage.getItem(KEY).then(token => {
                console.log("inside loadJWT")
                console.log(token)
                resolve(token);
            })
            .catch((error) => {
                console.log('AsyncStorage Error: ' + error.message);
                fail(error);
            }));
    }

    static deleteJWT() {
        return AsyncStorage.removeItem(KEY)
            .catch((error) => {
                console.log('AsyncStorage Error: ' + error.message);
            });
    }

};
