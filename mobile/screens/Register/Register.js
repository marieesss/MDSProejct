import React, {useState, useEffect, useContext} from 'react'
import { View,Text,TouchableOpacity, Image, FlatList, ScrollView, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'




import styles from './Register.style'
import HeaderMenu from '../../components/header/Header';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const EMAIL_REGEX= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Register = () => {
  const BASE_URL = process.env.BASE_URL

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [matchPwd, setMatchPwd] = useState('');

  const navigation = useNavigation();
  const [errorMsg, seterrorMsg] = useState('');

  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validName, setValidName] = useState(false);


  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    console.log(validEmail)
}, [email])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
    console.log(validPwd)
}, [password, matchPwd])

useEffect(() => {
    setValidName(USER_REGEX.test(username));
    console.log( "Valid name", validName)
}, [username])




  const handleRegister= async() => {

   try {
    const res= await axios.post(`http://${BASE_URL}:80/api/auth/register`, {email,password, username})
    navigation.navigate('Connexion')

   } catch (error) {
    if (!err?.response) {
      seterrorMsg('No Server Response');
      console.log(err)
  } else if (err.response?.data?.message) {
    seterrorMsg(err.response?.data?.message)
  } else {
    seterrorMsg('Veuillez choisir un autre username ou adresse email')
      console.log(err)
  }
    
   }
  }

  const handleClick = () => {
    handleRegister();
  };


  return (
<ScrollView>
<HeaderMenu title="Inscription"/>

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nouveau nom d'utilisateur"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {username && !validName ? 
      <Text> 8 à 24 caractères.
          Il doit être commencé par une lettre
          Lettres, chiffres, soulignés, traits d'union autorisés.
          </Text>
      :null}
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
      {email && !validEmail ?  
                <Text>                      
                  8 à 24 caractères.
                        Il doit être commencé par une lettre
                        Lettres, chiffres, soulignés, traits d'union autorisés.
                    </Text>
                    :
                    null}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        autoCompleteType="password"
        autoCorrect={false}
      />

{password && !validPwd ?    
  <Text>                  
    8 à 24 caractères.
  Il doit inclure minuscule, majuscule et un caractère spécial
  </Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Veuillez confirmer votre mot de passe"
        onChangeText={setMatchPwd}
        value={matchPwd}
        secureTextEntry={true}
        autoCompleteType="password"
        autoCorrect={false}
      />

{ !validMatch ? 
    <Text>
      Doit correspondre au premier champ de saisie du mot de passe.
      </Text>
            
                    : null}


      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>


      {errorMsg ? <Text> errorMsg </Text> : null}

    </View>
    
    </ScrollView>   



  )
}

export default Register