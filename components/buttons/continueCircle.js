import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import Circle from "../../designComps/circle";
import {Ionicons} from "@expo/vector-icons";


export default class ContinueCircle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={this.props.active ? .7 : 1}>
            <Circle style={this.props.active ? {opacity:1} : {opacity:.3}} borderColor={'white'} backgroundColor={'orange'} size={.05}>
            <Ionicons name={'ios-arrow-forward'} size={20} color={'white'}/>
            </Circle>
            </TouchableOpacity>
        )
    }


}
