import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";


export default class NotificationListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[flexing.rowStart,{width:'100%',padding:'2.5%',backgroundColor:'#e3e3e3'}]}>
            <View style={[createCircle(.075,0,'transparent'),{overflow:'hidden',backgroundColor:'black'}]}>
                <Image  style={[{width:'100%',height:'100%'}]} source={{uri:'https://www.intouchweekly.com/wp-content/uploads/2019/08/kylie-jenner-sexiest-moments-02.jpg?fit=772%2C762&quality=86&strip=all'}} resizeMode={'cover'} />

            </View>
                <Spacer xAxis spacing={.0275} />
                <View style={[{width:'65%'},flexing.startColumn]}>
                    <Text style={[{fontSize:14}]}>Kim Anderson just admired your PIF, you're getting noticed!</Text>
                    <Spacer spacing={.005}/>
                    <Text style={[{fontSize:10,color:"#101010"}]}>Just Now</Text>
                </View>
            </Animated.View>
        )
    }


}
