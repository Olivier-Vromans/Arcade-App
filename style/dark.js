import { StyleSheet } from "react-native";
import style from './style.js'

const dark = StyleSheet.create({
  ...style,
  container: {
    ...style.container,
    backgroundColor: '#1e1f26',
  },
  title: {
    ...style.title,
    color: "#03dac6",
  },
  text: {
    color: '#ffffff',
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