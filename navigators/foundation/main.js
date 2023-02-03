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
import Help from "../../screens/user/help";
import AltProfile from "../../screens/user/altProfile";
import SearchUsers from "../../screens/user/searchUsers";
import AltPostModaler from "../../screens/tabs/altPostModaler";
import CreateDeedPost from "../../screens/postCreation/createDeedPost";
import NominationModal from "../../screens/postCreation/nominationModal";
import CommentScreen from "../../screens/user/commentScreen";
import Notifications from "../../screens/user/notifications";
import ViewSinglePost from "../../screens/user/viewSinglePost";
import InspirationSelectionModal from "../../screens/postCreation/selectInspirationModal";
import RefineFilterModal from "../../screens/tabs/refineFilterModal";
import OrgModal from "../../screens/tabs/orgModal";
import OrgCreation from "../../screens/org/orgCreation";
import EditOrgBio from "../../screens/orgTabs/editOrgBio";
import ChangeOrgProfilePic from "../../screens/orgTabs/changeOrgProfilePic";
import OrgTabStack from "../tabs/orgTabs";
import OrgSettings from "../../screens/orgTabs/orgSettings";
//add these back
import OrgNominations from "../../screens/orgTabs/orgNominations";
import OrgInspo from "../../screens/orgTabs/orgInspo";
import OrgProfile from "../../screens/orgTabs/orgProfile";
import OrgDeeds from "../../screens/orgTabs/orgDeeds";
import OrgFeed from "../../screens/orgTabs/orgFeed";
import OrgNotifications from "../../screens/orgTabs/orgNotifications";
import OrgSearchUsers from "../../screens/orgTabs/orgSearchUsers";
import CompleteFollowing from "../../screens/user/completeFollowing";
import CompleteFollowers from "../../screens/user/completeFollowers";
import CreateNewPost from "../../screens/user/testVideoUpload";
import AllPifs from "../../screens/user/allPifs";
const Stack = createNativeStackNavigator();

function SplashScreen({route,navigation}) {
    return(
        <AltSPlash route={route} navigation={navigation}/>
    )
}

function OrgNominationsScreen({route,navigation}) {
    return(
        <OrgNominations route={route} navigation={navigation}/>
    )
}

function OrgProfileScreen({route,navigation}) {
    return(
        <OrgProfile route={route} navigation={navigation}/>
    )
}

function OrgDeedScreen({route,navigation}) {
    return(
        <OrgDeeds route={route} navigation={navigation}/>
    )
}

function OrgFeedScreen({route,navigation}) {
    return(
        <OrgFeed route={route} navigation={navigation}/>
    )
}

function OrgNotificationsScreen({route,navigation}) {
    return(
        <OrgNotifications route={route} navigation={navigation}/>
    )
}

