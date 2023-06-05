
import React, {useState, useEffect, useContext} from 'react'
import { View,Text, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native'
import axios from 'axios';
import { UserContext } from '../../components/useContext';
import styles from './commandeDetails.style'
import HeaderMenu from "../../components/header/Header"
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const CommandeDetails = ({ navigation, route }) => {
  const BASE_URL = process.env.BASE_URL
  const [informations, setInformations]= useState({})
  const [productsId, setproductsId]= useState()
  const [productsListe, setproducts]= useState([])
  const [callFunction, setCallFunction]= useState(true)
  const [hubId, setHubId]= useState("")
  const [hub, setHub]= useState([])


  const { user } = useContext(UserContext);


    const getOrder = async () => {
        try {
          const res = await axios.get(`https://${BASE_URL}.fr/api/order/findOrder/${route.params._id}/${user.id}`, 
             {
                headers: { token: `Bearer ${user.token}`,
                userid: `Bearer ${user.id}`}
             });
             setInformations(res.data[0])
             setproductsId(res.data[0].products)
             setHubId(res.data[0].hubId)
             

        } catch (error) {
          console.log(error)
        }

      };

      const getHub = async () => {
          try {
            const res = await axios.get(`https://${BASE_URL}.fr/api/hub/find/${hubId}`);
               setHub(res.data[0])
               console.log(res.data[0])
          } catch (error) {
            console.log(error)
          }
  
        };

      const getProducts = async () => {
        
        const products =[]
  
            for(let i=0; i<productsId.length; i++) {
                try {
                          const res = await axios.get(`https://${BASE_URL}.fr/api/product/find/${productsId[i].productId}`, 
                            {
                                headers: { token: `Bearer ${user.token}` }
                            });
                            products.push({product : res.data, quantity : productsId[i].quantity})
                            console.log(products)
                            
                        } catch (error) {
                          console.log(error)
                        }
          }
          setproducts(products)
          
          
        }

      useEffect(() => {
        if (callFunction) {
          getOrder();
          setCallFunction(false)
        }
      }, [route.params._id]);

      useEffect(()=>{
        getProducts()
      }, [productsId])
 

      useEffect(()=>{
        getHub()
      }, [hubId])

  return (
    <View style={{flex: 1}}>
        <ScrollView>
       <HeaderMenu title="Détails de la commande"/>

       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    {productsListe.map(product=> (
      <View style={styles.product}>
        <View>
        <Image source={{uri: product.product.img}}
            style={{width: 90, height: 90, borderRadius:15}}
            />
      </View>
        <View>
          <Text>
            {product.product.title}
        </Text>
        <Text>
            {product.product.price} € x {product.quantity}
        </Text>
      </View>
      </View>
    ))}

    <View style={{width:"100%", padding: 15}}> 
      <Text style={styles.paiement}> Paiement </Text>
      <View style={styles.line}></View>
      <View style={styles.infopaiement}>
      <View style={styles.column}>
      <Text style={{fontSize:16, marginBottom:4}}> {informations.amount}  €</Text>
      <Text style={{fontSize:12}}> TVA 20% : {(informations.amount*0.2).toFixed(2)} </Text>
      {informations.amount < 50 ? 
        <Text style={{fontSize:12}}> Livraison 3,99 € </Text>
      :
      <Text style={{fontSize:12}}> Livraison gratuite </Text>
      }
      
      </View>
      
      <TouchableOpacity 
  onPress={() => {
    const url = informations.receipt_url;
    Linking.openURL(url);
}}>
    <View style={styles.button}>
      <Text style={{color: "white", fontSize:15}}> Voir le reçu </Text>
    </View>
    </TouchableOpacity>

   

    </View>
    <View style={{marginTop:6, justifyContent:"center", flexDirection:"row", alignItems:"center"}}> 
    <MaterialCommunityIcons name="information" size={24} color="black" />
     <Text style={{paddingLeft:5, fontSize:11}}>Votre reçu est disponible jusqu'à 30 après le paiement</Text>
    </View>
    </View>

   <View style={{width:"100%", padding: 15}}> 
<Text style={styles.paiement}> Livraison </Text>
<View style={styles.line}></View>
<View style={styles.infopaiement}>
      <View style={styles.column}>
      <Text> {hub.name}</Text>
      <Text> {hub.adress}</Text>
      <Text> {hub.ville}</Text>
      <Text> {hub.code}</Text>
      </View>

      <TouchableOpacity 
  onPress={() => {
    const url = `https://www.google.com/maps/search/?api=1&query=${hub.latitude},${hub.longitude}`;
    Linking.openURL(url);
}}>
      <View style={styles.button}>
      <Text style={{color: "white"}}> Voir l'adresse</Text>
    </View>
    </TouchableOpacity>
   
    </View>
 
    </View>

</View> 


        
        </ScrollView>
    </View>
  )
}

export default CommandeDetails
