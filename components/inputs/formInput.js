import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TextInput
} from 'react-native';
import VStack from "../../designComps/vstack";
import Input from "./input";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";


export default class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        return (
            <VStack al={'flex-start'} jc={'space-around'} style={{}} height={1} trueSize={false} width={this.props.width}>
                <Text style={[{color:'gray',fontSize:12.5}]}>{this.props.label}</Text>
                <Hstack width={1} height={1} jc={'space-between'}>
                    <TextInput
                        placeholderTextColor={'black'}
                        maxLength={this.props.isPhone ? 10 : 100}
                        autoComplete={this.props.autoComplete}
                        keyboardType={this.props.isPhone ? 'phone-pad': 'default'}
                        style={{width:'100%',borderBottomWidth:0,borderColor:'gray',border:0}}
                        value={this.props.value}
                        onChangeText={(val)=>{this.props.changeDetection(val)}}
                        placeholder={this.props.placeholder}/>
                    {this.props.hasIcon &&
                        <TouchableOpacity onPress={this.props.pressed}>
                    <Ionicons name={this.props.icon} size={this.props.size} color={this.props.color}/>
                        </TouchableOpacity>
                    }
                </Hstack>

            </VStack>
        )
    }


}
