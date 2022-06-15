import { StyleSheet } from "react-native";
import style from './style.js'

const dark = StyleSheet.create({
  ...style,
  ThemeContainer: {
    ...style.container,
    backgroundColor: '#1e1f26',
  },
  ThemeTitle: {
    ...style.title,
    color: "#03dac6",
  },
  ThemeText: {
    color: '#ffffff',
  },

})

export default dark