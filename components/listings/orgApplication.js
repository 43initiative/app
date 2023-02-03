import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import Circle from "../../designComps/circle";
import {formatTimestamp} from "../../helperFuncs/dateTime";

export default class OrgApplication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        //img
        //name
        //status
        //message
        let data = this.props.data;
        return (
            <Animated.View style={[flexing.rowAround,{width:'100%'}]}>
                <Circle size={.0625}>
                    <Image resizeMode={"cover"} style={{width:'100%',height:'100%',borderRadius:100,borderWidth:0}} source={{uri:data.img}}/>
                </Circle>
                <View style={[flexing.startColumn]}>
                    <Text style={[{color:'black',fontWeight:'bold',fontSize:16}]}>{data.name}</Text>
                    <Text style={[{color:'black',fontWeight:'400',fontSize:14}]}>{data.appMsg}</Text>
                    <Text style={[{fontSize:12,color:'gray'}]}>Submitted: {formatTimestamp(data.timestamp)}</Text>
                </View>
            </Animated.View>
        )
    }


}
