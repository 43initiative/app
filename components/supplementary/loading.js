import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ActivityIndicator
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";




export default class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            this.props.showLoading &&
            <Animated.View style={[{width:'100%',height:'100%',position:'absolute',top:0,left:0},flexing.centerColumn]}>
                <ActivityIndicator size={'large'}/>
            </Animated.View>
        )
    }


}

