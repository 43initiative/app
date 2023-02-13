import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {waitACertainTime} from "../helperFuncs/timers/wait";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {branding} from "../appSpecifics/branding";
import {flexing, screens} from '../styles/dimensions/dims'
//import  {getData,addData,initialize} from "../firebase/newFIre";
import {startNetworkWatcher, initialize} from '../firebase/fireStarter'
import Spacer from "../design/spacer";
import {checkForUser,checkForSignUpCompletion} from "../firebase/newFIre";
import {showToastMessage, storeControllers} from "../reducers/controllers";
import {} from "../firebase/userData";
export default class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
       this.runPreperationChecks();
         //showToastMessage('You havessss signed up','Your sign up is complete!','ios-person')
        //this.startFire()

    }

    startFire = async () => {
        //initialize the firebase database
        console.log('starting net watcher')
        startNetworkWatcher();
        const {db,app} = await initialize();
        console.log('start fire has commenceed', db)
        let store = storeControllers.store;
         let dbs = store.getState().globe.fireStoreDb;
         console.log(dbs,'duped')
        // const data = await addData(db);
        //const data = getData(db)
        return {db,app}
    }

    saveUserDataToStore = async () => {
        //need to save user data to the store
        //get user Uid
    }

    runPreperationChecks = async () => {
        try {
            console.log('first')
            let timeHandler;
            let {db,app} = await this.startFire();
            console.log(db,app,'details')
            await waitACertainTime(6000,timeHandler);
            let accessTokenExists = await this.checkForAccessToken();
            let firebaseAuthCheck = await checkForUser();
            console.log(firebaseAuthCheck,'auth checkss')
            if(accessTokenExists) {
                //push to live view
                if(firebaseAuthCheck) {
                    console.log('token exissts, transition to live view');
                    //check to see if sign up has been completed
                    let store = storeControllers.store;
                    let dbs = store.getState().globe.fireStoreDb;
                    let check = await checkForSignUpCompletion(db);
                    console.log('precheck')
                    if(check) {
                        //this.saveUserData()
                        console.log('here')
                        this.props.navigation.navigate('TabStack')
                    } else {
                        this.props.navigation.navigate('OnboardingStack')
                    }

                } else {
                    console.log('token exists, but firebase auth id has timed out')
                    await this.deleteAccessToken();
                    return this.navigate('RegistrationStack')
                }
            } else {

                //push to signup/login
                console.log('token does not exist, transition to registration')
                return this.navigate('RegistrationStack')
            }
        } catch (e) {
            console.log(e,'this is errors')
            return this.navigate('RegistrationStack')

        }
        //run all needed preparation checks here
        //we simulate this with the function below for now

        //return this.navigate(SPLASH)
    }

    checkForAccessToken = async () => {
        return await AsyncStorage.getItem('exAccessToken');
    }

    deleteAccessToken = async () => {
        return await AsyncStorage.removeItem('exAccessToken');
    }

    navigate = async (screen) => {
        return this.props.navigation.navigate(screen)
    }

    render() {
        return (
            <Animated.View style={[screens.fullScreen,flexing.centerColumn,{backgroundColor:'white',justifyContent:'flex-start'}]}>
               <Spacer spacing={.1}/>
                <Animated.Image  resizeMode={'contain'} source={require('../assets/img/43v8.png')} style={[{width:'80%'}]}/>
            </Animated.View>
        )
    }


}

