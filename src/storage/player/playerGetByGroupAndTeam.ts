import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerGetByGroupAndTeam(group: string, team: string) {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
        const playersByTeam = players.filter(player => player.time === team); //vai retornar todos daquele time específico

        return playersByTeam;
    } catch (error) {
        throw error;
    }
}