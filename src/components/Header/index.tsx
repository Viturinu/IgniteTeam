import React from "react";
import { Container, Logo } from "./style";
import LogoImg from "@assets/logo.png"

export function Header() {
    return (
        <Container>
            <Logo source={LogoImg} />
        </Container>
    )
}