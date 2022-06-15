import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';


export default function MapScreen({ navigation }) {
    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [hotspots, setHotspots] = useState([{
        "name": "Lightning VR Delft",
        "latitude": 52.00327814152153,
        "longitude": 4.3935949202396545,
        "website": "http://www.lightningvr.com/"
    },
    {
        "name": "Poing",
        "latitude": 51.93046117139433,
        "longitude": 4.475247463744682,
        "website": "https://poing-arcade.nl/"
    }])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        console.log(location);
        text = JSON.stringify(location);
    }

    useEffect(() => {
        const fetchHotspots = async () => {
            try {
                await fetch("https://stud.hosted.hr.nl/1017098/webservice/arcades.json")
                    .then((response) => response.json())
                    .then((results) => {
                        let arr = []
                        for (let result of results) {
                            arr.push(result)
                        }
                        setHotspots(arr)
                        setLoading(false)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchHotspots()
    }, [])

    const markers = hotspots.map((hotspot, index) => {
        return (
            <Marker
                key={index}
                coordinate={{ latitude: hotspot.latitude, longitude: hotspot.longitude }}
                title={hotspot.name}
                description={hotspot.website}
                image={require("../assets/marker.png")}
            />
        )
    })

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                mapType="standard"
                region={
                    {
                        latitude: location ? location.coords.latitude : 51.916900,
                        longitude: location ? location.coords.longitude : 4.478560,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                }
            >
                {markers}
            </MapView>
            <Text>{text}</Text>
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
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
