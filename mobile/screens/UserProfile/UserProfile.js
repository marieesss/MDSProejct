import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../../components/useContext';
import styles from './UserProfile.style'
import { useNavigation } from '@react-navigation/native';



const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Mon profile</Text>
    {user ? (
      <View>
        <Text style={styles.label}>Nom d'utilisateur:</Text>
        <Text style={styles.text}>{user.username}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{user.email}</Text>

        <TouchableOpacity onPress={() => {
        navigation.navigate("UpdateUser");
      }}> 
            <View>
              <Text> Modifier mon profil </Text>
            </View>
        </TouchableOpacity> 
      </View>

    ) : (
      <Text style={styles.message}>No user data available</Text>
    )}
  </View>
  );
};

export default UserProfile;
