import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {createSquare} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import {flexing} from "../../styles/dimensions/dims";


export default class FilterButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        let active = this.props.active
        return (
            <View style={[createSquare(.085,0,'transparent'),flexing.spreadColumn]}>
            <TouchableOpacity style={[createSquare(.0675,2,active ? 'firebrick' :'transparent',.75,.9),{backgroundColor:'ghostwhite'}]}>
            <Ionicons name={this.props.icon} color={'firebrick'} size={20}/>
                {/*<Spacer spacing={.0125}/>*/}
                {/*<Text style={[{fontSize:12}]}>Close To Me</Text>*/}
            </TouchableOpacity>
                <Text style={[{fontSize:10,color:'firebrick',fontWeight:'700'}]}>{this.props.text}</Text>
            </View>
        )
    }


}
