import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import Welcome from './screens/welcome/Welcome';
import About from './screens/about/About';
import ProductDetail from './screens/details/ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Fermiers from './screens/Fermiers/Fermiers';
import FermierDetails from './screens/fermierdetails/FermiersDetails';
import Hubs from './screens/Hubs/Hubs';
import Login from './screens/Login/Login';
import UserProfile from './screens/UserProfile/UserProfile';
import {UserContext} from './components/useContext';
import LogoutButton from './components/logout';
import Commandes from './screens/Commandes/Commandes';
import CommandeDetails from './screens/Commande_details/commandeDetails';


const Drawer = createDrawerNavigator();

export default function NavigationApp() {
  const {user} = useContext(UserContext);



  return (
      <NavigationContainer>
        <Drawer.Navigator backBehavior="history" initialRouteName="Welcome" screenOptions={{
          drawerActiveBackgroundColor:"#BAC100",
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "#4A5D26"},
          drawerActiveTintColor:"white",
          drawerInactiveTintColor:"white",
          drawerStyle:{
            backgroundColor: "#4A5D26"
          }
        }}>
          <Drawer.Screen name="Welcome" component={Welcome} options={{ title: 'Nos producteurs locaux' }}/>
          <Drawer.Screen name="About" component={About} options={{ headerTitle:'Nos producteurs locaux' }}/>
          <Drawer.Screen name="Fermier" component={Fermiers} options={{ headerTitle:'Nos producteurs locaux' }}/>
          <Drawer.Screen name="Hubs" component={Hubs} options={{ headerTitle:'Nos producteurs locaux' }}/>
          {user ?
            <Drawer.Screen name="Profile" component={UserProfile} options={{ headerTitle:'Nos producteurs locaux' }}/>          
          : null}

          {user ? <Drawer.Screen name="Logout" component={LogoutButton} options={{title: 'Se déconnecter'}}/>
            : null}
            {user ? <Drawer.Screen name="Mes commandes" component={Commandes} options={{title: 'Nos producteurs locaux'}}/>
            : null}
            {!user ? <Drawer.Screen name="Se connecter" component={Login} options={{ headerTitle:'Nos producteurs locaux' }}/> : null} 
          <Drawer.Screen name="ProductDetail" component={ProductDetail} options={{
            drawerItemStyle: { height: 0 },
            headerTitle:'Nos producteurs locaux'
          }}/>
          <Drawer.Screen name="FermierDetails" component={FermierDetails} options={{
            drawerItemStyle: { height: 0 },
            headerTitle:'Nos producteurs locaux'
          }}/>
          <Drawer.Screen name="CommandeDetails" component={CommandeDetails} options={{
            drawerItemStyle: { height: 0 },
            headerTitle:'Nos producteurs locaux'
          }}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
