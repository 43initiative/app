import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
import {flexing} from "../../styles/dimensions/dims";
import {checkLocationPermissions} from "../../permissionCalls/location";
import {getPermissions} from "../../permissionCalls/imagePicking";


export default class CameraSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            granted:false,
            permVerified:false,
            canAskAgain:false
        }

    }

    componentDidMount() {
        this.checkCamera()
    }


    returnPermissionStatusResponse = () => {
        if(this.state.granted) {
            return(
                <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                    You are currently allowing The 43 Initiative access to your photos and videos. If you'd like to restrict access to your photos and videos please go
                    to 'Settings' section of your phone and change it there.
                </Text>
            )
        } else {
            if(this.state.canAskAgain) {
                return(
                    <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                        You are not currently allowing The 43 Initiative access to your photos and videos.  If you'd like to enable access to your photos and videos please
                        tap the button below and allow access when prompted.
                    </Text>
                )
            } else {
                return(
                    <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                        You are not currently allowing The 43 Initiative access to your photos and videos. If you'd like to restrict access to your photos and videos please go
                        to 'Settings' section of your phone and change it there.

                    </Text>
                )
            }

        }
    }

    submitCameraPermission = async () => {

    }

    checkCamera = async () => {
        let check = await getPermissions(false,'camera');
        console.log(check,'look for resposne')
        if(check.permitted) {
            this.setState({permVerified:true,granted:true})
        } else {
            this.setState({permVerified:true,granted:false,canAskAgain:check.canAskAgain})
        }
    }

    getCamPerm = async () => {
        let check = await getPermissions(false,'camera');
        console.log(check,'look for resposne')
        if(check.permitted) {
            this.setState({permVerified:true,granted:true})
        } else {
            this.setState({permVerified:true,granted:false,canAskAgain:check.canAskAgain})
        }
    }

    returnPermissionButton = () => {
        if(!this.state.granted) {
            return( <View style={[{position:'absolute',top:'75%',width:'90%',marginLeft:'5%',height:'10%'}]}>
                <RoundedButton pressed={()=>{this.getCamPerm()}} style={[{width:'90%',marginLeft:'5%',height:'100%'}]} bgColor={'#3EB489'} text={'Enable Camera Access'}/>

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
                        <Ionicons name={'ios-notifications-circle'} size={30} color={'#3EB489'}/>
                        <Spacer spacing={.025} xAxis/>
                        <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                            Your Camera Settings
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
