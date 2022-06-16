
import { useState } from "react";
import { Text, View } from "react-native";


export default function HomeScreen({ navigation, colorScheme }) {


    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                Home Screen!
            </Text>
            <Text style={colorScheme.textStyle}>This is Text</Text>
        </View>
    )
}
