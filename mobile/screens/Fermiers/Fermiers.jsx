import React, {useState, useEffect} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import axios from 'axios'
import Header from '../../components/header/Header'
import { useNavigation } from '@react-navigation/native';


import styles from './fermiers.style'

const Fermiers = () => {
  const BASE_URL = process.env.BASE_URL
  const [data, Setdata] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://${BASE_URL}:5000/api/fermier`)
      .then(response => {
        console.log(response.data)
        Setdata(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false} >
  <View style={styles.container}>
  <View style={styles.titleRow}>
  <Text style={styles.welcomeMessage}> Catalogue</Text>
  <Image source={require('../../assets/img/logo.png')} style={styles.img}/>
  </View>
 
<View style={styles.banner}>
  <Text style={styles.textBanner}>Tout les fermiers</Text>
  </View>

  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center' 
    }}>
  {data.map(data => (
    <TouchableOpacity key={data._id} onPress={() => {
        navigation.navigate("FermierDetails", {_id : data._id});
      }}>
    <View style={styles.product}  > 
      
      <Image source={{uri: data.img}}
            style={{width: 90, height: 90, borderRadius:15}}
            />
    </View>
    </TouchableOpacity>
  ))}
  </View>
  </View>
  </ScrollView>
  </View>


  )
}

export default Fermiers