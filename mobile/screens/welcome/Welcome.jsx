import React, {useState, useEffect, useContext} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import axios from 'axios'
import Header from '../../components/header/Header'
import { useNavigation } from '@react-navigation/native';
import HeaderMenu from '../../components/header/Header';
import {UserContext} from '../../components/useContext';



import styles from './welcome.style'

const Welcome = () => {
  const [data, Setdata] = useState([]);
  const [dataLegume, SetDataLegume] = useState([]);
  const [dataFruit, SetdataFruit] = useState([]);
  const navigation = useNavigation();
  const {user} = useContext(UserContext);

  const BASE_URL = process.env.BASE_URL

  useEffect(() => {
    axios.get(`https://${BASE_URL}.fr/api/product`)
      .then(response => {
        Setdata(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://${BASE_URL}.fr/api/product?category=fruit`)
      .then(response => {
        SetdataFruit(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://${BASE_URL}.fr/api/product?category=legume`)
      .then(response => {
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
        <View style={styles.product}>
          <Image source={{uri: data.item.img}}
            style={{width: 100, height: 100, borderRadius:15}}
          />
        </View>
      </TouchableOpacity>
  )

}


  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false} >
    {user ? 
    <View>
      <HeaderMenu title={"Bienvenue " + user.username }/>
    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}> 
    <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Profile");
      }}>
        <Text style={styles.buttonText}>Mon profil</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Mes commandes");
      }}>
        <Text style={styles.buttonText}>Mes commandes</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("UpdateUser");
      }}>
        <Text style={styles.buttonText}>Modifier mon profil</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.view1}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Hubs");
      }}>
        <Text style={styles.buttonText}>Nos hubs</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </View> :    <HeaderMenu title="Catalogue"/>}
 
  <View style={styles.container}>
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

export default Welcome