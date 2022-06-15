import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { useTheme } from '@react-navigation/native';
import dark from "../style/dark.js";
import light from "../style/light.js";
import themes from "../src/themes.js";


export default function HomeScreen({ navigation }) {
    const [themeContainerStyle, themeTextStyle, themeTitleStyle] = themes()

    console.log(themeContainerStyle);
    return (
        <View style={[themeContainerStyle]}>
            <Text style={themeTitleStyle}>
                Home Screen!
            </Text>
            <Text style={themeTextStyle}>This is Text</Text>
        </View>
    )
}
