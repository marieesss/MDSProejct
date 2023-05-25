import React from 'react'
import { View, ScrollView, Text, Image} from 'react-native'
import HeaderMenu from '../../components/header/Header';
import styles from './About.style'



const About = () => {
  return (
    <ScrollView>
    <View style={styles.container}> 
    <HeaderMenu title="Qui sommes nous ?"/>

    <View style={styles.view1}>
      <Image source={require('../../assets/img/panierhome.png')} style={styles.img}/>
      <View>
        <Text>
        Ici, la qualité, la proximité et la personnalisation sont nos maîtres mots pour vous offrir une expérience unique. Une solution innovante pour soutenir les producteurs locaux et consommer des produits frais et de saison.
        </Text>
      </View>
    </View>
      
      </View>
    </ScrollView>
  )
}

export default About
