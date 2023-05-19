import React from 'react'
import styles from './header.style'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const HeaderMenu = (props) => {

  const navigation = useNavigation();


  return (
    <><View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/img/back.png')} style={styles.back} />
      </TouchableOpacity>
    </View><View style={styles.titleRow}>
        <Text style={styles.welcomeMessage}> {props.title}</Text>
        <Image source={require('../../assets/img/logo.png')} style={styles.img} />
      </View></>
  )
}

export default HeaderMenu
