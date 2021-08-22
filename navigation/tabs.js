import React from "react";
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, AllSongs, Search } from "../screens";
import { icons, COLORS, FONTS } from "../constants";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: true,
    style: {
        height: "7%",
        backgroundColor: COLORS.lightGray3
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.black : COLORS.lightGray;

                    switch (route.name) {
                        case "Home":
                            return (
                                <Image 
                                    source={icons.dashboard_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        
                        case "AllSongs":
                            return (
                                <Image 
                                    source={icons.menu_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        
                        case "Search":
                            return (
                                <Image 
                                    source={icons.search_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
            />
            <Tab.Screen 
                name="AllSongs"
                component={AllSongs}
            />
            <Tab.Screen 
                name="Search"
                component={Search}
            />
            
        </Tab.Navigator>
    )
}

export default Tabs;