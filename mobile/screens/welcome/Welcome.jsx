import React, {useState, useEffect} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import axios from 'axios'
import Header from '../../components/header/Header'
import { useNavigation } from '@react-navigation/native';

import styles from './welcome.style'

const Welcome = () => {
  const [data, Setdata] = useState([]);
  const [dataLegume, SetDataLegume] = useState([]);
  const [dataFruit, SetdataFruit] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://10.57.132.20:5000/api/product`)
      .then(response => {
        console.log(response.data)
        Setdata(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://10.57.132.20:5000/api/product?category=fruit`)
      .then(response => {
        console.log(response.data)
        SetdataFruit(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://10.57.132.20:5000/api/product?category=legume`)
      .then(response => {
        console.log(response.data)
        SetDataLegume(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

const renderItemFruit = (data) => {
  return (
      <TouchableOpacity style={{height: 150}} onPress={() => {
        navigation.navigate("ProductDetail", {_id : data.item._id});
      }}>
        <View style={styles.split}>
          <Image source={{uri: data.item.img}}
            style={{width: 100, height: 100}}
          />
        </View>
        <View>
          <Text style={styles.lightText}>{data.item.title}</Text>
          <Text style={styles.lightText}>{data.item.price}</Text>
        </View>
      </TouchableOpacity>
  )

}


  return (
    <View>
    <Header/>
    <ScrollView showsVerticalScrollIndicator={false} >
  <View style={styles.container}>
  <Text style={styles.welcomeMessage}> Catalogue</Text>
  
  <View style={styles.banner}>
  <Text style={styles.textBanner}>Fruits</Text>
  </View>
  <FlatList
    data={dataFruit}
    horizontal={true}
    renderItem={item => renderItemFruit(item)}
    keyExtractor={item => item._id.toString()}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={styles.categorie}
  />

<View style={styles.banner}>
  <Text style={styles.textBanner}>Légumes</Text>
  </View>
  <FlatList
    data={dataLegume}
    horizontal={true}
    renderItem={item => renderItemFruit(item)}
    keyExtractor={item => item._id.toString()}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={styles.categorie}
  />


<View style={styles.banner}>
  <Text style={styles.textBanner}>Tout les produits</Text>
  </View>

  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center' 
    }}>
  {data.map(data => (
    <TouchableOpacity key={data._id} onPress={() => {
        navigation.navigate("ProductDetail", {_id : data._id});
      }}>
    <View style={styles.product}  > 
      
      <Image source={{uri: data.img}}
            style={{width: 80, height: 80}}
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

export default Welcome