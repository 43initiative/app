import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {signUpUser, checkForUser, signOutUser} from "../firebase/cleanTest";
import {checkForOnboarding, checkForActiveUser, initialize, storeUserData} from '../firebase/fireStarter'
import {waitACertainTime} from "../helperFuncs/timers/wait";
import {flexing, screens} from "../styles/dimensions/dims";
import Spacer from "../design/spacer";


export default class AltSPlash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: new Animated.Value(0),
        }

    }

    componentDidMount() {
        this.startAnimation()
        this.runSequence()
    }

    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 5500,
            useNativeDriver:true
        }).start(() => {
            this.state.animation.setValue(0);
        });
    }

    runSequence = async () => {

        let response = await initialize();
        await waitACertainTime(6000)

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

        const yInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "0deg", "180deg"],
        });
        return (
                <Animated.View style={[screens.fullScreen,flexing.centerColumn,{backgroundColor:'white',justifyContent:'flex-start'}]}>
                    <Spacer spacing={.1}/>
                    <Animated.Image  resizeMode={'contain'} source={require('../assets/img/logoringonly.png')} style={[
                        {top:'10%',width:'80%',position:'absolute',
                        transform:[{ rotate: xInterpolate }]}]}/>
                    <Animated.Image  resizeMode={'contain'} source={require('../assets/img/logo43only.png')} style={[{top:'10%',width:'80%',position:'absolute'}]}/>
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
