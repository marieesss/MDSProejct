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
    fontFamily: 'Josefin',
    marginRight: 20    
  },
  product: {
    flexDirection: "row",
    justifyContent: 'center',
    margin: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  commandes: {
    height : 120,
    padding: 10,
    width:300,
    borderColor: '#4A5D26',
    borderRadius:15,
    borderWidth:2,
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:15,
    alignItems:"center"
  },
  categorie:{
    padding :10
  },
  cart:{
    width: "25%",
    flexDirection:"row",
    justifyContent:"center"
  },
  informations:{
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    color:"white",
    backgroundColor:"#4A5D26",
    padding: 10,
    width: 120,
    justifyContent:"center",
    flexDirection:"row",
    borderRadius: 15,
    marginBottom:5
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
  text:{
    fontFamily: "Josefin", 
    color: "white"
  }

});

export default styles;
