import * as React from 'react';
import { Text, View, useColorScheme } from "react-native";
import Switch from 'expo-dark-mode-switch';
import themes from '../src/themes.js';


export default function Settings({ navigation }){
    const [value, setValue] = React.useState(useColorScheme() === 'dark' ? false : true);
    const colorScheme = value === true ? "dark" : "light"

    const [themeContainerStyle, themeTextStyle, themeTitleStyle] = themes(colorScheme)



    return (
        <View style={themeContainerStyle}>
            <Text style={themeTitleStyle}>
                Settings Screen!
            </Text>
            <Switch value={value} onChange={value => {setValue(value)}} />
        </View>
    )
}