import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";


export default class LiveButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active:false
        }

    }

    activateButton = async () => {
        //must complete api call to like or unlike
    }

    render() {

        let id = this.props.id;
        let activeIcon = this.props.activeIcon;
        let inactiveIcon = this.props.inactiveIcon;
        let activeColor = this.props.activeColor;
        return (
            <TouchableOpacity onPress={this.activateButton} style={[flexing.rowStart]}>
                {this.state.active ?
                    <Ionicons name={activeIcon} color={activeColor} size={20}/>

                    :
                    <Ionicons name={inactiveIcon} color={'gray'} size={20}/>

                }
                <Spacer xAxis spacing={.0125}/>

                <Text>Admire</Text>
            </TouchableOpacity>
        )
    }


}
