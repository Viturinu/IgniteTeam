import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native"

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
    type: ButtonTypeStyleProps;
}

export const Container = styled.TouchableOpacity<Props>`
    height: 56px;

    min-height: 56 px;
    max-height: 56 px;

    background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

    border-radius: 6px;

    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
    `}; 
`;