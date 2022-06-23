import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from 'react-native';

//Import styles
import arcade from "./style/arcade.js";
import dark from "./style/dark.js";
import light from "./style/light.js";

//Import Screens
import HomeScreen from './screens/HomeScreen.js';
import ListScreen from './screens/ListScreen.js';
import MapScreen from './screens/MapScreen.js';
import Settings from './screens/SettingsScreen.js';
import NoteScreen from './screens/NoteScreen.js';

export default function App() {
  //Create the tab
  const Tab = createBottomTabNavigator()

  //State Variables for the theme and colorScheme
  const [theme, setTheme] = useState();
  const [colorScheme, setColorScheme] = useState({
    mode: "dark",
    textStyle: dark.text,
    textInputStyle: dark.textInput,
    containerStyle: dark.container,
    titleStyle: dark.title,
    pickerContainerStyle: dark.pickerContainer,
    pickerTextStyle: dark.pickerText,
    navTheme: darkMode,
    tabBarActive: '#b30000',
    tabBarinActive: '#d3d3d3',
    flatlistItemSyle: dark.flatlistItem
  })

  //Variables for the theme of the Tab Navigator
  const darkMode = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      card: '#131318',
      text: '#03dac6',
      border: 'rgba(0, 0, 0, 0.5)',
    },
  };
  const arcadeMode = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      card: '#001d31',
      text: '#00BE67',
      border: 'rgba(0, 0, 0, 0.5)',
    }
  }


  //If statement to check what theme is active and change all components to that theme
  if (theme === 'light') {
    colorScheme.textStyle = light.text
    colorScheme.containerStyle = light.container
    colorScheme.titleStyle = light.title
    colorScheme.pickerContainerStyle = light.pickerContainer
    colorScheme.pickerTextStyle = light.pickerText
    colorScheme.navTheme = DefaultTheme
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
    colorScheme.flatlistItemSyle = light.flatlistItem
    colorScheme.StatusBar = "dark"
  } else if (theme === 'dark') {
    colorScheme.textStyle = dark.text
    colorScheme.containerStyle = dark.container
    colorScheme.titleStyle = dark.title
    colorScheme.pickerContainerStyle = dark.pickerContainer
    colorScheme.pickerTextStyle = dark.pickerText
    colorScheme.navTheme = darkMode
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
    colorScheme.flatlistItemSyle = dark.flatlistItem
    colorScheme.StatusBar = "light"
  } else if (theme === 'arcade') {
    colorScheme.textStyle = arcade.text
    colorScheme.containerStyle = arcade.container
    colorScheme.titleStyle = arcade.title
    colorScheme.pickerContainerStyle = arcade.pickerContainer
    colorScheme.pickerTextStyle = arcade.pickerText
    colorScheme.navTheme = arcadeMode
    colorScheme.tabBarActive = '#00BE67'
    colorScheme.tabBarinActive = '#00a1d5'
    colorScheme.flatlistItemSyle = arcade.flatlistItem
    colorScheme.StatusBar = "light"
  }

  //Get the theme from localStorage and store it in theme and colorScheme
  const getTheme = async () => {
    try {
      const item = await AsyncStorage.getItem('theme')
      if (theme !== null) {
        setTheme(item)
        setColorScheme((currentColorScheme) => {
          currentColorScheme.mode = item;
          return currentColorScheme;
        })
      }else{
        setTheme(useColorScheme())
      }
    } catch (e) {
      // error reading value
    }
  }

  //Store the new Theme in localStorage and change the value
  const storeTheme = (value) => {
    try {
      AsyncStorage.setItem('theme', value)
      setTheme(value);
      setColorScheme((currentColorScheme) => {
        currentColorScheme.mode = value;
        return currentColorScheme;
      })
      getTheme()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTheme()
}, [])


  return (
    //Create the navigation
    <NavigationContainer theme={colorScheme.navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            //If statement for right icon for right route name
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline'
            }
            else if (route.name === 'List') {
              iconName = focused ? 'list' : 'list-outline';
            }
            else if (route.name === 'Notes') {
              iconName = focused ? 'document' : 'document-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: `${colorScheme.tabBarActive}`,
          tabBarInactiveTintColor: `${colorScheme.tabBarinActive}`,
        })}
      >
        <Tab.Screen name='Home'>
          {(props) => <HomeScreen {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Map'>
          {(props) => <MapScreen {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
          
        </Tab.Screen>
        <Tab.Screen name='List'>
          {(props) => <ListScreen {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name="Notes">
          {(props) => <NoteScreen {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
        <Tab.Screen name='Settings'>
          {(props) => <Settings {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar style={colorScheme.StatusBar}/>
    </NavigationContainer>
  );
}