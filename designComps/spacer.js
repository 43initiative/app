import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import styles from "../styles/globals/layout";


export default class Spacer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[
                this.props.trueSize ?
                    {
                        height:this.props.height ? this.props.height *  Dimensions.get('window').height : '0%',
                        width:this.props.width ? this.props.width * Dimensions.get('window').width : '0%',

                    }
                    :
                    {
                        height:this.props.height ? `${this.props.height * 100}%` : '100%',
                        width:this.props.width ? `${this.props.width * 100}%` : '0%'}
            ]}>

            </Animated.View>
        )
    }


}
