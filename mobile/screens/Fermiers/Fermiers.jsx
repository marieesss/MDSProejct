import React, {useState, useEffect} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import axios from 'axios'
import Header from '../../components/header/Header'
import { useNavigation } from '@react-navigation/native';
import HeaderMenu from "../../components/header/Header"



import styles from './fermiers.style'

const Fermiers = () => {
  const BASE_URL = process.env.BASE_URL
  const [data, Setdata] = useState([]);
  const navigation = useNavigation();

  //récupération des fermiers
  useEffect(() => {
    axios.get(`https://${BASE_URL}.fr/api/fermier`)
      .then(response => {
        Setdata(response.data);
        
      })
      .catch(error => {
        console.log("erreur");
      });
  }, []);


  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false} >
  <View style={styles.container}>

  
  <HeaderMenu title="Nos producteurs"/>

 
<View style={styles.banner}>
  <Text style={styles.textBanner}>Tous engagés pour un avenir plus sain !</Text>
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