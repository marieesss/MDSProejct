
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/welcome/Welcome';
import ProductDetail from './screens/details/ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Menu from './components/menu/Menu';

export default function App() {


  return (
       <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
