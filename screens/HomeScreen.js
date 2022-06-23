
import { useState } from "react";
import { Text, View } from "react-native";


export default function HomeScreen({ navigation, colorScheme }) {
    // Not much to see here hahah
    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                Home Screen!
            </Text>
            <Text style={colorScheme.textStyle}>The perpose of this app is </Text>
            <Text style={colorScheme.textStyle}>to see where arcade halls are.</Text>
            <Text style={colorScheme.textStyle}>You can even leave notes.</Text>
        </View>
    )
}
