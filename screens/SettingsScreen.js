import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";


export default function Settings({ navigation, colorScheme, storeTheme }) {
    // State variables
    const [themeColor, setThemeColor] = useState();

    // Get the theme from the LocalStorage
    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('theme')
            if (theme !== null) {
                setThemeColor(theme)
            }
        } catch (e) {
            // error reading value
        }
    }

    // Use Effect to render the theme
    useEffect(() => {
        getTheme()
    }, [])

    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>Settings Screen!</Text>
            {/* Picker to choose your theme */}
            <Picker
                style={colorScheme.pickerContainerStyle}
                selectedValue={themeColor}
                itemStyle={colorScheme.pickerTextStyle}
                onValueChange={(itemValue, itemIndex) => {
                    setThemeColor(itemValue)
                    storeTheme(itemValue)
                }}>
                <Picker.Item label="Light Mode" value="light" />
                <Picker.Item label="Dark Mode" value="dark" />
                <Picker.Item label="Arcade Mode" value="arcade" />
            </Picker>
        </View>
    );
}
