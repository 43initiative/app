import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import Hstack from "../../designComps/hstack";
import styles from '../../styles/globals/buttons'
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../designComps/spacer";
import Circle from "../../designComps/circle";
import Square from "../../designComps/square";

export default class Response extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected:false
        }

    }

    render() {
        const active = this.props.activeColor;
        const inactive = this.props.inactiveColor;
    const color = this.props.selected ? active: inactive;
    const textColor = this.props.selected ? 'white' : 'orange'
        return (
            <TouchableOpacity onPress={this.props.pressed} style={[styles.responseButton,{overflow:'hidden',backgroundColor:color,borderWidth:2,borderColor:this.props.selected ? 'transparent' : active},this.props.style]} activeOpacity={.6}>
            <Hstack style={{overflow:'hidden'}} jc={'flex-start'}  trueSize width={.7} height={.0475}>

                <Square style={{borderRadius:0}} borderColor={'transparent'} size={.0475} backgroundColor={'orange'}>
                <Ionicons style={{}} name={'ios-medal'} size={25} color={'white'}/>
                </Square>
                <Spacer width={.05}/>

                <Text style={[{color:textColor,fontWeight:'bold'}]}>{this.props.text.toUpperCase()}</Text>
            </Hstack>
            </TouchableOpacity>
        )
    }


}
