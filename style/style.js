import { Dimensions, StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistItem:{
    marginTop: 24,
    padding: 30,
    fontSize:24,
    width: Dimensions.get("window").width - 50,
    borderRadius: 30,
    overflow: "hidden"
  },
  text: {
    fontSize: 15,
  },
  textInput:{
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
    // fontFamily: "Courier"
  },
  pickerContainer: {
    width: "75%",
  },

});

export default style