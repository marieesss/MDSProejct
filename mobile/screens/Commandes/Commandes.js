import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../components/useContext';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


import styles from './Commandes.style';
import HeaderMenu from '../../components/header/Header';

const Commandes = () => {
  const [informations, setInformations] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const navigation = useNavigation();


  const { user } = useContext(UserContext);

  const BASE_URL = process.env.BASE_URL;

  const getOrders = async () => {
    try {
      const res = await axios.get(`https://${BASE_URL}/api/order/find/${user.id}`, {
        headers: { token: `Bearer ${user.token}`, userid: `Bearer ${user.id}` },
      });
      console.log(res.data)
      setInformations(res.data);
      setHasDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasDataLoaded) {
      getOrders();
    }
  }, [hasDataLoaded]);

  const isOrderExpired = (orderDate) => {
    const currentDate = new Date();
    const orderDateTime = new Date(orderDate);
    const diffInDays = Math.floor((currentDate - orderDateTime) / (1000 * 60 * 60 * 24));

    return diffInDays > 30;
  };

  const formatOrderDate = (orderDate) => {
    const date = new Date(orderDate);
    return date.toLocaleDateString('en-GB'); // Modify the locale as per your requirement
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <HeaderMenu title={" Les commandes de " + user.username }/>


        <View style={{
    flexDirection: 'column',
    alignItems:'center',
    flex:1
    }}>
            <ScrollView>
              {informations.length > 0 ? (
                informations.map((commande) => (
                  <TouchableOpacity key={commande._id} onPress={() => {navigation.navigate("CommandeDetails", {_id : commande._id})}}>
                  <View style={styles.commandes} >
                  <View style={styles.cart}>
                  <Entypo name="shopping-cart" size={30} color="#4A5D26" />
                  </View>
                  <View style={styles.informations}>
                    {isOrderExpired(commande.updatedAt)  ? 
                        <Text>Reçu plus disponible</Text> :
                          commande.status === "en attente de paiement" ? 
                        <Text>En attente de paiement</Text> :
                        <TouchableOpacity onPress={() => Linking.openURL(commande.receipt_url)}>
                          <View style={styles.button}>
                            <Text style={styles.text}>Voir mon reçu</Text>
                          </View>
                        </TouchableOpacity>
                    }
                    <View>
                      <Text>{formatOrderDate(commande.updatedAt)}</Text>
                    </View>
                    <View>
                      <Text>{commande.amount} euros</Text>
                    </View>
                    </View>
                  </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No orders found</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Commandes;
