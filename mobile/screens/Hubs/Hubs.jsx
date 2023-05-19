import React, {useState, useEffect} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import axios from 'axios'
import Header from '../../components/header/Header'
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';




import styles from './Hubs.style'

const Hubs = () => {
  const BASE_URL = process.env.BASE_URL
  const [data, Setdata] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://${BASE_URL}:5000/api/hub`)
      .then(response => {
        console.log(response.data)
        Setdata(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const Navigate =()=>{
    
  }


  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false} >
  <View style={styles.container}>
  <View style={styles.titleRow}>

  <Text style={styles.welcomeMessage}> Nos hubs</Text>
  <Image source={require('../../assets/img/logo.png')} style={styles.img}/>
  </View>
 


  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center' 
    }}>
  {data.map(data => (
    <View style={styles.product}  > 
    <Text>{data.name}</Text>
    <Text>{data.adress}</Text>
    <TouchableOpacity 
  style={{height: 150}} 
  onPress={() => {
    const url = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
    Linking.openURL(url);
}}>
          <View style={styles.product}>
          <Image source={require('../../assets/img/exportation.png')} style={styles.back}/>
          </View>
        </TouchableOpacity>
    </View>
  ))}
  </View>
  </View>
  </ScrollView>
  </View>


  )
}

export default Hubs