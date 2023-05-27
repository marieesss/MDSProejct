import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity} from 'react-native'
import HeaderMenu from '../../components/header/Header';
import styles from './About.style'
import { useNavigation } from '@react-navigation/native';




const About = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
    <View style={styles.container}> 
    <HeaderMenu title="Qui sommes nous ?"/>

    <View style={styles.view1}>
      <View style={styles.view1child}>
      <Image source={require('../../assets/img/biglogo.png')} style={styles.img}/>
      </View>
      <View style={styles.view1child}>
        <Text style={styles.bigStyle}>
        Des produits frais, issus d’une agriculture responsable
        </Text>
      </View>
    </View>

    <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Welcome");
      }}>
        <Text style={styles.buttonText}>Nos produits</Text>
      </TouchableOpacity>
      </View>


    <View style={styles.view1}>
      
      <View style={styles.view1child}>
        <Text>
        Ici, la qualité, la proximité et la personnalisation sont nos maîtres mots pour vous offrir une expérience unique. Une solution innovante pour soutenir les producteurs locaux et consommer des produits frais et de saison.
        </Text>
      </View>
      <View style={styles.view1child}>
      <Image source={require('../../assets/img/legumes.jpg')} style={styles.img2}/>
      </View>
    </View>
      
      </View>
    </ScrollView>
  )
}

export default About
