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
  button: {
    height: 50,
    backgroundColor: '#4A5D26',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  view1:{
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom:50,
    marginTop: 30,
    paddingLeft: 10
  },

});

export default styles;
