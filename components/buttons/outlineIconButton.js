import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TouchableHighlight
} from 'react-native';
import styles from "../../styles/globals/buttons";
import Hstack from "../../designComps/hstack";
import Ionicons from "@expo/vector-icons/Ionicons";


export default class OutlineIconButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.pressed} activeOpacity={.9} underlayColor={'ghostwhite'}  style={[styles.outlineIconButton,...this.props.style,{backgroundColor:'transparent',borderColor:this.props.borderColor}]}>
              <Hstack
                jc={'flex-start'}


                width={1}
                height={1}
                trueSize={false}
                >
                    <Ionicons style={{width:'25%',marginLeft:'10%'}} name={this.props.icon} size={this.props.size} color={this.props.color}/>
                    <Text style={[{fontSize:11,width:'45%',color:this.props.color,fontWeight:'bold',textTransform:'uppercase' +
                            ''}]}>{this.props.text}</Text>


                </Hstack>

            </TouchableHighlight>
        )
    }


}
