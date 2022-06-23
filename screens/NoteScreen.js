import { useEffect, useState } from "react";
import { Text, SafeAreaView, TextInput, FlatList, View, TouchableOpacity } from "react-native";

export default function NoteScreen({ navigation, route, colorScheme }) {
    const [name, setName] = useState(route.params?.hotspot.name)
    const [latitude, setLatitude] = useState(route.params?.hotspot.latitude)
    const [longitude, setLongitude] = useState(route.params?.hotspot.longitude)


    const [notes, setNotes] = useState([
        { id: 1, note: "wow", location: "piong" },
        { id: 2, note: "Hallo", location: "piong" },
    ])

    function NotesItem(item) {
        return (
            <TouchableOpacity>
                <Text style={[colorScheme.flatlistItemSyle, colorScheme.textStyle]}>
                    {item.note.note}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                Notes Screen:
            </Text>
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                    <NotesItem note={item} />
                )}
            />
        </SafeAreaView>
    )
}