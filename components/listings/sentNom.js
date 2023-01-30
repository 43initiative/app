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
        let displayName= data.nominatorDisplayName ? data.nominatorDisplayName : data.nominatorInitials;
        let message = data.nominationMsg;
        return (
            <Animated.View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%',alignItems:'flex-start',marginTop:'5%',minHeight:Dimensions.get('window').height * .15}]}>
                <InitialOrPic imgProvided={data.nominatorImgProvided} img={data.nominatorImg} initials={data.nominatorInitials}  userUid={data.nominatorId} circleRadius={.05}/>
                <View style={[flexing.startColumn,{width:'80%',justifyContent:'space-between',height:Dimensions.get('window').height * .125}]}>
                    <Text style={[{fontSize:18,fontWeight:'bold',color:'black'}]}>{displayName}</Text>
                    <Text style={[{fontSize:15,fontWeight:'400',color:'black'}]}>"..{message}.."</Text>
                    <View style={[flexing.rowAround,{width:'65%'}]}>
                        <TouchableOpacity onPress={this.props.viewPost} style={[flexing.centerColumn,{borderColor:'purple',borderWidth:1,width:'45%',borderRadius:8,height:Dimensions.get('window').height * .0325}]}>
                            <Text style={[{color:'purple',fontWeight:'bold'}]}>View Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.props.withdraw} style={[flexing.centerColumn,{backgroundColor:'firebrick',borderWidth:0,width:'45%',borderRadius:8,height:Dimensions.get('window').height * .0325}]}>
                            <Text style={[{color:'white',fontWeight:'bold'}]}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }


}
