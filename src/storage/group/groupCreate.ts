import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupGetAll(); //resgata para fazer testes e lançar excessões
        const groupAlreadyExists = storedGroups.includes(newGroup); //verifica se o nome passado para criação já existe dentro do resgate feito na linha anterior

        if (groupAlreadyExists) throw new AppError("Já existe um grupo cadastrado com esse nome"); //se existir, groupAlreadyExists = true, lança erro e é capturado lá no catch da função chamadora (este try catch aqui não tem a ver com essa excessão mandada, e sim o try catch lá da função chamadora)

        const storage = JSON.stringify([...storedGroups, newGroup]); //adicionando o newGroup passado, se não entrar no if anterior, e pegando tb os já existentes com operador rest

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error
    }
}