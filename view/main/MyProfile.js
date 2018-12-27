import React, {Component} from 'react';
import {Text, View, DeviceEventEmitter} from "react-native";

export default class MyProfile extends Component {

    state = {
        params: null
    }

    componentWillMount () {
        this.emitter = DeviceEventEmitter.addListener ("updateEvent", (params) => {
            console.log ("pass params: " + params)
            this.setState ({
                params: params
            })
        })
    }

    componentWillUnMount () {
        this.emitter.remove ()
    }

    render () {
        return (
            <View>
                <Text>this is MyProfile {
                    (this.state.params) ? this.state.params : ""
                }</Text>
            </View>
        )
    }
}