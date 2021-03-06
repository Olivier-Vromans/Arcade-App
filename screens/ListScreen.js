import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import Card from "../components/Card.js";

export default function ListScreen({ navigation, colorScheme }) {
    // State variable for the hotspots
    const [hotspots, setHotspots] = useState([{}])

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

    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                List Screen!
            </Text>
            {/* Create a Flatlist with the fetched hotspots */}
            <FlatList
                data={hotspots}
                renderItem={({ item }) =>
                    <Card input={item.name} style={[colorScheme.flatlistItemStyle, colorScheme.textStyle]} onPress={() => navigation.navigate("Map", {
                        "latitude": item.latitude,
                        "longitude": item.longitude,
                    })} />
                }
            />
        </SafeAreaView>
    )
}