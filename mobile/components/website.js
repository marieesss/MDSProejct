import React, { useContext } from 'react';
import { Button } from 'react-native';
import { UserContext } from './useContext';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const WebsiteButton = () => {
  const navigation = useNavigation();

    Linking.openURL("https://web.nossproducteurslocaux.fr/")
    navigation.navigate('Welcome')


};

export default WebsiteButton;