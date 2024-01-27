import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";

export async function groupRemoveByName(group: string) {
    try {
        const storageGroup = await groupGetAll();
        const filteredGroup = storageGroup.filter(groupItem => groupItem !== group);
        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filteredGroup));

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`); //remove porque vamos remover toda a chave de ${PLAYER_COLLECTION}-${group}, já acima não é dividido por chaves, logo tempos que remover apenas um item de uma chave (lembrando que esse item é uma string, então temos que converter em json, remover, depois reconverter em string pra setar novamente)

    } catch (error) {
        throw error;
    }
    0
}