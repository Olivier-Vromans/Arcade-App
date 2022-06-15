import { StyleSheet } from "react-native";
import style from './style.js'

const light = StyleSheet.create({
    ...style,
    ThemeContainer: {
        ...style.container,
        backgroundColor: '#ffffff',
    },
    ThemeTitle: {
        ...style.title,
        color: "#000000",
    },
    ThemeText: {
        color: '#000000',
    },

})

export default light