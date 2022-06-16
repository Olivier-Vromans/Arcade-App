import React, { useEffect, useRef, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import Switch from "expo-dark-mode-switch";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Settings({ navigation, colorScheme, storeTheme }) {
    const [themeColor, setThemeColor] = useState(false);

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('theme')
            if (theme !== null) {
                setThemeColor(theme === true ? 'light' : 'dark')
            }
        } catch (e) {
            // error reading value
        }
    }


    useEffect(() => {
        getTheme()
    }, [])

    return (
        <View style={colorScheme.themeContainerStyle}>
            <Text style={colorScheme.themeTitleStyle}>Settings Screen!</Text>
            <Switch
                value={themeColor}
                onChange={(value) => {
                    setThemeColor(value)
                    storeTheme(value);
                }}
            />
        </View>
    );
}
