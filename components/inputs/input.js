import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable,TextInput,Keyboard
} from 'react-native';
import Hstack from "../../designComps/hstack";
import Ionicons from '@expo/vector-icons/Ionicons';

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showPassword:true}


    }

    render() {
        return (

            <Hstack
                style={{borderBottomWidth:.5,borderColor:'#e3e3e3'}}
            trueSize={true}
            width={.8}
            height={.05}
            >
                <Ionicons style={[{width:'10%'}]} name={this.props.icon} size={this.props.size} color={this.props.color}/>
                <TextInput style={[
                    {width:'80%'}
                ]}
                value={this.props.value}
                onChangeText={(val)=>{this.props.changeDetection(val)}}
                placeholder={this.props.placeholder}
                           secureTextEntry={this.props.isPassword && this.state.showPassword}
                />

                {this.props.isPassword && this.props.value !== '' &&
                    <TouchableOpacity style={{width:'10%'}} onPress={()=>{
                        this.setState((curr)=>{
                            return {showPassword:!curr.showPassword}
                        })
                    }}>
                        <Ionicons  name={!this.state.showPassword ? 'eye-off' :'eye'} size={this.props.size} color={this.props.color}/>
                    </TouchableOpacity>

                }
            </Hstack>

        )
    }


}
