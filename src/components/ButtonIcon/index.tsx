import React from "react";
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

import { ButtonIconTypeStyleProps, Container, Icon } from "./style";

type Props = TouchableOpacityProps & {
    type?: ButtonIconTypeStyleProps;
    icon: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props) {
    return (
        <Container {...rest}>
            <Icon
                name={icon}
                type={type}
            />
        </Container>
    )
}