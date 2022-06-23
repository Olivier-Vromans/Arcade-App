
import { useState } from "react";
import { Text, View } from "react-native";


export default function HomeScreen({ navigation, colorScheme }) {
    // Not much to see here hahah
    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                Home Screen!
            </Text>
            <Text style={colorScheme.textStyle}>This is Text</Text>
        </View>
    )
}
