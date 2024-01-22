import React from "react";
import { Container, Icon, Title } from "./style";


type Props = {
    title: string;

}
export function GroupCard({ title, ...rest }: Props) {
    return (
        <Container>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container >
    )
}