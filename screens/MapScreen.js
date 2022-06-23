import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';


export default function MapScreen({ navigation, route, colorScheme }) {
    // State variables
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [hotspots, setHotspots] = useState([{}])
    const [region, setRegion] = useState({
        latitude: 51.916900,
        longitude: 4.478560,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    // eventlistener for when the tab is pressed than set the location back to current location
    useEffect(() => {
        navigation.addListener('tabPress', (e) => {
            if (location) {
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
            }
        })
        //If statement when region is given by route than show that
        if (route.params?.latitude) {
            console.log(route.params)
            setRegion({
                latitude: route.params.latitude,
                longitude: route.params.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        }
        // Else if location is given than go to current location
        else if (location) {
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        }
    }, [location, route.params?.latitude, route])



    useEffect(() => {
        (async () => {
            // Ask permission to get the location
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
        text = JSON.stringify(location);
    }

    useEffect(() => {
        // Fetch for the hotspots and put them in hotspots
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
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchHotspots()
    }, [])

    // Create a marker for each hotspot with title, description and custom image
    const markers = hotspots.map((hotspot, index) => {
        return (
            <Marker
                key={index}
                coordinate={{ latitude: hotspot.latitude, longitude: hotspot.longitude }}
                title={hotspot.name}
                description={hotspot.website}
                image={require("../assets/marker.png")}
                onPress={() => navigation.navigate("Notes", {
                    hotspot: hotspot
                })
                }
            />
        )
    })

    return (
        <View style={colorScheme.containerStyle}>
            {/* Map componenets */}
            <MapView
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}
                showsUserLocation
                mapType="standard"
                region={region}
            >
                {/* load the markers in */}
                {markers}
            </MapView>
        </View>
    )
}
