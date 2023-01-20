import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import Square from "../../designComps/square";
import Spacer from "../../designComps/spacer";


export default class CheckText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked:false
        }

    }

    render() {
        let color = this.props.checked ?
            this.props.activeColor : this.props.inactiveColor
        return (
            <View style={{display:'flex',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'flex-start'}}>

                <TouchableOpacity activeOpacity={.9} onPress={()=>{this.props.tapped()}}>
                                    <Square backgroundColor={color} borderColor={this.props.checked ? 'transparent' : this.props.borderColor} background={color} size={.02}>
                                        {this.props.checked ?    <Ionicons name={'checkmark-outline'} size={15} color={this.props.checkColor}/> : <></>}
                                    </Square>
                </TouchableOpacity>
                <Spacer trueSize={true} width={.0125}/>

                <Text style={[{fontSize:12,color:'darkslategray'}]}>{this.props.text}</Text>

            </View>
        )
    }


}
