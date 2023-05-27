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
    width: 15000,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


});

export default styles;
