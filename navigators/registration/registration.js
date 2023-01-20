import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../../scaffold/splash";
import Login from "../../screens/registration/login";
import SignUp from "../../screens/registration/signUp";

const Stack = createNativeStackNavigator();

function LoginScreen({route,navigation}) {
    return(
        <Login route={route} navigation={navigation}/>
    )
}

function SignUpScreen({route,navigation}) {
    return(
        <SignUp route={route} navigation={navigation}/>
    )
}


export function RegistrationStack() {
    return (<Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
            options={{headerShown: false}}
            name="Login" component={LoginScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="SignUp" component={SignUpScreen}/>


    </Stack.Navigator>)

}
