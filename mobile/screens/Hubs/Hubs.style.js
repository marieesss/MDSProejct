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
  hub: {
    flexDirection: "row",
    height: 100,
    width: 300,
    borderWidth: 1, 
    borderColor: '#4A5D26', 
    justifyContent:"space-between",
    padding:15, 
    marginBottom: 10
  },
  name:{
    fontSize: 18,
    fontFamily: 'Josefin',
    color:"#4A5D26"
  }, 
  explications:{
    padding: 10,
    marginBottom:15,
    fontSize:18
  }


});

export default styles;
