import React, { useContext } from 'react';
import { Button } from 'react-native';
import { UserContext } from './useContext';

const LogoutButton = () => {
  const { dispatch, user } = useContext(UserContext);

  return (
    <Button title="Se déconnecter" onPress={dispatch({ type: 'LOGOUT' })} />
  );
};

export default LogoutButton;