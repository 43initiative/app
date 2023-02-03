import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing, dimensions} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";


export default class OrgProfileHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[{width:'100%',marginLeft:'0%',paddingLeft:'5%',paddingRight:'5%',height:dimensions.returnHeight(.08),backgroundColor:'white'},flexing.rowBetween]}>
                <View style={[flexing.rowStart,{width:'25%'}]}>
                    <Text style={[{color:'#101010',fontStyle:'normal',fontWeight:'bold',fontSize:30}]}>Menu</Text>
                </View>
                <View style={[flexing.rowStart]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AltPoster')}}>
                        <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                            <Ionicons style={[{fontWeight:'bold'}]} name={'ios-add'} size={20} color={'black'}/>
                        </View>
                    </TouchableOpacity>
<Spacer spacing={.025} xAxis/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('OrgSettings')}}>
                        <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                            <Ionicons style={[{fontWeight:'bold'}]} name={'ios-settings'} size={20} color={'black'}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }


}
