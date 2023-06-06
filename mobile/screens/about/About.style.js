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
  img: {
    width: 150,
    height:100,
    resizeMode: 'contain'
  },
  view1:{
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom:50
  },
  view1child:{
    width:"50%",
    padding:15
  },
  bigStyle:{
    fontFamily:'Josefin',
    fontSize:18,
    color: "#4A5D26",
    textAlign: 'right'
  },
  view2child:{
    width:"50%",
    padding:15
  },
  img2: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#4A5D26',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button2: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A5D26',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'Josefin'
  },
  container2:{
  flexDirection:"row",
  justifyContent:"center",
  },
  card: {
    backgroundColor: 'white',
    width:'40%',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2,
    marginBottom:50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  circle: {
    width: '70%',
    height: 80,
    borderRadius: 50,
    backgroundColor: "#4A5D26",
    position: 'absolute',
    top: -40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 2,
    padding:5
  },
  circleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:"white",
    fontFamily:"Josefin"
  },
  cardText: {
    fontSize: 13,
    marginTop: 25,
    textAlign: 'center',
  },
  title:{
    textAlign:"center",
    fontFamily:"Josefin",
    fontSize:20,
    padding: 10,
    color:"#4A5D26"
  }


});

export default styles;
