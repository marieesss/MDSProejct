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
    borderColor: "#4A5D26",
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
   height: 90,
   width:200,
   backgroundColor:"#4A5D26",
   borderRadius:20,
   shadowColor: 'black',
   flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
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
