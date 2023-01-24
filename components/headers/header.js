import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing, dimensions} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[{width:'95%',marginLeft:'2,5%',height:dimensions.returnHeight(.075)},flexing.rowBetween]}>
            <View style={[flexing.rowStart,{width:'25%'}]}>
                <View style={{width:'50%'}}>
                    <Image resizeMode={'contain'} style={{width:'100%',position:'absolute'}} source={require('../../assets/img/logo43only.png')}/>
                    <Image resizeMode={'contain'} style={{width:'100%'}} source={require('../../assets/img/logoringonly.png')}/>
                </View>
                {/*<Ionicons name={'ios-heart-half'} size={30} color={'firebrick'}/>*/}
                <Spacer spacing={.0125} xAxis/>
                <Text style={[{color:'#101010',fontStyle:'normal',fontWeight:'bold',fontSize:20}]}>Initiative</Text>
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
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchUsers')}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-search'} size={20} color={'black'}/>
                    </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }


}
