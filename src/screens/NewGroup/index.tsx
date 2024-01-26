import React, { useState } from "react";
import { Container, Content, Icon } from "./style";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {

    const [group, setGroup] = useState("");

    const navigation = useNavigation();

    async function handleNewGroup() {
        try {
            if (group.trim().length === 0) return Alert.alert("Novo grupo", "Informe o nome da turma");
            await groupCreate(group); //throw CreatedClass(AppError) está em um if no groupCreate.ts; assim tratamos as excessões do nosso app
            navigation.navigate("players", { group }); //posso passar assim, ao invés de passar group : group, typescript já identifica automaticamente se tiver mesmo nome
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Novo grupo", error.message);
                console.log(error);
            }
            else {
                Alert.alert("Novo grupo", "Não foi possível criar um novo grupo.");
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />

                <Input
                    placeholder="Nome da turma"
                    onChangeText={e => setGroup(e)} //só pra lembrar que é isso que acontece por debaixo dos panos
                />

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleNewGroup}
                />
            </Content>
        </Container>
    )
}