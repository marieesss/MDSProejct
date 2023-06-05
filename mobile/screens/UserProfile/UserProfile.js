import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../../components/useContext';
import styles from './UserProfile.style'
import { useNavigation } from '@react-navigation/native';
import HeaderMenu from '../../components/header/Header';
import { Ionicons } from '@expo/vector-icons';




const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View>
    <HeaderMenu title={"Profil de " + user.username }/>
    {user ? (
      <View style={styles.container}>
      <Ionicons name="person-circle-sharp" size={36} color="#4A5D26" />
        <Text style={styles.text}>{user.username}</Text>
        <Ionicons name="mail" size={36} color="#4A5D26" style={{marginTop:20}}/>
        <Text style={styles.text}>{user.email}</Text>

        <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("UpdateUser");
      }}>
        <Text style={styles.buttonText}>Modifier mon profil</Text>
      </TouchableOpacity>
      </View> 
      <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Mes commandes");
      }}>
        <Text style={styles.buttonText}>Voir mes commandess</Text>
      </TouchableOpacity>
      </View> 
      </View>

    ) : (
      <Text style={styles.message}>Pas de données de l'utilisateur</Text>
    )}
  </View>
  );
};

export default UserProfile;
