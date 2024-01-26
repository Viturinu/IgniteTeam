import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "../storageConfig";

export async function groupGetAll() {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
        const groups: string[] = storage ? JSON.parse(storage) : [];

        return groups; //retorna o JSON

    } catch (error) {
        throw error
    }
}