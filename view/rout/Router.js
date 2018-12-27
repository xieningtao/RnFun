import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import React, {Component} from 'react';
import {StyleSheet} from "react-native"
import Home from '../main/Home'
import MyProfile from '../main/MyProfile'
import Square from '../main/Square'
import {Image} from "react-native";
import HomeDetail from "../main/HomeDetail";

const AppNavigator = createBottomTabNavigator (
    {
        main: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require ('../image/home_selected.png') : require ('../image/home.png')}
                        style={tabStyles.icon}
                    />
                )

            }
        },
        square: {
            screen: Square,
            navigationOptions: {
                tabBarLabel: "广场",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require ('../image/discover_selected.png') : require ('../image/discover.png')}
                        style={tabStyles.icon}
                    />
                )
            }
        },
        myProfile: {
            screen: MyProfile,
            navigationOptions: {
                tabBarLabel: "我的",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require ('../image/me_selected.png') : require ('../image/me.png')}
                        style={tabStyles.icon}
                    />
                )
            }
        },

    }, {
        headerMode: "none",
        tabBarOptions: {
            labelStyle: {
                fontSize: 15,
            },
            style: {
                backgroundColor: 'white',
            },
        }
    }
);

const myStackNavigation = createStackNavigator ({
    home: {
        screen: AppNavigator,
        // title:"首页",
        navigationOptions: {
            header: null,
        }
    },
    homeDetail: {
        screen: HomeDetail,
        navigationOptions: {
            title: "HomeDetail",
        }
    }
}, {
    headerMode: "float"
})
const tabStyles = StyleSheet.create ({
    icon: {
        width: 26,
        height: 26,
    },
});

export default myStackNavigation;