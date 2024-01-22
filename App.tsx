import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto"
import { Loading } from '@components/Loading';
import { NewGroup } from '@screens/NewGroup';
import { Groups } from '@screens/Groups';
import { Players } from '@screens/Players';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold }); //nessa posição temos acesso a um estado que fica observando se já carregou ou não (boolean) as fontes (carregamento assincono)
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  );
};
