
import React from "react";
import { useTheme } from "styled-components";

import { TextInputProps } from "react-native";

import { Container } from "./style";


export function Input({ ...rest }: TextInputProps) {
    const { COLORS } = useTheme();

    return (
        <Container
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        />
    );
}