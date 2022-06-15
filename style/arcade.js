import { StyleSheet } from "react-native";
import style from './style.js'

const arcade = StyleSheet.create({
    ...style,
    ThemeContainer: {
        ...style.container,
        backgroundColor: '#2b0e66',
    },
    ThemeTitle: {
        ...style.title,
        color: "#00be67",
    },
    ThemeText: {
        color: '#00a1d5',
    },

})

export default arcade