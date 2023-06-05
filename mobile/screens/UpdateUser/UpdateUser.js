import React, {useState, useEffect, useContext} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/useContext';
import axios from 'axios'



import styles from './UpdateUser.style'

const UpdateUser = () => {
  const BASE_URL = process.env.BASE_URL

  const [email, setEmail] = useState('');
  const [newEmail, setnewEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, seterrorMsg] = useState('');
  const navigation = useNavigation();
  const { user, dispatch } = useContext(UserContext);


  const handleUpdate= async() => {
   try {
    const res= await axios.put(`https://${BASE_URL}.fr/api/user/updatebyuser/${user.id}`,
     {
      email : email, 
      password : password,
      username :username,
      newemail: newEmail

    },
    {
      headers: { token: `Bearer ${user.token}`, userid: `Bearer ${user.id}` },
    })
    const loggedInUser = { username : res.data.username, email:res.data.email, id : res.data._id, token : res.data.accessToken };
    dispatch({ type: 'LOGIN', payload: loggedInUser });
    console.log(user)
    navigation.navigate('Profile')

   } catch (error) {
    console.log(error)
    seterrorMsg(error.response.status)
    
   }
  }

  const handleClick = () => {
    handleUpdate();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modification</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouvelle adresse mail"
        onChangeText={setnewEmail}
        value={newEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau nom d'utilisateur"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse mail initial"
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

      {errorMsg === 404 ?
       <Text> Email original non trouvé</Text>
        : errorMsg === 401 ? 
        <Text> Pas le bon mot de passe</Text> : null }
    </View>


  )
}

export default UpdateUser