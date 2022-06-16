import { Text, View } from "react-native";

export default function ListScreen ({ navigation, colorScheme }){

    return (
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                List Screen!
            </Text>
        </View>
    )
}