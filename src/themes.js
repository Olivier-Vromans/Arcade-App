import { DefaultTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import arcade from "../style/arcade.js";
import dark from "../style/dark.js";
import light from "../style/light.js";

export default function themes() {
    let themeTextStyle
    let themeContainerStyle
    let themeTitleStyle
    let navTheme
    let tabBarActive
    let tabBarinActive

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

    if (colorScheme === 'light') {
        themeTextStyle = light.ThemeText
        themeContainerStyle = light.ThemeContainer
        themeTitleStyle = light.ThemeTitle
        navTheme = DefaultTheme
        tabBarActive = '#b30000'
        tabBarinActive = '#d3d3d3'
    } else if (colorScheme === 'dark') {
        themeTextStyle = dark.ThemeText
        themeContainerStyle = dark.ThemeContainer
        themeTitleStyle = dark.ThemeTitle
        navTheme = darkMode
        tabBarActive = '#b30000'
        tabBarinActive = '#d3d3d3'
    } else if (colorScheme === 'arcade') {
        themeTextStyle = arcade.ThemeText
        themeContainerStyle = arcade.ThemeContainer
        themeTitleStyle = arcade.ThemeTitle
        navTheme = arcadeMode
        tabBarActive = '#00BE67'
        tabBarinActive = '#00a1d5'
    }

    useEffect(() => {
    }, [])




    return [themeContainerStyle, themeTextStyle, themeTitleStyle, colorScheme, setColorScheme, navTheme, tabBarActive, tabBarinActive]
}