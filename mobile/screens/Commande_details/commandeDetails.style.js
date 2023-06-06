import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom:100,
    backgroundColor: "#FFFDFA",
    justifyContent: "center",
    flexDirection: "column",
    margin: 0
  },
  welcomeMessage: {
    fontSize: 30,
    color: '#4A5D26',
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: 'Josefin',
    marginRight: 20    
  },
  product: {
    height: 100,
    width:200,
    borderWidth: 1,
    borderRadius:15,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:15,
    marginBottom: 15
    
  }, 
  split:{
    width: 150
  }, 
  button: {
   height: 40,
   width:100,
   backgroundColor:"#4A5D26",
   borderRadius:20,
   shadowColor: 'black',
   flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categorie:{
    padding :10
  },
  textBanner:{
    paddingLeft:10,
    color:"white",
    fontSize:20,
    fontFamily: 'Josefin'
  },
  paiement :{
    fontFamily:"Josefin",
    color:"#4A5D26",
    margin:0,
    flexDirection:"row",
    fontSize:25,
    marginTop: 15
  }, 
  line:{
    marginTop: 5,
    borderWidth:1,
    borderColor:"#4A5D26",
    borderRadius: 15,
    marginBottom:10
  },
  infopaiement:{
    flexDirection:"row", 
    justifyContent:"space-between",
  },
  infopaiement2:{
    flexDirection:"row", 
    justifyContent:"space-between",
  },
  column:{
    flexDirection:"column",
  },
  titleRow:{
    justifyContent:"center",
    flexDirection: "row",
    alignItems:"center",
    padding:30
  },
  img:{
    width: 50,
    height : 50
  },
  row:{
    flexDirection:"row",
    alignItems:'flex-end',
    padding: 15
  },
  back:{
    width: 20,
    height:20,
    marginTop:10,
    marginLeft: 10
  },
  text:{
    fontFamily:"Avenir"
  }

});

export default styles;
