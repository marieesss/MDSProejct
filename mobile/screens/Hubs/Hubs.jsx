import React, {useState, useEffect} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';



import styles from './Hubs.style'
import HeaderMenu from '../../components/header/Header';

const Hubs = () => {
  const BASE_URL = process.env.BASE_URL
  const [data, Setdata] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`https://${BASE_URL}.fr/api/hub`)
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


  <HeaderMenu title="Nos hubs"/>
 


  <View style={{
    flexDirection: 'column',
    alignItems:'center',
    flex:1
    }}>

    <Text style={styles.explications}> Découvrez nos différents points de livraisons diponibles </Text>
  {data.map(data => (
  <View key={data._id} style={styles.hub}>
    <View>  
  <Text style={styles.name}>{data.name}</Text>
  <Text>{data.adress}</Text>
  <Text>{data.ville}</Text>
  <Text>{data.code}</Text>
  </View>  

  <View>
    <TouchableOpacity 
  onPress={() => {
    const url = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
    Linking.openURL(url);
}}>
          <EvilIcons name="external-link" size={40} color="#4A5D26" />
        </TouchableOpacity>
        </View>
    </View>
  ))}
  </View>
  </ScrollView>
  </View>


  )
}

export default Hubs