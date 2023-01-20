import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TouchableHighlight
} from 'react-native';
import VStack from "../../designComps/vstack";
import styles from '../../styles/globals/buttons'

export default class OutlineButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        return (
            <TouchableHighlight  disabled={this.props.disabled}  onPress={this.props.pressed} activeOpacity={.9}  style={[styles.roundedButton,...this.props.style,{borderWidth:this.props.borderWidth,borderColor:this.props.borderColor,opacity:this.props.disabled ? .3 : 1}]}>
                <Text style={[{color:this.props.textColor,textTransform:'uppercase',fontWeight:'bold'}]}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }


}
