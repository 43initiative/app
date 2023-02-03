import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import TextLink from "../../components/text/textLink";
import Hstack from "../../designComps/hstack";
import OutlineButton from "../../components/buttons/outlineButton";
import {grabPushToken, getPermissions} from "../../permissionCalls/notifications";


export default class NotificationPerm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    runNotificationPerm = async () => {
        let response = await getPermissions(true);
        console.log(response)
        if(response.permitted) {
            // let token = await grabPushToken();
            // console.log(token)
            this.props.navigation.navigate('FinishScreen')
        }
        this.props.navigation.navigate('FinishScreen')

    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                <VStack jc={'space-around'} width={1} trueSize={false} height={.9}>
                    <VStack al={'flex-start'} jc={'space-around'} height={.15} top={.05} width={.9} trueSize={false} style={{}}>
                        <Text style={[{fontSize:25,fontWeight:'bold',color:'#101010',width:'100%'}]}>Turn on Notifications</Text>
                        <Text style={[{fontSize:13.75,color:'gray',width:'85%'}]}>
                            Turn on push notifications so you can up to date with all the good deeds occurring around you.
                        </Text>
                    </VStack>
                    <VStack top={.1} width={1} height={.6} style={[{backgroundColor:'white'}]}>
                        <Image resizeMode={'contain'} style={[{width:'100%'}]} source={require('../../assets/img/notification.png')}/>
                    </VStack>
                    <Hstack jc={'space-around'} width={.9} trueSize={false} height={.2}>
                        <OutlineButton  borderWidth={1} pressed={()=>{this.props.navigation.navigate('FinishScreen')}} style={[{width:'45%',height:'35%'}]} borderColor={'#c6302c'} textColor={'#c6302c'} text={`No Thanks`}/>
                        <RoundedButton pressed={()=>{this.runNotificationPerm()}} style={[{width:'45%',height:'35%'}]} bgColor={'#c6302c'} text={`Yes,Notify Me`}/>

                    </Hstack>
                    <TextLink pressed={()=>{this.props.navigation.goBack()}} textStyles={[{color:'red'}]} text={'Go Back'}/>

                </VStack>
            </Animated.View>
        )
    }


}
