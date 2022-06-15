import { useColorScheme } from "react-native";
import arcade from "../style/arcade.js";
import dark from "../style/dark.js";
import light from "../style/light.js";

export default function themes() {
    const colorScheme = useColorScheme()

    let theme = colorScheme
    let themeTextStyle
    let themeContainerStyle
    let themeTitleStyle

    if (theme === 'light') {
        themeTextStyle = light.ThemeText
        themeContainerStyle = light.ThemeContainer
        themeTitleStyle = light.ThemeTitle
    } else if (theme === 'dark') {
        themeTextStyle = dark.ThemeText
        themeContainerStyle = dark.ThemeContainer
        themeTitleStyle = dark.ThemeTitle
    } else if (theme === 'arcade') {
        themeTextStyle = arcade.ThemeText
        themeContainerStyle = arcade.ThemeContainer
        themeTitleStyle = arcade.ThemeTitle
    }


    return [themeContainerStyle, themeTextStyle, themeTitleStyle, theme]
}