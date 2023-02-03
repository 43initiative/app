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
                        You are currently allowing The 43 Initiative access to your photos and videos. If you'd like to restrict access to your photos and videos please go
                        to 'Settings' section of your phone and change it there.
                    </Text>
                )
            } else {
                return(
                    <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                        You are currently allowing The 43 Initiative access to your photos and videos.  If you'd like to enable access to your photos and videos please
                        tap the button below and allow access when prompted.

                    </Text>
                )
            }

        }
    }

    submitCameraPermission = async () => {

    }

    checkCamera = async () => {
        let check = await getPermissions(false);
        if(check.permitted) {
            this.setState({permVerified:true,granted:true})
        } else {
            this.setState({permVerified:true,granted:false,canAskAgain:check.canAskAgain})
        }
    }

    returnPermissionButton = () => {
        if(!this.state.granted && this.state.canAskAgain) {
            return( <View style={[{position:'absolute',top:'75%',width:'90%',marginLeft:'5%',height:'15%'}]}>
                <RoundedButton pressed={()=>{this.submitCameraPermission()}} style={[{width:'90%',marginLeft:'5%',height:'50%'}]} bgColor={'#c6302c'} text={'Submit Email'}/>

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
                        <Ionicons name={'ios-camera'} size={30} color={'#c6302c'}/>
                        <Spacer spacing={.025} xAxis/>
                        <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                            Your Camera Settings
                        </Text>
                    </View>


                    {this.returnPermissionStatusResponse()}


                </View>
            </Animated.View>
        )
    }


}
