import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TouchableHighlight
} from 'react-native';
import VStack from "../../designComps/vstack";
import styles from '../../styles/globals/buttons'

export default class RoundedButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    returnDisabled = () => {
        if(this.props.disabled) {
            return(<View   onPress={this.props.pressed}  style={[styles.roundedButton,...this.props.style,{backgroundColor:this.props.bgColor,opacity:.3}]} disabled={this.props.disabled}  >
                <Text style={[{color:'white',textTransform:'uppercase',fontWeight:'bold'},this.props.textStyles]}>{this.props.text}</Text>
            </View>)
        } else {
           return(<TouchableOpacity   onPress={this.props.pressed}  style={[styles.roundedButton,...this.props.style,{backgroundColor:this.props.bgColor}]} disabled={this.props.disabled}  >
               <Text style={[{color:'white',textTransform:'uppercase',fontWeight:'bold'},this.props.textStyles]}>{this.props.text}</Text>
           </TouchableOpacity>)
        }
    }

    render() {
        return (

            this.returnDisabled()
        )
    }


}
