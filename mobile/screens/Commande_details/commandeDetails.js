
import React, {useState, useEffect, useContext} from 'react'
import { View,Text, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native'
import axios from 'axios';
import { UserContext } from '../../components/useContext';
import styles from './commandeDetails.style'
import HeaderMenu from "../../components/header/Header"


const CommandeDetails = ({ navigation, route }) => {
  const BASE_URL = process.env.BASE_URL
  const [informations, setInformations]= useState({})
  const [productsId, setproductsId]= useState()
  const [productsListe, setproducts]= useState([])
  const { user } = useContext(UserContext);


    const getOrder = async () => {
  
        try {
          const res = await axios.get(`http://${BASE_URL}:5000/api/order/findOrder/${route.params._id}/${user.id}`, 
             {
                headers: { token: `Bearer ${user.token}`,
                userid: `Bearer ${user.id}`}
             });
             setInformations(res.data[0])
             setproductsId(res.data[0].products)
             console.log(res.data[0].products);
             

        } catch (error) {
          console.log(error)
        }

      };

      const getProducts = async () => {
        const products =[]
  
            for(let i=0; i<productsId.length; i++) {
                try {
                          const res = await axios.get(`http://${BASE_URL}:5000/api/product/find/${productsId[i].productId}`, 
                            {
                                headers: { token: `Bearer ${user.token}` }
                            });
                            products.push(res.data)
                            console.log(products)
                            
                        } catch (error) {
                          console.log(error)
                        }
          }
          setproducts(products)
          
        }

      useEffect(() => {
       getOrder()
      }, [route.params._id]);

      useEffect(()=>{
        getProducts()
        console.log(productsId)
      }, [productsId])

      useEffect(() => {
    
      }, [productsListe]);
 

  return (
    <View style={{flex: 1}}>
        <ScrollView>
       <HeaderMenu title="Détails de la commande"/>

{productsListe.map(product=> (
  <View>
    <Text>
      {product.title}
  </Text>
  </View>
))}
        
        </ScrollView>
    </View>
  )
}

export default CommandeDetails
