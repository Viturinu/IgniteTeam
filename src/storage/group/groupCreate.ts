import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupGetAll();
        const groupAlreadyExists = storedGroups.includes(newGroup);

        if (groupAlreadyExists) {
            throw new AppError()
        }
        const storage = JSON.stringify([...storedGroups, newGroup]);

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error
    }
}