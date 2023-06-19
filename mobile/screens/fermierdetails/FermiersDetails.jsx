
import React, {useState, useEffect} from 'react'
import { View,Text, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native'
import axios from 'axios';
import styles from './fermiersDetails.style'
import HeaderMenu from '../../components/header/Header';



const FermierDetails = ({ navigation, route }) => {
  const BASE_URL = process.env.BASE_URL
    const [fermierId, setFermierId] = useState("");
    const [fermier, setFermier] = useState({});
    const [products, setProducts] = useState([]);

    console.log(route.params._id)

    useEffect(()=>{
        const getProduct = async ()=> {
          try{
            const res = await axios.get(`https://${BASE_URL}.fr/api/fermier/find/`+ route.params._id);
            // console.log(res.data)
            setFermier(res.data)
            setFermierId(res.data._id)

            
          }catch(err){
            console.log(err)
          }
        };
        getProduct();
        
    }, [route.params._id])

    useEffect(()=>{
      const getProducts = async ()=> {
        try{
          const res = await axios.get(`https://${BASE_URL}.fr/api/product?fermier=`+fermierId);
          // console.log(res.data)
          setProducts(res.data)

          
        }catch(err){
          console.log(err)
        }
      };
      getProducts();
     
    
      
  }, [fermierId])

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
    <View style={{flex: 1}}>
        <ScrollView>
        <HeaderMenu title={fermier.name}/>
            <View style={styles.row}>
                <Image source={{uri: fermier.img}}
            style={{width: 200, height: 200, borderRadius:15}}
            />
            <View>
                <Text style={styles.text}> {fermier.desc} </Text>
              </View>
            </View>

            <View style={styles.titleRow}>
                      <Text style={styles.welcomeMessage}> Autres produits du fermier </Text>
                </View>

                <FlatList
                  data={products}
                  horizontal={true}
                  renderItem={item => renderItemFruit(item)}
                  keyExtractor={item => item._id.toString()}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={styles.categorie}
                />
                
            
           
        </ScrollView>
    </View>
  )
}

export default FermierDetails
