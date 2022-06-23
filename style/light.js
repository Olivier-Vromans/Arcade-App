import { StyleSheet } from "react-native";
import style from './style.js'

const light = StyleSheet.create({
    ...style,
    cntainer: {
        ...style.container,
        backgroundColor: '#f2f2f2',
    },
    flatlistItem:{
        ...style.flatlistItem,
        backgroundColor: "#d9d9d9"
    },
    title: {
        ...style.title,
        color: "#000000",
    },
    text: {
        ...style.text,
        color: '#000000',
    },
    textInput:{
        ...style.textInput,
        color: "#000000",
    },
    pickerContainer: {
        ...style.pickerContainer,
        backgroundColor: "#000000",
        color: "#000000"
    },
    pickerText: {
        color: "#000000",
        backgroundColor: "#f2f2f2",
    }

})

export default light