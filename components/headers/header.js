import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {flexing, dimensions} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[{width:'95%',marginLeft:'2,5%',height:dimensions.returnHeight(.075)},flexing.rowBetween]}>
            <View style={[flexing.rowStart]}>
                <Ionicons name={'ios-heart-half'} size={30} color={'firebrick'}/>
                <Text style={[{color:'firebrick',fontWeight:'bold',fontSize:25}]}>43Initiative</Text>
            </View>
                <View style={[flexing.rowAround,{width:'40%'}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PostModal')}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-add'} size={20} color={'black'}/>
                    </View>
                    </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AltProfile')}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-person'} size={20} color={'black'}/>
                    </View>
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Settings')}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-settings'} size={20} color={'black'}/>
                    </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }


}
