import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable,Dimensions
} from 'react-native';
import VStack from "./vstack";


export default class Square extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        const size = Dimensions.get('window').height * this.props.size
        return (
            <View

            style={[{ display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center',justifyContent:'center',borderWidth:1,borderRadius:5,backgroundColor:this.props.backgroundColor,borderColor:this.props.borderColor,height:size,width:size},this.props.style]}
            >
                {this.props.children}

            </View>
        )
    }


}
