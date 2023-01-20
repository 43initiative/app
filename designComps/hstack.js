import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable,Dimensions
} from 'react-native';
import styles from '../styles/globals/layout'

export default class Hstack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[styles.horizontal,this.props.style,{
                alignItems:this.props.al ? this.props.al : 'center',
                justifyContent:this.props.jc ? this.props.jc : 'flex-start',
                alignContent:this.props.ac ? this.props.ac : 'flex-start',
            },
                this.props.trueSize ?
                    {marginTop:this.props.top ?  this.props.top *  Dimensions.get('window').height : 0,
                        height:this.props.height ? this.props.height *  Dimensions.get('window').height : '0%',
                        width:this.props.width ? this.props.width * Dimensions.get('window').width : '0%',
                        marginLeft:this.props.left ?  this.props.left *  Dimensions.get('window').width : 0,
                    }
                    :
                    {marginTop:this.props.top ?  `${this.props.top * 100}%` : 0,
                        height:this.props.height ? `${this.props.height * 100}%` : '0%',
                        width:this.props.width ? `${this.props.width * 100}%` : '0%',
                        marginLeft:this.props.left ? `${this.props.left * 100}%` : '0%'}
            ]}>
                {this.props.children}
            </Animated.View>
        )
    }


}
