import React from 'react'
import styles from './header.style'
import { View, Text, Image } from 'react-native'

const Header = () => {
  return (
    <View style={styles.container}>
     <Image source={require('../../assets/img/logo.png')} style={styles.img}/>
    </View>
  )
}

export default Header
