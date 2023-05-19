import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../components/useContext';
import styles from './UserProfile.style'


const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>User Profile</Text>
    {user ? (
      <View>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.text}>{user.username}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
    ) : (
      <Text style={styles.message}>No user data available</Text>
    )}
  </View>
  );
};

export default UserProfile;
