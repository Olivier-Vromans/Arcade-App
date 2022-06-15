import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen.js';
import ListScreen from './screens/ListScreen.js';
import MapScreen from './screens/MapScreen.js';
import Settings from './screens/SettingsScreen.js';
import themes from './src/themes.js';

export default function App() {
  const Tab = createBottomTabNavigator()
  const [themeContainerStyle, themeTextStyle, themeTitleStyle, theme] = themes();


  console.log(theme);
  const darkMode = {
    dark: false,
    colors: {
      card: '#131318',
      text: '#03dac6',
      border: 'rgba(0, 0, 0, 0.5)',
    },
  };
  const arcadeMode = {
    dark: false,
    colors: {
      card: '#001d31',
      text: '#00BE67',
      border: 'rgba(0, 0, 0, 0.5)',
    }
  }

  function currentTheme() {
    let navTheme
    let tabBarActive
    let tabBarinActive
    if (theme === 'light') {
      navTheme = DefaultTheme
      tabBarActive = '#b30000'
      tabBarinActive = '#d3d3d3'
    } else if (theme === 'dark') {
      navTheme = darkMode
      tabBarActive = '#b30000'
      tabBarinActive = '#d3d3d3'
    } else if (theme === 'arcade') {
      navTheme = arcadeMode
      tabBarActive = '#00BE67'
      tabBarinActive = '#00a1d5'
    }
    return [navTheme, tabBarActive, tabBarinActive]
  }

  const [navTheme, tabBarActive, tabBarinActive] = currentTheme()

  console.log(tabBarActive);
  // theme === 'light' ? DefaultTheme : arcadeMode

  return (
    <NavigationContainer theme={navTheme}>
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
          tabBarActiveTintColor: `${tabBarActive}`,
          tabBarInactiveTintColor: `${tabBarinActive}`,
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Map' component={MapScreen} />
        <Tab.Screen name='List' component={ListScreen} />
        <Tab.Screen name='Settings' component={Settings} />
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}