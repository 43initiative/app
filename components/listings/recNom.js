import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import InitialOrPic from "../buttons/initialOrPic";
import {Ionicons} from "@expo/vector-icons";


export default class RecNom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        let data = this.props.data;
        let displayName= data.nominatorDisplayName ? data.nominatorDisplayName : data.nominatorInitials;
        let message = data.nominationMsg;
        return (
            <Animated.View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%',padding:'5%',borderRadius:20,backgroundColor:'#f3f3f3',alignItems:'flex-start',marginTop:'5%',minHeight:Dimensions.get('window').height * .15}]}>
                <InitialOrPic route={this.props.route} navigation={this.props.navigation} imgProvided={data.nominatorImgProvided} img={data.nominatorImg} initials={data.nominatorInitials}  userUid={data.nominatorId} circleRadius={.05}/>
                <View style={[flexing.startColumn,{width:'80%',justifyContent:'space-between',height:Dimensions.get('window').height * .125}]}>
                    <Text style={[{fontSize:18,fontWeight:'bold',color:'black'}]}>{displayName}</Text>
                    <Text style={[{fontSize:15,fontWeight:'400',color:'black'}]}>"..{message}.."</Text>

                    {this.props.completed ?
                        <></> :

                        <View style={[flexing.rowAround,{width:'100%'}]}>
                            <TouchableOpacity onPress={this.props.postNow} style={[flexing.centerColumn,{backgroundColor:'#3EB489',borderWidth:0,width:'45%',borderRadius:15,height:Dimensions.get('window').height * .0325}]}>
                                <Text style={[{color:'white',fontWeight:'bold'}]}>Pay It Forward</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.viewPost} style={[flexing.centerColumn,{borderColor:'black',borderWidth:1,width:'20%',borderRadius:15,height:Dimensions.get('window').height * .0325}]}>
                                <Ionicons name={'ios-search'} color={'black'} size={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.reject} style={[flexing.centerColumn,{borderColor:'firebrick',borderWidth:1,width:'20%',borderRadius:15,height:Dimensions.get('window').height * .0325}]}>
                                <Ionicons name={'ios-trash'} color={'firebrick'} size={20}/>
                            </TouchableOpacity>

                        </View>

                    }

                </View>
            </Animated.View>
        )
    }


}
