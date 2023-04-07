
import React, {useState, useEffect} from 'react'
import { View,Text, ScrollView, Image} from 'react-native'
import Header from '../../components/header/Header'
import axios from 'axios';

const ProductDetail = ({ navigation, route }) => {
    const [product, setProduct] = useState({});
    const [fermierId, setFermierId] = useState("");
    const [fermier, setFermier] = useState({});

    useEffect(()=>{
        const getProduct = async ()=> {
          try{
            const res = await axios.get(`http://10.57.132.20:5000/api/product/find/`+route.params._id);
            setProduct(res.data)
            setFermierId(res.data.fermierId)
            console.log(fermierId)
            
          }catch(err){
            console.log(err)
          }
        };
        getProduct();
       
      
        
    }, [route.params])

    useEffect(()=>{
        const getProduct = async ()=> {
          try{
            const res = await axios.get(`http://10.57.132.20:5000/api/fermier/find/`+fermierId);
            console.log(res.data)
            setFermier(res.data)

            
          }catch(err){
            console.log(err)
          }
        };
        getProduct();
       
      
        
    }, [fermierId])

  return (
    <View style={{flex: 1}}>
        <Header/>
        <ScrollView>
            <View >
                <Text> {product.title}</Text>
                <Image source={{uri: product.img}}
            style={{width: 300, height: 300}}
            />
            <Text> {product.price} euros</Text>

            </View>
            
                <Image source={{uri: fermier.img}}
            style={{width: 300, height: 300}}
            />
            <Text> {fermier.name}</Text>
            <Text> {fermier.desc} euros</Text>
            <View>

            </View>
        </ScrollView>
    </View>
  )
}

export default ProductDetail
