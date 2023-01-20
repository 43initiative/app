import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../../scaffold/splash";
import Login from "../../screens/registration/login";
import SignUp from "../../screens/registration/signUp";
import Welcome from '../../screens/onboarding/welcome'
import Personal from "../../screens/onboarding/personal";
import AddImg from "../../screens/onboarding/addImg";
import AddBio from "../../screens/onboarding/addBio";
import NotificationPerm from "../../screens/onboarding/NotificationPerm";
import LocationPerm from "../../screens/onboarding/LocationPerm";
import Finish from "../../screens/onboarding/finish";
const Stack = createNativeStackNavigator();

function WelcomeScreen({route,navigation}) {
    return(
        <Welcome route={route} navigation={navigation}/>
    )
}

function PersonDetailsScreen({route,navigation}) {
    return(
        <Personal route={route} navigation={navigation}/>
    )
}

function AddImageScreen({route,navigation}) {
    return(
        <AddImg route={route} navigation={navigation}/>
    )
}

function AddBioScreen({route,navigation}) {
    return(
        <AddBio route={route} navigation={navigation}/>
    )
}

function NotificationPermScreen({route,navigation}) {
    return(
        <NotificationPerm route={route} navigation={navigation}/>
    )
}

function LocationPermScreen({route,navigation}) {
    return(
        <LocationPerm route={route} navigation={navigation}/>
    )
}

function FinishScreen({route,navigation}) {
    return(
        <Finish route={route} navigation={navigation}/>
    )
}


export function OnboardingStack() {
    return (<Stack.Navigator initialRouteName={'WelcomeScreen'}>
        <Stack.Screen
            options={{headerShown: false}}
            name="WelcomeScreen" component={WelcomeScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="PersonalScreen" component={PersonDetailsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="AddImgScreen" component={AddImageScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="AddBioScreen" component={AddBioScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="LocationScreen" component={LocationPermScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="NotificationScreen" component={NotificationPermScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="FinishScreen" component={FinishScreen}/>





    </Stack.Navigator>)

}
