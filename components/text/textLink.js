import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';


export default class TextLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <TouchableOpacity style={[this.props.underline ? {borderBottomWidth:1,borderColor:this.props.underlineColor ? this.props.underlineColor :'gray'} : {}]} onPress={this.props.pressed} activeOpacity={.8}>
                <Text style={[...this.props.textStyles]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }


}
