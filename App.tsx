import { Groups } from '@screens/Groups';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Groups />
    </>
  );
};
