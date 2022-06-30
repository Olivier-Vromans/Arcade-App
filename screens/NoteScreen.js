import { useEffect, useState } from "react";
import { Text, SafeAreaView, TextInput, FlatList, View, TouchableOpacity, Button, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from 'expo-local-authentication';


export default function NoteScreen({ navigation, route, colorScheme }) {
    // State Variables
    const [text, setText] = useState('')
    const [name, setName] = useState(route.params?.hotspot.name)
    const [latitude, setLatitude] = useState(route.params?.hotspot.latitude)
    const [longitude, setLongitude] = useState(route.params?.hotspot.longitude)
    const [notes, setNotes] = useState([])

    const Auth = async () => {
        try {
            // Check if device is compatible
            const isCompatible = await
                LocalAuthentication.hasHardwareAsync();

            if (!isCompatible) {
                throw new Error('Your device isn\'t compatible.')
                navigation.navigate('Map')
            }
            // Checking if device has biometrics records
            // const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            // if (!isEnrolled) {
            //   throw new Error('No Faces / Fingers found.')
            //   navigation.navigate('Map')
            // }

            // Authenticate user
            await LocalAuthentication.authenticateAsync();

        } catch (error) {
            navigation.navigate('Map')
        }
    }


    // Get the notes from LocalStorage
    const getNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes')
            if (notes !== null) {
                setNotes(JSON.parse(storedNotes))
            } else {
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Store the notes from LocalStorage
    const storeNotes = () => {
        if (notes) {
            try {
                AsyncStorage.setItem('notes', JSON.stringify(notes))
            } catch (err) {
                console.log(err)
            }
        }
    }

    //Delete handler when trash icon is clicked to remove specifiek note
    const deleteHandler = (id) => {
        setNotes((prevNotes) => {
            return prevNotes.filter(note => note.id != id)
        })
    }

    //change handler to get the textinput value and add the location
    const changeHandler = (val) => {
        setText(val + ` (${name})`)
    }

    //Submit handler to add the note when button is pressed with all the data
    const submitHandler = (text, name, latitude, longitude) => {
        if (name != undefined) {
            setNotes((prevNotes) => {
                return [
                    { text: text, id: Math.random().toString(), name: name, latitude: latitude, longitude: longitude },
                    ...prevNotes
                ]
            })
            storeNotes
        }
    }

    // Create the notes for the flatlist
    const NotesItem = ({ note, deleteHandler }) => {
        return (
            // Touchable to go to the map screen and go to the coordinates
            <TouchableOpacity
                style={[colorScheme.flatlistItemSyle, { flex: 1 }]}
                onPress={() => navigation.navigate("Map", {
                    "latitude": note.latitude,
                    "longitude": note.longitude,
                })}>
                {/* Text of the note */}
                <Text style={colorScheme.textStyle}>
                    {note.text}
                    <TouchableOpacity>
                        <View style={{
                            height: 25,
                            width: 25,
                        }}>
                            {/* Trash Icon */}
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

    useEffect(() => {
        //if route params exist than auth
        if (route.params !== undefined) {
            Auth()
            getNotes()
        }
        // Use effect to set the name, latitude, longitude
        setName(route.params?.hotspot.name)
        if (route.params?.hotspot.latitude) {
            setLatitude(route.params?.hotspot.latitude)
            setLongitude(route.params?.hotspot.longitude)
        }
    }, [route, route.params?.latitude])

    // Use Effect to get the notes
    useEffect(() => {
        if (route.params === undefined) {
            navigation.navigate('Map')
        }
    }, [])

    // use Effect to store the notes
    useEffect(() => {
        storeNotes()
    }, [notes])

    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <KeyboardAvoidingView>
                <View>
                    <Text style={colorScheme.titleStyle}>
                        These are my notes:
                    </Text>
                </View>
                <View>
                    {/* Input for the note */}
                    <TextInput
                        style={colorScheme.textInputStyle}
                        onChangeText={changeHandler}
                    />
                    <Button title="Add Note" onPress={() => {
                        submitHandler(text, name, latitude, longitude)
                    }} />
                </View>
                {/* FlatList with the notes */}
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