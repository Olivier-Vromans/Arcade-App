import {Text, View } from "react-native";


export default function HomeScreen({ navigation, colorScheme }) {

    return (
        <View style={colorScheme.themeContainerStyle}>
            <Text style={colorScheme.themeTitleStyle}>
                Home Screen!
            </Text>
            <Text style={colorScheme.themeTextStyle}>This is Text</Text>
        </View>
    )
}
