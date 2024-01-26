
import React from "react";
import { useTheme } from "styled-components";

import { TextInput, TextInputProps } from "react-native";

import { Container } from "./style";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
    const { COLORS } = useTheme();

    return (
        <Container
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        />
    );
}