import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TextInput
} from 'react-native';
import VStack from "../../designComps/vstack";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";


export default class FauxButtonInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (

            <VStack al={'flex-start'} jc={'space-around'} style={{}} height={1} trueSize={false} width={this.props.width}>
                <TouchableOpacity onPress={this.props.pressed} style={[{width:'100%',height:'100%'}]}>
                <Text style={[{color:'gray',fontSize:12.5}]}>{this.props.label}</Text>
                <Hstack width={1} height={1} jc={'space-between'}>
                    <Text
                        style={{width:'100%',borderBottomWidth:0,borderColor:'gray',border:0,color:'gray'}}>
                        {this.props.text}
                    </Text>
                    {this.props.hasIcon &&
                        <TouchableOpacity onPress={this.props.pressed}>
                    <Ionicons name={this.props.icon} size={this.props.size} color={this.props.color}/>
                        </TouchableOpacity>
                    }
                </Hstack>
                </TouchableOpacity>

            </VStack>

        )
    }


}
