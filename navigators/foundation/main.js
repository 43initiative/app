import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../../scaffold/splash";
import {RegistrationStack} from "../registration/registration";
import TabStack from "../tabs/tabs";
import Profile from "../../screens/user/profile";
import DeleteAccount from "../../screens/user/delete";
import Faq from "../../screens/user/faq";
import Permissions from "../../screens/user/permissions";
import Privacy from "../../screens/user/privacy";
import Settings from "../../screens/user/settings";
import UserActivity from "../../screens/user/userActivity";
import TestFetches from "../../scaffold/testFetches";
import {OnboardingStack} from "../onboarding/onboarding";
import {Button, View, Text, Dimensions} from "react-native";
import PostModaler from "../../screens/tabs/postModaler";
import CreatePif from "../../screens/tabs/createPif";
import CreateOTSAppreciation from "../../screens/tabs/createOTSAppreciation";
import CreateAppreciation from "../../screens/tabs/createAppreciation";
import RefineFeedModal from "../../screens/tabs/refineFeedModal";
import PublicProfile from "../../screens/user/publicProfile";
import SelectInspirationModal from "../../screens/tabs/selectInspirationModal";
import AltSPlash from "../../scaffold/altSPlash";
import TermsOfService from "../../screens/registration/termsOfService";
import ForgotPassword from "../../screens/registration/forgotPassword";
import LocationSettings from "../../screens/user/locationSettings";
import CameraSettings from "../../screens/user/cameraSettings";
import NotificationSettings from "../../screens/user/notificationSettings";
import EditBio from "../../screens/user/editBio";
import ChangeProfilePic from "../../screens/user/changeProfilePic";
import ChangeEmail from "../../screens/user/changeEmail";
import ChangePassword from "../../screens/user/changePassword";

const Stack = createNativeStackNavigator();

function SplashScreen({route,navigation}) {
    return(
        <AltSPlash route={route} navigation={navigation}/>
    )
}

function RegistrationNavigator({route,navigation}) {
    return (
        <RegistrationStack route={route} navigation={navigation}/>
    )
}

function TabNavigator({route,navigation}) {
    return (
        <TabStack route={route} navigation={navigation}/>
    )
}

function ProfileScreen({route,navigation}) {
    return (
        <Profile route={route} navigation={navigation}/>
    )
}


function SettingsScreen({route,navigation}) {
    return (
        <Settings route={route} navigation={navigation}/>
    )
}


function PrivacyScreen({route,navigation}) {
    return (
        <Privacy route={route} navigation={navigation}/>
    )
}

function TermsScreen({route,navigation}) {
    return (
        <TermsOfService route={route} navigation={navigation}/>
    )
}


function PerimssionsScreen({route,navigation}) {
    return (
        <Permissions route={route} navigation={navigation}/>
    )
}


function FAQScreen({route,navigation}) {
    return (
        <Faq route={route} navigation={navigation}/>
    )
}


function DeleteScreen({route,navigation}) {
    return (
        <DeleteAccount route={route} navigation={navigation}/>
    )
}

function ActivityScreen({route,navigation}) {
    return (
        <UserActivity route={route} navigation={navigation}/>
    )
}

function TestFetchScreen({route,navigation}) {
    return (
        <TestFetches route={route} navigation={navigation}/>
    )
}

function OnboardingNavigator({route,navigation}) {
    return (
        <OnboardingStack route={route} navigation={navigation}/>
    )
}

function PostModalScreen({route,navigation}) {
    return(
       <PostModaler route={route} navigation={navigation}/>
    )
}

function CreatePifScreen({route,navigation}) {
    return(
        <CreatePif route={route} navigation={navigation}/>
    )
}

function CreateAppreciationOTScreen({route,navigation}) {
    return(
        <CreateOTSAppreciation route={route} navigation={navigation}/>
    )
}

function CreateAppreciationScreen({route,navigation}) {
    return(
        <CreateAppreciation route={route} navigation={navigation}/>
    )
}

function RefineFeedScreen({route,navigation}) {
return(
    <RefineFeedModal  route={route} navigation={navigation}/>
)
}

function SelectInspirationScreen({route,navigation}) {
    return(
        <SelectInspirationModal  route={route} navigation={navigation}/>
    )
}

function PublicProfileScreen({route,navigation}) {
    return(
        <PublicProfile  route={route} navigation={navigation}/>
    )
}

function ForgotPasswordScreen({route,navigation}) {
    return(
        <ForgotPassword  route={route} navigation={navigation}/>
    )
}

function LocationSettingsScreen({route,navigation}) {
    return(
        <LocationSettings  route={route} navigation={navigation}/>
    )
}

function CameraSettingsScreen({route,navigation}) {
    return(
        <CameraSettings  route={route} navigation={navigation}/>
    )
}

function NotificationSettingsScreen({route,navigation}) {
    return(
        <NotificationSettings  route={route} navigation={navigation}/>
    )
}

function UserActivityScreen({route,navigation}) {
    return(
        <UserActivity  route={route} navigation={navigation}/>
    )
}

function EditBioScreen({route,navigation}) {
    return(
        <EditBio  route={route} navigation={navigation}/>
    )
}

function EditImgScreen({route,navigation}) {
    return(
        <ChangeProfilePic  route={route} navigation={navigation}/>
    )
}

function ChangeEmailScreen({route,navigation}) {
    return(
        <ChangeEmail  route={route} navigation={navigation}/>
    )
}

function ChangePasswordScreen({route,navigation}) {
    return(
        <ChangePassword  route={route} navigation={navigation}/>
    )
}


export function MainNavigator() {
    return (<Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
            options={{headerShown: false}}
            name="SplashScreen" component={SplashScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="RegistrationStack" component={RegistrationNavigator}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="OnboardingStack" component={OnboardingNavigator}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="TabStack" component={TabNavigator}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Profile" component={ProfileScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Delete Account" component={DeleteScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="FAQ" component={FAQScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Permissions" component={PerimssionsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="PrivacyScreen" component={PrivacyScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Settings" component={SettingsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="User Activity" component={ActivityScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="TestFetch" component={TestFetchScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="PublicProfile" component={PublicProfileScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="TermsScreen" component={TermsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="ForgotScreen" component={ForgotPasswordScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="LocationSettingsScreen" component={LocationSettingsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="CameraSettingsScreen" component={CameraSettingsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="NotificationSettingsScreen" component={NotificationSettingsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="EditBio" component={EditBioScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="EditImg" component={EditImgScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="UserActivityScreen" component={UserActivityScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="ChangeEmail" component={ChangeEmailScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="ChangePassword" component={ChangePasswordScreen}/>


        <Stack.Group screenOptions={{presentation:'fullScreenModal'}}>
            <Stack.Screen
                options={{headerShown: false}}
                name="CreatePif" component={CreatePifScreen}/>
            <Stack.Screen
                options={{headerShown: false}}
                name="OTSAppreciation" component={CreateAppreciationOTScreen}/>

            <Stack.Screen
                options={{headerShown: false}}
                name="LogAppreciation" component={CreateAppreciationScreen}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation:'modal'}}>
            <Stack.Screen
                options={{headerShown: true,title:'Refine Your Feed'}}
                name="RefineFeed" component={RefineFeedScreen}/>

            <Stack.Screen
                options={{headerShown: true,title:'Select Inspiration'}}
                name="SelectInspiration" component={SelectInspirationScreen}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation:'transparentModal',headerShown:false}}>
            <Stack.Screen name={'PostModal'} component={PostModalScreen}/>
        </Stack.Group>


    </Stack.Navigator>)

}
