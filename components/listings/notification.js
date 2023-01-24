import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import InitialOrPic from "../buttons/initialOrPic";
import {convertTimeStamp} from "../../helperFuncs/dateTime";
import {getUserProfile} from "../../firebase/fireStarter";

export default class NotificationListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    navigateNotification = async () => {
        let data =this.props.data;
        switch(data.type) {
            case 'follow' : {
                return getUserProfile(this.props.navigation,this.props.route,null,data.userUid)
            }
        }
    }

    render() {
        let data = this.props.data;
        return (
            <TouchableOpacity onPress={this.navigateNotification} style={[flexing.rowStart,{width:'100%',padding:'2.5%',backgroundColor:'#e3e3e3'}]}>
                <InitialOrPic circleRadius={.075} navigation={this.props.navigation} route={this.props.route} initials={data.initials} imgProvided={data.imgProvided} img={data.img} userUid={data.id}/>
                <Spacer xAxis spacing={.0275} />
                <View style={[{width:'65%'},flexing.startColumn]}>
                    <Text style={[{fontSize:14}]}>{data.message}</Text>
                    <Spacer spacing={.005}/>
                    <Text style={[{fontSize:10,color:"#101010"}]}>{convertTimeStamp(data.timestamp)}</Text>
                </View>
            </TouchableOpacity>
        )
    }


}
