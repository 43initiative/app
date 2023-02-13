import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {signUpUser, checkForUser, signOutUser} from "../firebase/cleanTest";
import {startNetworkWatcher, checkForOnboarding, checkForActiveUser, initialize, storeUserData} from '../firebase/fireStarter'
import {waitACertainTime} from "../helperFuncs/timers/wait";
import {flexing, screens} from "../styles/dimensions/dims";
import Spacer from "../design/spacer";


export default class AltSPlash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: new Animated.Value(0),
            textAnimation: new Animated.Value(0)
        }

    }

    componentDidMount() {
        this.startAnimation()
        this.runSequence()
    }

    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 4000,
            useNativeDriver:true
        }).start(() => {
            this.runTextSequence();
            //this.state.animation.setValue(0);
        });
    }

    runTextSequence = () => {
        Animated.timing(this.state.textAnimation, {
            toValue: 1.25,
            duration: 2500,
            useNativeDriver:true
        }).start(() => {
            //this.runTextSequence();
            //this.state.animation.setValue(0);
        });
    }

    runSequence = async () => {
        startNetworkWatcher()
        let response = await initialize();
        await waitACertainTime(6500)

        if(!response.passed) {
            alert('error has occurred please kill app')
        }
        let userCheck = await checkForActiveUser();
        if(!userCheck) {
            //navigate to registration
            this.props.navigation.navigate('RegistrationStack')
        } else {
            let userDataCheck = await checkForOnboarding()
            if(!userDataCheck) {
                //navigate to onboarding
                this.props.navigation.navigate('OnboardingStack')
            } else {
                //navigate to tabs
                let storeUser = await storeUserData();
                if(storeUser.passed) {
                    this.props.navigation.navigate('TabStack')
                } else {
                    alert('login failed due to data not being present')
                }
                this.props.navigation.navigate('TabStack')

            }

            console.log(userDataCheck)
        }

    }

    render() {
        const xInterpolate = this.state.animation.interpolate({
            inputRange: [0,.25,.5,1],
            outputRange: ["0deg", "-360deg","-540deg","-720deg"],
        });

        const textDont = this.state.animation.interpolate({
            inputRange: [0,.2,.35,.75,1],
            outputRange: [0,1,1,1,1],
        });

        const yInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "0deg", "180deg"],
        });
        return (
                <Animated.View style={[screens.fullScreen,flexing.centerColumn,{backgroundColor:'white',justifyContent:'flex-start'}]}>
                    <Spacer spacing={.1}/>
                    <Animated.Image  resizeMode={'contain'} source={require('../assets/img/logoringonly.png')} style={[
                        {top:'5%',width:'80%',position:'absolute',
                        transform:[{ rotate: xInterpolate }]}]}/>
                    <Animated.Image  resizeMode={'contain'} source={require('../assets/img/logo43only.png')} style={[{top:'5%',width:'80%',position:'absolute'}]}/>

                    <View style={[{position:'absolute',backgroundColor:'transparent',zIndex:1000,height:'10%',top:'52.50%',width:'80%',left:'15%',transform:[
                            {rotate:'-20deg'}
                        ]},flexing.startColumn,{justifyContent:'space-between'}]}>

                        <Animated.Text style={[{fontWeight:'bold',fontSize:32.5,opacity:this.state.animation.interpolate({
                                inputRange: [0,.99,1],
                                outputRange: [0,0,1]
                            })}]}>Love You</Animated.Text>
                        <View style={[flexing.rowStart]}>
                            <Animated.Text style={[{fontWeight:'bold',fontSize:30,opacity:this.state.textAnimation.interpolate({
                                    inputRange: [0,.5,.75,.85,1],
                                    outputRange: [0,1,1,1,1],
                                })}]}>"Don't </Animated.Text>
                            <Animated.Text style={[{fontWeight:'bold',fontSize:30,opacity:this.state.textAnimation.interpolate({
                                    inputRange: [0,.5,.75,.85,1],
                                    outputRange: [0,0,1,1,1],
                                })}]}>Stop </Animated.Text>
                            <Animated.Text style={[{fontWeight:'bold',fontSize:30,opacity:this.state.textAnimation.interpolate({
                                    inputRange: [0,.5,.75,.85,1],
                                    outputRange: [0,0,0,1,1],
                                })}]}>Believing" </Animated.Text>




                        </View>


                    </View>

            {/*<TouchableOpacity onPress={()=>{signOutUser()}}>*/}
            {/*    <Text>sign out user</Text>*/}
            {/*</TouchableOpacity>*/}

            {/*    <TouchableOpacity onPress={()=>{checkForUser()}}>*/}
            {/*        <Text>check out user</Text>*/}
            {/*    </TouchableOpacity>*/}

            {/*    <TouchableOpacity onPress={()=>{signUpUser('goramaa@gmail.com','somethings')}}>*/}
            {/*        <Text>sign user</Text>*/}
            {/*    </TouchableOpacity>*/}
            </Animated.View>
        )
    }


}
