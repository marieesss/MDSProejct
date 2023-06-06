import React, { useContext } from 'react';
import { Button } from 'react-native';
import { UserContext } from './useContext';
import { Linking } from 'react-native';

const LogoutButton = () => {
  const { dispatch, user } = useContext(UserContext);

  const handlePress = () => {
    Linking.openURL("https://web.nossproducteurslocaux.fr/");
  };

  return (
    <Button title="Se déconnecter" onPress={handlePress} />
  );
};

export default LogoutButton;