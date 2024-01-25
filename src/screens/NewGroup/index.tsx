import React, { useState } from "react";
import { Container, Content, Icon } from "./style";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {

    const [group, setGroup] = useState("");

    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate("players", { group }); //posso passar assim, ao invés de passar group : group, typescript já identifica automaticamente se tiver mesmo nome
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