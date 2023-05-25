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
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'red'
  },
  view1:{
    flexDirection: 'row',
    justifyContent: "center"
  }


});

export default styles;
