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

        this.state = {}

    }

    componentDidMount() {
        this.runSequence()
    }

    runSequence = async () => {

        let response = await initialize();
        await waitACertainTime(3000)

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
        return (
                <Animated.View style={[screens.fullScreen,flexing.centerColumn,{backgroundColor:'white',justifyContent:'flex-start'}]}>
                    <Spacer spacing={.1}/>
                    <Animated.Image  resizeMode={'contain'} source={require('../assets/img/43v8.png')} style={[{width:'80%'}]}/>
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
