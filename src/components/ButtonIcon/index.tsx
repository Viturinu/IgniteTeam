import React from "react";
import { TouchableOpacityProps } from "react-native";

import { ButtonIconTypeStyleProps, Container, Icon } from "./style";

type Props = TouchableOpacityProps & {
    type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon({ type = "PRIMARY", ...rest }: Props) {
    return (
        <Container {...rest}>
            <Icon name="home" type={type} />
        </Container>
    )
}