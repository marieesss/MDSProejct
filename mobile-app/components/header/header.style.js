import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    backgroundColor: "red",
    paddingTop:38,
  },
  userName: {
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20
  },
  welcomeMessage: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
  },
  list: {
    justifyContent: 'center',
    backgroundColor: 'pink',
    margin: 0,
  }, 
  split:{
    width: 150
  }

});

export default styles;
