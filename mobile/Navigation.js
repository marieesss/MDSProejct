import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import Welcome from './screens/welcome/Welcome';
import About from './screens/about/About';
import ProductDetail from './screens/details/ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Fermiers from './screens/Fermiers/Fermiers';
import FermierDetails from './screens/fermierdetails/FermiersDetails';
import Hubs from './screens/Hubs/Hubs';
import Login from './screens/Login/Login';
import UserProfile from './screens/UserProfile/UserProfile';
import {UserContext} from './components/useContext';
import LogoutButton from './components/logout';
import Commandes from './screens/Commandes/Commandes';
import CommandeDetails from './screens/Commande_details/commandeDetails';
import UpdateUser from './screens/UpdateUser/UpdateUser';
import Register from './screens/Register/Register';
import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import WebsiteButton from './components/website';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Site web"
        onPress={(()=>Linking.openURL('https://web.nossproducteurslocaux.fr/'))}
        labelStyle={{ color: 'white' }}
      />
       <DrawerItem
        label="Mentions légales"
        onPress={(()=>Linking.openURL('https://web.nossproducteurslocaux.fr/mentions-l%C3%A9gales'))}
        labelStyle={{ color: 'white' }}
      />
    </DrawerContentScrollView>
  );
}

export default function NavigationApp() {
  const {user} = useContext(UserContext);



  return (
      <NavigationContainer>
        <Drawer.Navigator 
        //appelle la fonction pour afficher la liste 
        drawerContent={CustomDrawerContent}
        backBehavior="history" initialRouteName="Welcome" screenOptions={{
          drawerActiveBackgroundColor:"#BAC100",
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "#4A5D26"},
          drawerActiveTintColor:"white",
          drawerInactiveTintColor:"white",
          drawerStyle:{
            backgroundColor: "#4A5D26"
          }
        }} 
        >
          <Drawer.Screen name="Welcome" component={Welcome} options={{ title: 'Nos producteurs locaux' }}/>
          <Drawer.Screen name="About" component={About} options={{ headerTitle:'Nos producteurs locaux' }}/>
          <Drawer.Screen name="Fermier" component={Fermiers} options={{ headerTitle:'Nos producteurs locaux',
          title:"Nos producteurs" }}/>
          <Drawer.Screen name="Hubs" component={Hubs} options={{ headerTitle:'Nos producteurs locaux' }}/>
          {user ?
            <Drawer.Screen name="Mon profil" component={UserProfile} options={{ headerTitle:'Nos producteurs locaux' }}/>          
          : null}

          {user ? <Drawer.Screen name="Logout" component={LogoutButton} options={{title: 'Se déconnecter'}}/>
            : null}
            {user ? <Drawer.Screen name="Mes commandes" component={Commandes} options={{headerTitle: 'Nos producteurs locaux'}}/>
            : null}
            {!user ? <Drawer.Screen name="Connexion" component={Login} options={{ headerTitle:'Nos producteurs locaux' }}/> : null} 
            {!user ? <Drawer.Screen name="S'inscrire" component={Register} options={{ headerTitle:'Nos producteurs locaux' }}/> : null} 
          
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
          <Drawer.Screen name="UpdateUser" component={UpdateUser} options={{
            drawerItemStyle: { height: 0 },
            headerTitle:'Nos producteurs locaux'
          }}/>

        </Drawer.Navigator>
      </NavigationContainer>
  );
}
