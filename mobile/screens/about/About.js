import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity} from 'react-native'
import HeaderMenu from '../../components/header/Header';
import styles from './About.style'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




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

    <View style={styles.container2}>
    <View style={styles.card}>
        <View style={styles.circle}>
        <AntDesign name="star" size={15} color="white" />
          <Text style={styles.circleText}>Qualité</Text>
        </View>
        <Text style={styles.cardText}>Des produits et un service de qualité</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.circle}>
        <MaterialCommunityIcons name="package-variant-closed" size={20} color="white" />
          <Text style={styles.circleText}>Proximité</Text>
        </View>
        <Text style={styles.cardText}>Des produits issus d'une agriculture régionale</Text>
      </View>
     
    </View>

    <View style={styles.container2}>
    <View style={styles.card}>
        <View style={styles.circle}>
        <MaterialCommunityIcons name="hand-heart" size={15} color="white" />
          <Text style={styles.circleText}>Respect</Text>
        </View>
        <Text style={styles.cardText}>Des prix justes fixés par les producteurs</Text>
      </View>
     
    </View>

    <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Welcome");
      }}>
        <Text style={styles.buttonText}>Nos produits</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.title}>
          Vous ne pouvez pas vous faire livrer chez vous ? 
        </Text>

    <View style={styles.view1}>
      
      <View style={styles.view1child}>
        <Text>
          Nos producteurs locaux livrent vos commandes dans des hubs au choix afin que vous puissiez récupérer votre commande où vous voulez et quand vous voulez
        </Text>
        <View style={styles.view1}>

        <TouchableOpacity style={styles.button2} onPress={() => {
        navigation.navigate("Hubs");
      }}>
        <Text style={styles.buttonText}>Nos hubs</Text>
      </TouchableOpacity>
      </View>
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
