import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
import {flexing} from "../../styles/dimensions/dims";
import {checkLocationPermissions} from "../../permissionCalls/location";
import {grabPushToken, getPermissions} from "../../permissionCalls/notifications";
import {updatePushToken} from "../../firebase/fireStarter";


export default class NotificationSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            granted:false,
            permVerified:false,
            canAskAgain:false
        }

    }

    componentDidMount() {
        this.checkNotification();
    }

    startPermissionRequest = async () => {
        let response = await getPermissions(true);
        if(response.permitted) {
            let answer = await grabPushToken();
            return updatePushToken(answer)

        }
    }


    returnPermissionStatusResponse = () => {
        if(this.state.granted) {
            return(
                <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                    You are currently allowing The 43 Initiative to send you push notifications. If you'd like to restrict push notifications please go
                    to the 'Settings' section of your phone and change it there.
                </Text>
            )
        } else {
            if(this.state.canAskAgain) {
                return(
                    <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                        You are not currently allowing The 43 Initiative to send push notifications. If you'd like to enable push notifications please go
                        tap the button below and allow push notifications when prompted.
                    </Text>
                )
            } else {
                return(
                    <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                        You are not currently allowing The 43 Initiative to send push notifications. If you'd like to enable push notifications please go
                        to the 'Settings' section of your phone and change it there.
                    </Text>
                )
            }

        }
    }

    submitLocationPermission = async () => {

    }

    checkNotification = async () => {
        let check = await getPermissions(false);
        console.log(check,'notif check')
        if(check.permitted) {
            this.setState({permVerified:true,granted:true})
            let response = await grabPushToken();
            return updatePushToken(response)
        } else {
            if(check.canAskAgain) {

            } else {
                this.setState({permVerified:true,granted:false,canAskAgain:check.canAskAgain})
            }
        }
    }

    returnPermissionButton = () => {
        if(!this.state.granted && this.state.canAskAgain) {
            return( <View style={[{position:'absolute',top:'75%',width:'90%',marginLeft:'5%',height:'10%'}]}>
                <RoundedButton pressed={()=>{this.startPermissionRequest()}} style={[{width:'90%',marginLeft:'5%',height:'100%'}]} bgColor={'#c6302c'} text={'Turn On Notifications'}/>

            </View>)
        }
    }

    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <View style={[{position:'absolute',width:'90%',marginTop:'2.5%',marginLeft:'5%'}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <View style={[{marginTop:'15%',width:'90%',marginLeft:'5%'}]}>
                    <View style={[flexing.rowStart]}>
                        <Ionicons name={'ios-notifications-circle'} size={30} color={'#c6302c'}/>
                        <Spacer spacing={.025} xAxis/>
                        <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                            Your Notification Settings
                        </Text>
                    </View>


                    {this.returnPermissionStatusResponse()}

                    <Spacer spacing={.6}/>
                    {this.returnPermissionButton()}
                </View>
            </Animated.View>
        )
    }


}
