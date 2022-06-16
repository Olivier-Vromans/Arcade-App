import { StyleSheet } from "react-native";
import style from './style.js'

const arcade = StyleSheet.create({
    ...style,
    container: {
        ...style.container,
        backgroundColor: '#2b0e66',
    },
    title: {
        ...style.title,
        color: "#00be67",
    },
    text: {
        color: '#00a1d5',
    },
    pickerContainer: {
        ...style.pickerContainer,
      },
      pickerText: {
        color: "#00a1d5",
        backgroundColor: "#2b0e66",
      }

})

export default arcade