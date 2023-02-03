import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";


export default class NotificationButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                //console.log(this.props)
                console.log('here')
                this.props.navigation.push('Profile')
            }} style={[{width:'50%',borderWidth:0,borderColor:'black'},flexing.centerColumn]}>
                <Ionicons name={'ios-notifications-outline'} color={'black'} size={30}/>
            </TouchableOpacity>
        )
    }


}
