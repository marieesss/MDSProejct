
import React, {useState, useEffect} from 'react'
import { View,Text, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native'
import axios from 'axios';
import styles from './productDetail.style';
import HeaderMenu from "../../components/header/Header"


const ProductDetail = ({ navigation, route }) => {
  const BASE_URL = process.env.BASE_URL
    const [product, setProduct] = useState({});
    const [fermierId, setFermierId] = useState("");
    const [fermier, setFermier] = useState({});
    const [products, setProducts] = useState([]);


    // méthode pour récupérer le détail des produits
    useEffect(()=>{
        const getProduct = async ()=> {
          try{
            const res = await axios.get(`https://${BASE_URL}.fr/api/product/find/`+route.params._id);
            setProduct(res.data)
            setFermierId(res.data.fermierId)
            
          }catch(err){
            console.log("erreur")
          }
        };
        getProduct();
    }, [route.params])

    // récupération des données du fermier
    useEffect(()=>{
        const getFermier = async ()=> {
          try{
            const res = await axios.get(`https://${BASE_URL}.fr/api/fermier/find/`+fermierId);
            setFermier(res.data)  
          }catch(err){
            console.log("erreur")
          }
        };
        getFermier();
    }, [fermierId])

        // récupération des autres produits du fermier
    useEffect(()=>{
      const getProducts = async ()=> {
        try{
          const res = await axios.get(`https://${BASE_URL}.fr/api/product?fermier=`+fermierId);
          setProducts(res.data)

          
        }catch(err){
          console.log("erreur")
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
        <HeaderMenu title={product.title}/>

            <View style={styles.row}>
                <Image source={{uri: product.img}}
            style={{width: 200, height: 200, borderRadius:15}}
            />
              <View style={styles.row}>
                <Text style={styles.desc}> {product.price} €/kg</Text>
                <Text style={styles.desc}> {product.desc}</Text>
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

                <View style={styles.titleRow}>
                      <Text style={styles.welcomeMessage}>Rencontrez le fermier </Text>
                </View>
            

                <View style={styles.row}>
                <TouchableOpacity key={fermier._id} onPress={() => {
        navigation.navigate("FermierDetails", {_id : fermier._id});
      }}>
                      <Image source={{uri: fermier.img}}
                    style={{width: 200, height: 200, borderRadius:15}}
                    />
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.name}> {fermier.name}</Text>
                    <Text style={styles.text}> {fermier.desc}</Text>
                    </View>
                    
                </View>
                
            
           
        </ScrollView>
    </View>
  )
}

export default ProductDetail
