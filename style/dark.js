import { StyleSheet } from "react-native";
import style from './style.js'

const dark = StyleSheet.create({
  ...style,
  container: {
    ...style.container,
    backgroundColor: '#1e1f26',
  },
  flatlistItem: {
    ...style.flatlistItem,
    backgroundColor: "#293034"
  },
  title: {
    ...style.title,
    color: "#03dac6",
  },
  text: {
    ...style.text,
    color: '#ffffff',
  },
  textInput:{
      ...style.textInput
  },
  pickerContainer: {
    ...style.pickerContainer,
  },
  pickerText: {
    color: "#ffffff",
    backgroundColor: "#1e1f26",
  }

})

export default dark