import { Text, View } from "react-native";

export default function ListScreen ({ navigation, colorScheme }){

    return (
        <View style={colorScheme.themeContainerStyle}>
            <Text style={colorScheme.themeTitleStyle}>
                List Screen!
            </Text>
        </View>
    )
}