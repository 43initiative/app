import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import InitialOrPic from "../buttons/initialOrPic";


export default class SentNom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        let data = this.props.data;
        let displayName= data.nominatedDisplayName ? data.nominatedDisplayName : data.nominatedInitials;
        let message = data.nominationMsg;
        return (
            <Animated.View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%',padding:'5%',borderRadius:20,backgroundColor:'#f3f3f3',alignItems:'flex-start',marginTop:'5%',minHeight:Dimensions.get('window').height * .15}]}>
                <InitialOrPic navigation={this.props.navigation} route={this.props.route} imgProvided={data.nominatedImgProvided} img={data.nominatedImg} initials={data.nominatedInitials}  userUid={data.nominatedId} circleRadius={.05}/>
                <View style={[flexing.startColumn,{width:'80%',justifyContent:'space-between',height:Dimensions.get('window').height * .125}]}>
                    <Text style={[{fontSize:18,fontWeight:'bold',color:'black'}]}>{displayName}</Text>
                    <Text style={[{fontSize:15,fontWeight:'400',color:'black'}]}>"..{message}.."</Text>
                    <View style={[flexing.rowAround,{width:'75%'}]}>
                        <TouchableOpacity onPress={this.props.viewPost} style={[flexing.centerColumn,{borderColor:'black',borderWidth:1,width:'45%',borderRadius:15,height:Dimensions.get('window').height * .0325}]}>
                            <Text style={[{color:'black'}]}>View Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.props.withdraw} style={[flexing.centerColumn,{borderColor:'firebrick',borderWidth:1,width:'45%',borderRadius:15,height:Dimensions.get('window').height * .0325}]}>
                            <Text style={[{color:'firebrick',fontWeight:'bold'}]}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }


}
