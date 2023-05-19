import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../components/useContext';
import { useNavigation } from '@react-navigation/native';


import styles from './Commandes.style';

const Commandes = () => {
  const [informations, setInformations] = useState([]);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const navigation = useNavigation();


  const { user } = useContext(UserContext);
  console.log(user.id);
  console.log(user.token);

  const BASE_URL = process.env.BASE_URL;

  const getOrder = async () => {
    try {
      const res = await axios.get(`http://${BASE_URL}:5000/api/order/find/${user.id}`, {
        headers: { token: `Bearer ${user.token}`, userid: `Bearer ${user.id}` },
      });
      console.log(res.data);
      setInformations(res.data);
      setHasDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasDataLoaded) {
      getOrder();
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
          <View style={styles.titleRow}>
            <Text style={styles.welcomeMessage}> Catalogue</Text>
            <Image source={require('../../assets/img/logo.png')} style={styles.img} />
          </View>

          <View style={styles.banner}>
            <Text style={styles.textBanner}>Les commandes de {user.username}</Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ScrollView>
              {informations.length > 0 ? (
                informations.map((commande) => (
                  <TouchableOpacity onPress={() => {navigation.navigate("CommandeDetails", {_id : commande._id})}}>
                  <View style={styles.commandes} key={commande._id}>
                    <Text>{commande._id}</Text>
                    {isOrderExpired(commande.updatedAt)  ? 
                        <Text>Order has expired!</Text> :
                          commande.status === "en attente de paiement" ? 
                        <Text>En attente de paiement</Text> :
                        <TouchableOpacity onPress={() => Linking.openURL(commande.receipt_url)} style={{ backgroundColor: 'blue' }}>
                          <View>
                            <Text>Voir mon reçu</Text>
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
