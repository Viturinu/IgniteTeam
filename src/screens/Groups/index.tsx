import React, { useState } from "react";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Groups({ navigation }) {

    const [groups, setGroups] = useState<string[]>([]);

    function handleNewGroup() {
        //const navigation = useNavigation(); No need to use this hook, cause we can pass it through properties/parameters in our screens components parameters, as example above
        navigation.navigate("new");
    }

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
