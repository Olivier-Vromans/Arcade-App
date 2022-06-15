import { StyleSheet, Text, View } from "react-native";

export default function ListScreen ({ navigation }){

    return (
        <View style={styles.container}>
            <Text>
                List Screen!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
