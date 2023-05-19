import React, {useState, useEffect, useContext} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/useContext';
import axios from 'axios'



import styles from './login.style'

const Login = () => {
  const BASE_URL = process.env.BASE_URL

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { user, dispatch } = useContext(UserContext);


  const handleLogin= async() => {
   try {
    const res= await axios.post(`http://${BASE_URL}:5000/api/auth/login`, {email,password})
    const loggedInUser = { username : res.data.username, email:res.data.email, id : res.data._id, token : res.data.accessToken };
    dispatch({ type: 'LOGIN', payload: loggedInUser });
    console.log(user)

   } catch (error) {
    console.log(error)
    
   }
  }

  const handleClick = () => {
    handleLogin();
    console.log(user)
    if(user){
      navigation.navigate('Welcome')
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        autoCompleteType="password"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>


  )
}

export default Login