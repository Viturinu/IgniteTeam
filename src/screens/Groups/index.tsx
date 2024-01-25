import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";

export function Groups() {

    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    function handleNewGroup() {
        try {
            //const navigation = useNavigation(); No need to use this hook, cause we can pass it through properties/parameters in our screens components parameters, as example above
            navigation.navigate("new");
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchGroups() {
        try {
            const data = await groupGetAll();
            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []));

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title="Turmas"
                subtitle="jogue com a sua turma"
            />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                    />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar a primeira turma?" />
                )}
                showsVerticalScrollIndicator={false}
            />
            <Button
                title="Criar nova turma"
                type="SECONDARY"
                onPress={handleNewGroup}
            />
        </Container>
    );
}
