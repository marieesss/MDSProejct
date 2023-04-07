import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingBottom:100,
    backgroundColor: "#FFFDFA",
    justifyContent: "center",
    flexDirection: "column"
  },
  welcomeMessage: {
    fontSize: 30,
    color: '#4A5D26',
    marginTop: 40,
    marginBottom: 40,
    textAlign: "center",
    fontFamily: 'Josefin'
    
  },
  product: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: 'pink',
    margin: 15
  }, 
  split:{
    width: 150
  }, 
  banner: {
    height : 60,
    padding: 5,
    backgroundColor:'#4A5D26',
    flexDirection:'row',
    alignItems:'center',
    marginBottom: 20,
  },
  categorie:{
    padding :10
  },
  textBanner:{
    paddingLeft:10,
    color:"white",
    fontSize:20,
    fontFamily: 'Josefin'
  }

});

export default styles;
