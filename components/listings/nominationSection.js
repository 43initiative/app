import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import InitialOrPic from "../buttons/initialOrPic";
import Spacer from "../../design/spacer";


export default class NominationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        let data = this.props.data;
        let displayName= data.nominatorDisplayName ? data.nominatorDisplayName : data.nominatorInitials;
        let message = data.nominationMsg;
        return (
            <Animated.View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%',alignItems:'flex-start',marginTop:'5%',minHeight:Dimensions.get('window').height * .1}]}>
                <InitialOrPic noPress route={this.props.route} navigation={this.props.navigation} imgProvided={data.nominatorImgProvided} img={data.nominatorImg} initials={data.nominatorInitials}  userUid={data.nominatorId} circleRadius={.05}/>
                <View style={[flexing.startColumn,{width:'80%',justifyContent:'flex-start',minHeight:Dimensions.get('window').height * .125}]}>
                    <Text style={[{fontSize:18,fontWeight:'bold',color:'black'}]}>{displayName}</Text>
                    <Spacer spacing={.0125}/>
                    <Text style={[{fontSize:15,fontWeight:'400',color:'black'}]}>"..{message}.."</Text>
                </View>
            </Animated.View>
        )
    }


}
