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
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: "center",
    padding: 15,
  },
  back:{
    width: 20,
    height:20,
    marginTop:10,
    marginLeft: 10
  },
  text:{
    fontFamily:"Avenir",
    textAlign:"justify",
    fontSize:15
  }, 
  name:{
    fontSize:22,
    marginTop:20,
    marginBottom:20,
    fontFamily:"Josefin",
    textAlign:"center"
  },
  desc:{
    fontSize: 18,
    fontFamily:"Avenir"
  }

});

export default styles;