function OrgInspoScreen({route,navigation}) {
    return(
        <OrgInspo route={route} navigation={navigation}/>
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

function OrgTabNavigator({route,navigation}) {
    return (
        <OrgTabStack route={route} navigation={navigation}/>
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

function OrgSettingsScreen({route,navigation}) {
    return (
        <OrgSettings route={route} navigation={navigation}/>
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

function RefineFilterScreen({route,navigation}) {
    return(
        <RefineFilterModal  route={route} navigation={navigation}/>
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

function EditOrgBioScreen({route,navigation}) {
    return(
        <EditOrgBio  route={route} navigation={navigation}/>
    )
}

function EditOrgImgScreen({route,navigation}) {
    return(
        <ChangeOrgProfilePic  route={route} navigation={navigation}/>
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

function HelpScreen({route,navigation}) {
    return(
        <Help  route={route} navigation={navigation}/>
    )
}

function AltProfileScreen({route,navigation}) {
    return(
        <AltProfile  route={route} navigation={navigation}/>
    )
}

function SearchUserScreen({route,navigation}) {
    return(
        <SearchUsers  route={route} navigation={navigation}/>
    )
}

function AltPostModalScreen({route,navigation}) {
    return(
        <AltPostModaler  route={route} navigation={navigation}/>
    )
}

function CreateDeedPostScreen({route,navigation}) {
    return(
        <CreateDeedPost  route={route} navigation={navigation}/>
    )
}

function InspoSelctionModal({route,navigation}) {
    return(
        <SelectInspirationModal  route={route} navigation={navigation}/>
    )
}

function NominationModalScreen({route,navigation}) {
    return(
        <NominationModal  route={route} navigation={navigation}/>
    )
}

function CommentsScreen({route,navigation}) {
    return(
        <CommentScreen  route={route} navigation={navigation}/>
    )
}

function NotifScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Notifications route={route} navigation={navigation}/>
        </View>
    );
}


function ViewSinglePostScreen({route,navigation}) {
    return (
            <ViewSinglePost route={route} navigation={navigation}/>
    );
}

function InspoSelectModaler({route,navigation}) {
    return (
        <InspirationSelectionModal route={route} navigation={navigation}/>
    );
}

function OrgModalScreen({route,navigation}) {
    return (
        <OrgModal route={route} navigation={navigation}/>
    );
}

function OrgCreationScreen({route,navigation}) {
    return (
        <OrgCreation route={route} navigation={navigation}/>
    );
}

function CompleteFollowingScreen({route,navigation}) {
    return (
        <CompleteFollowing route={route} navigation={navigation}/>
    );
}

function CompleteFollowerScreen({route,navigation}) {
    return (
        <CompleteFollowers route={route} navigation={navigation}/>
    );
}


function CreateNewPostScreen({route,navigation}) {
    return (
        <CreateNewPost route={route} navigation={navigation}/>
    );
}

function AllPifScreen({route,navigation}) {
    return (
        <AllPifs route={route} navigation={navigation}/>
    );
}


export function MainNavigator() {
    return (<Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
            options={{headerShown: false}}
            name="SplashScreen" component={SplashScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="AllPifs" component={AllPifScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="CreateOrg" component={OrgCreationScreen}/>


        <Stack.Screen
            options={{headerShown: false}}
            name="CreateNewPost" component={CreateNewPostScreen}/>


        <Stack.Screen
            options={{headerShown: false}}
            name="CompleteFollowing" component={CompleteFollowingScreen}/>


        <Stack.Screen
            options={{headerShown: false}}
            name="CompleteFollowers" component={CompleteFollowerScreen}/>

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
            name="OrgTabStack" component={OrgTabNavigator}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="OrgNotif" component={OrgNotificationsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Profile" component={ProfileScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Delete Account" component={DeleteScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="Notifications" component={NotifScreen}/>

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
            name="OrgSettings" component={OrgSettingsScreen}/>











        <Stack.Screen
            options={{headerShown: false}}
            name="User Activity" component={ActivityScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="TestFetch" component={TestFetchScreen}/>



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
            name="EditOrgBio" component={EditOrgBioScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="EditOrgImg" component={EditOrgImgScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="UserActivityScreen" component={UserActivityScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="ChangeEmail" component={ChangeEmailScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="ChangePassword" component={ChangePasswordScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="HelpScreen" component={HelpScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="AltProfile" component={AltProfileScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="SearchUsers" component={SearchUserScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="OrgSearchUsers" component={OrgSearchUsers}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="CreateDeedPost" component={CreateDeedPostScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="CommentSection" component={CommentsScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="ViewSinglePost" component={ViewSinglePostScreen}/>

        <Stack.Screen
            options={{headerShown: false}}
            name="PublicProfile" component={PublicProfileScreen}/>
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
                options={{headerShown: true,title:'Sort Content'}}
                name="RefineFeed" component={RefineFeedScreen}/>

            <Stack.Screen
                options={{headerShown: true,title:'43Intiative Org Account'}}
                name="OrgModal" component={OrgModalScreen}/>

            <Stack.Screen
                options={{headerShown: true,title:'Filter Content'}}
                name="RefineFilter" component={RefineFilterScreen}/>

            <Stack.Screen
                options={{headerShown: true,title:'Select Inspiration'}}
                name="InspoModaler" component={InspoSelectModaler}/>

            <Stack.Screen
                options={{headerShown: true,title:'Select Nominees'}}
                name="NominationModal" component={NominationModalScreen}/>

            <Stack.Screen
                options={{headerShown: true,title:'Refine Your Feed'}}
                name="SelectInspo" component={InspoSelctionModal}/>

            <Stack.Screen
                options={{headerShown: true,title:'Create A Post'}}
                name="AltPoster" component={AltPostModalScreen}/>

            <Stack.Screen
                options={{headerShown: true,title:'Select Inspiration'}}
                name="SelectInspiration" component={SelectInspirationScreen}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation:'transparentModal',headerShown:false}}>
            <Stack.Screen name={'PostModal'} component={PostModalScreen}/>
        </Stack.Group>


    </Stack.Navigator>)

}
