import { useEffect, useState } from "react";
import { Linking } from "react-native";
import { FlatList, SafeAreaView, Text } from "react-native";

export default function ListScreen({ navigation, colorScheme }) {
    const [hotspots, setHotspots] = useState([{}])

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
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchHotspots()
    }, [])
    
    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                List Screen!
            </Text>
            <FlatList
                data={hotspots}
                renderItem={({ item }) =>
                    <Text
                        style={[colorScheme.flatlistItemSyle, colorScheme.textStyle]}
                        onPress={() => navigation.navigate("Map", {
                            "latitude": item.latitude,
                            "longitude": item.longitude,
                        })}
                    >
                        {item.name}
                    </Text>
                }
            />
        </SafeAreaView>
    )
}