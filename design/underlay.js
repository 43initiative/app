import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {displays,screens} from '../../styles/global'

export default class Underlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[screens.fullScreen,screens.overlay,displays.absolute(-1),{
                opacity:this.props.opacity.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,.4]
                })
            }]}>

            </Animated.View>
        )
    }


}
