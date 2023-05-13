import { View, Image} from 'react-native';
import 'react-native-gesture-handler';
import Welcome from './screens/welcome/Welcome';
import About from './screens/about/About';
import ProductDetail from './screens/details/ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import { useFonts } from 'expo-font';
import Fermiers from './screens/Fermiers/Fermiers';
import FermierDetails from './screens/fermierdetails/FermiersDetails';
import Hubs from './screens/Hubs/Hubs';



export default function App() {
  const [fontsLoaded] = useFonts({
    'Josefin': require('./assets/fonts/JosefinSans-Regular.ttf'),
    'Avenir': require('./assets/fonts/Avenir-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator  backBehavior="history" initialRouteName="Welcome" screenOptions={{
        drawerActiveBackgroundColor:"#BAC100",
        headerTintColor: 'white',
        headerStyle: {backgroundColor: "#4A5D26"},
        drawerActiveTintColor:"white",
        drawerInactiveTintColor:"white",
        drawerStyle:{
          backgroundColor: "#4A5D26"
        }}}>
         <Drawer.Screen name="Welcome" component={Welcome}  options={{ title: 'Nos producteurs locaux' }}/>
         <Drawer.Screen name="About" component={About} options={{ headerTitle:'Nos producteurs locaux' }}/>
         <Drawer.Screen name="Fermier" component={Fermiers} options={{ headerTitle:'Nos producteurs locaux' }}/>
         <Drawer.Screen name="Hubs" component={Hubs} options={{ headerTitle:'Nos producteurs locaux' }}/>

        <Drawer.Screen name="ProductDetail" component={ProductDetail} options={{
    drawerItemStyle: { height: 0 },
    headerTitle:'Nos producteurs locaux'
  }}/>
      <Drawer.Screen name="FermierDetails" component={FermierDetails} options={{
    drawerItemStyle: { height: 0 },
    headerTitle:'Nos producteurs locaux'
  }}/>
       </Drawer.Navigator>
    </NavigationContainer>
  
  );
}
