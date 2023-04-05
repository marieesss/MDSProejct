import React from 'react'
import styles from './header.style'
import { View, Text } from 'react-native'

const Header = () => {
  return (
    <View style={styles.container}>
     <Text style={styles.userName}>Hello</Text> 
    </View>
  )
}

export default Header
