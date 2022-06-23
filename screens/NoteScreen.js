import { useEffect, useState } from "react";
import { Text, SafeAreaView, TextInput, FlatList, View, TouchableOpacity, Button, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";


export default function NoteScreen({ navigation, route, colorScheme }) {
    const [text, setText] = useState('')
    const [name, setName] = useState(route.params?.hotspot.name)
    const [latitude, setLatitude] = useState(route.params?.hotspot.latitude)
    const [longitude, setLongitude] = useState(route.params?.hotspot.longitude)

    useEffect(() => {
        setName(route.params?.hotspot.name)
        if (route.params?.hotspot.latitude) {
            setLatitude(route.params?.hotspot.latitude)
            setLongitude(route.params?.hotspot.longitude)
        }
    }, [route, route.params?.latitude])

    const [notes, setNotes] = useState([])

    function NotesItem({ note, deleteHandler }) {
        return (
            <TouchableOpacity
                style={[colorScheme.flatlistItemSyle, { flex: 1 }]}
                onPress={() => navigation.navigate("Map", {
                    "latitude": note.latitude,
                    "longitude": note.longitude,
                })}
            >
                <Text style={colorScheme.textStyle}>
                    {note.text}
                    <TouchableOpacity>
                        <View style={{
                            height: 25,
                            width: 25,
                        }}>
                            <Ionicons
                                name="trash"
                                size={25}
                                onPress={() => deleteHandler(note.id)} />
                        </View>
                    </TouchableOpacity>
                </Text>
            </TouchableOpacity>
        )
    }

    const deleteHandler = (id) => {
        setNotes((prevNotes) => {
            return prevNotes.filter(note => note.id != id)
        })
    }

    const changeHandler = (val) => {
        setText(val + ` (${name})`)
    }

    const submitHandler = (text, name, latitude, longitude) => {
        if (name != undefined) {
            setNotes((prevNotes) => {
                return [
                    { text: text, id: Math.random().toString(), name: name, latitude: latitude, longitude: longitude },
                    ...prevNotes
                ]
            })
            storeNotes()
        }
    }

    function storeNotes() {
        if (notes) {
            try {
                AsyncStorage.setItem('notes', JSON.stringify(notes))
            } catch (err) {
                console.log(err)
            }
        }
    }

    const getNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes')
            if (notes !== null) {
                setNotes(JSON.parse(storedNotes))
            } else {
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    useEffect(() => {
        storeNotes()
    }, [notes])

    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View>
                    <Text style={colorScheme.titleStyle}>
                        These are my notes:
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={colorScheme.textInputStyle}
                        onChangeText={changeHandler}
                    />
                    <Button title="Add Note" onPress={() => {
                        submitHandler(text, name, latitude, longitude)
                    }} />
                </View>
                <FlatList
                    data={notes}
                    renderItem={({ item }) => (
                        <NotesItem note={item} deleteHandler={deleteHandler} />
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}