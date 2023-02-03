import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import TextLink from "../../components/text/textLink";
import Hstack from "../../designComps/hstack";
import OutlineButton from "../../components/buttons/outlineButton";
import {runInitialLocationChecks, startLocationTracking} from "../../permissionCalls/location";
import {activateLoading, deactivateLoading, storeControllers} from "../../reducers/controllers";


export default class LocationPerm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    checkLocationTracking = async () => {
        activateLoading()
        let response = await runInitialLocationChecks();
        if(response.passed) {
            let locationData = await startLocationTracking();
            let {lat,long} = locationData;
            let store = storeControllers.store;
            store.dispatch({type:'SET_LOCATION',payload: {lat,long}});
            deactivateLoading()
            this.props.navigation.navigate('NotificationScreen')
        }
        this.props.navigation.navigate('NotificationScreen')

    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                <VStack jc={'space-around'} width={1} trueSize={false} height={.9}>
                    <VStack al={'flex-start'} jc={'space-around'} height={.15} top={.05} width={.9} trueSize={false} style={{}}>
                        <Text style={[{fontSize:25,fontWeight:'bold',color:'#101010',width:'100%'}]}>Share Your Location</Text>
                        <Text style={[{fontSize:13.75,color:'gray',width:'85%'}]}>
                            We use your location to help show all the good deeds that are occurring all around you.
                        </Text>
                    </VStack>
                    <VStack top={.1} width={1} height={.6} style={[{backgroundColor:'white'}]}>
                        <Image resizeMode={'contain'} style={[{width:'100%'}]} source={require('../../assets/img/location.png')}/>
                    </VStack>
                    <Hstack jc={'space-around'} width={.9} trueSize={false} height={.2}>
                        <OutlineButton  borderWidth={1} pressed={()=>{this.props.navigation.navigate('NotificationScreen')}} style={[{width:'45%',height:'35%'}]} borderColor={'#c6302c'} textColor={'#c6302c'} text={`Don't Share`}/>
                        <RoundedButton pressed={()=>{this.checkLocationTracking()}} style={[{width:'45%',height:'35%'}]} bgColor={'#c6302c'} text={`Share Location`}/>

                    </Hstack>
                    <TextLink pressed={()=>{this.props.navigation.goBack()}} textStyles={[{color:'red'}]} text={'Go Back'}/>

                </VStack>
            </Animated.View>
                    )
    }


}
