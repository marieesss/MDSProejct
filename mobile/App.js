import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { UserProvider} from './components/useContext';
import NavigationApp from './Navigation';



export default function App() {
  const [fontsLoaded] = useFonts({
    'Josefin': require('./assets/fonts/JosefinSans-Regular.ttf'),
    'Avenir': require('./assets/fonts/Avenir-Regular.ttf'),
  });


  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationApp/>
    </UserProvider>
  );
}
