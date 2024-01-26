import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./style";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";
import { AppError } from "@utils/AppError";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

type RouteParams = {
    group: string;
}

export function Players() {

    const [team, setTeam] = useState("Time A")
    const [newPlayerName, setNewPlayerName] = useState("");
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRed = useRef<TextInput>();

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert("Nova pessoa", "Informe o nome da pessoa para adicionar");
        }

        const playersByGroup = await playerGetByGroup(group);
        if ((playersByGroup.filter(player => player.name === newPlayerName)).length > 0) return Alert.alert("Player existente", "Este player já existe no time");

        const playerObject: PlayerStorageDTO = {
            name: newPlayerName,
            time: team
        };

        try {
            await playerAddByGroup(playerObject, group);

            newPlayerNameInputRed.current.blur(); //tira o foco pela referência do componente

            setNewPlayerName("");
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Nova pessoa", error.message);
            }
            else {
                console.log(error);
                Alert.alert("Nova pessoa", "Não foi possível adicionar");
            }
        }
    }

    async function handlePlayerRemove(player: string, group: string) {
        try {
            await playerRemoveByGroup(player, group);
            //fetchPlayersByTeam(); como dito na outra função, já estamos atualizando a lista pela useEffect, em seu array de dependências
        } catch (error) {
            Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa")
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playerGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam); //atualizando estado dos players//muito importante para statement abaixo
            //fetchPlayersByTeam(); // podemos chamar aqui a função fetch de novo, como o Rodrigo fez na aula, mas preferi pelo array de dependências do useEffect()
        } catch (error) {
            throw error;
        }

    }

    useEffect(() => {
        fetchPlayersByTeam(); //atualizando o estado de players quando mudarmos o estado de team;
    }, [team, players])

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRed}
                    placeholder="Nome da pessoa"
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>
            <HeaderList>
                <FlatList
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name, group)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time"
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />
            <Button
                title="Remover Turma"
                type="SECONDARY"
            />
        </Container>
    )
}