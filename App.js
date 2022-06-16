import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import arcade from "./style/arcade.js";
import dark from "./style/dark.js";
import light from "./style/light.js";

import HomeScreen from './screens/HomeScreen.js';
import ListScreen from './screens/ListScreen.js';
import MapScreen from './screens/MapScreen.js';
import Settings from './screens/SettingsScreen.js';

export default function App() {
  const Tab = createBottomTabNavigator()

  const [theme, setTheme] = useState('dark');
  const [colorScheme, setColorScheme] = useState({
    mode: "dark",
    themeTextStyle: dark.ThemeText,
    themeContainerStyle: dark.ThemeContainer,
    themeTitleStyle: dark.ThemeTitle,
    navTheme: darkMode,
    tabBarActive: '#b30000',
    tabBarinActive: '#d3d3d3',
  })

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

  if (theme === 'light') {
    colorScheme.themeTextStyle = light.ThemeText
    colorScheme.themeContainerStyle = light.ThemeContainer
    colorScheme.themeTitleStyle = light.ThemeTitle
    colorScheme.navTheme = DefaultTheme
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
  } else if (theme === 'dark') {
    colorScheme.themeTextStyle = dark.ThemeText
    colorScheme.themeContainerStyle = dark.ThemeContainer
    colorScheme.themeTitleStyle = dark.ThemeTitle
    colorScheme.navTheme = darkMode
    colorScheme.tabBarActive = '#b30000'
    colorScheme.tabBarinActive = '#d3d3d3'
  } else if (theme === 'arcade') {
    colorScheme.themeTextStyle = arcade.ThemeText
    colorScheme.themeContainerStyle = arcade.ThemeContainer
    colorScheme.themeTitleStyle = arcade.ThemeTitle
    colorScheme.navTheme = arcadeMode
    colorScheme.tabBarActive = '#00BE67'
    colorScheme.tabBarinActive = '#00a1d5'
  }


  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme')
      console.log(theme);
      if (theme !== null) {
        setColorScheme((currentColorScheme) => {
          currentColorScheme.mode = theme;
          return currentColorScheme;
        })
      }
    } catch (e) {
      // error reading value
    }
  }

  const storeTheme = (value) => {
    const theme = value === true ? "dark" : "arcade";
    try {
      AsyncStorage.setItem('theme', colorScheme.mode)
      setTheme(theme);
      setColorScheme((currentColorScheme) => {
        currentColorScheme.mode = theme;
        console.log(theme);
        return currentColorScheme;
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <NavigationContainer theme={colorScheme.navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline'
            }
            else if (route.name === 'List') {
              iconName = focused ? 'list' : 'list-outline';
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
        <Tab.Screen name='Settings'>
          {(props) => <Settings {...props} colorScheme={colorScheme} storeTheme={storeTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}