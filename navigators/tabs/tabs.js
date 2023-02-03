import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";
import ProfileButton from "../../components/buttons/profileButton";
import NotificationButton from "../../components/buttons/notificationButton";
import Header from "../../components/headers/header";
import TestFetches from "../../scaffold/testFetches";
import Feed from "../../screens/tabs/feed";
import Notifications from "../../screens/user/notifications";
import Inspo from "../../screens/tabs/inspo";
import Deeds from "../../screens/tabs/deeds";
import AltProfile from "../../screens/user/altProfile";
import ProfileHeader from "../../components/headers/profileHeader";
import Nominations from "../../screens/tabs/nominations";
import Social from "../../screens/tabs/social";
import ContentHeader from "../../components/headers/contentHeader";
import SavedHeader from "../../components/headers/savedHeader";
import NominationsHeader from "../../components/headers/nominationsHeader";
import Organizations from "../../screens/tabs/organizations";
import OrgHeader from "../../components/headers/orgHeader";
import TestVideoUpload from "../../screens/user/testVideoUpload";

function FeedScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
            <Feed  route={route} navigation={navigation}/>
        </View>
    );
}

function DeedsScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
            <Deeds  route={route} navigation={navigation}/>
        </View>
    );
}

function InspoScreen({route,navigation}) {
    return (
        <View style={{backgroundColor:'white' }}>
           <Inspo  route={route} navigation={navigation}/>
        </View>
    );
}



function ProfileTabScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AltProfile route={route} navigation={navigation}/>
        </View>
    );
}

function NominationTabScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Nominations route={route} navigation={navigation}/>
        </View>
    );
}

function SocialScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Social route={route} navigation={navigation}/>
        </View>
    );
}

function TestVideoScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TestVideoUpload route={route} navigation={navigation}/>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const tabHeaderOptions=  (route,navigation)=>({
    headerShown:true,
    header: () => (<Header route={route} navigation={navigation}/>),
    title: '',
    headerTransparent:true,
    headerShadowVisible:false,
   })

const profileHeaderOpts=  (route,navigation)=>({
    headerShown:true,
    header: () => (<ProfileHeader route={route} navigation={navigation}/>),
    title: '',
    headerTransparent:true,
    headerShadowVisible:false,
})

const contentHeader=  (route,navigation)=>({
    headerShown:true,
    header: () => (<ContentHeader route={route} navigation={navigation}/>),
    title: '',
    headerTransparent:true,
    headerShadowVisible:false,
})

const savedHeader=  (route,navigation)=>({
    headerShown:true,
    header: () => (<SavedHeader route={route} navigation={navigation}/>),
    title: '',
    headerTransparent:true,
    headerShadowVisible:false,
})

const nominationHeader=  (route,navigation)=>({
    headerShown:true,
    header: () => (<NominationsHeader route={route} navigation={navigation}/>),
    title: '',
    headerTransparent:true,
    headerShadowVisible:false,
})

const orgHeader=  (route,navigation)=>({
    headerShown:true,
    header: () => (<OrgHeader route={route} navigation={navigation}/>),
    title: '',
    headerTransparent:true,
    headerShadowVisible:false,
})
export default function TabStack() {
    return (
            <Tab.Navigator>
                <Tab.Screen
                    options={({route, navigation})=>({
                        ...tabHeaderOptions(route,navigation),
                        headerShown:true,
                        tabBarLabel:'Home',
                       // tabBarLabelStyle:{color:'red'},
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'#3EB489',
                        title:'Home',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'home-outline'} size={20} color={focused ?'#3EB489' : 'gray'}/>)}
                    })}
                    name="Feed" component={FeedScreen} />
                <Tab.Screen
                    options={({route, navigation})=>({
                        ...contentHeader(route,navigation),
                        headerShown:true,
                        tabBarLabel:'My Content',
                        title:'My Content',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'#3EB489',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'ios-albums-outline'} size={20} color={focused ?'#3EB489' : 'gray'}/>)}
                    })}
                    name="Pifs" component={DeedsScreen} />
                <Tab.Screen
                    options={({route, navigation})=>({
                        ...savedHeader(route,navigation),
                        headerShown:true,
                        tabBarLabel:'Saved',
                        title:'Saved',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'#3EB489',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'ios-bookmarks-outline'} size={20} color={focused ?'#3EB489' : 'gray'}/>)}
                    })}
                    name="Inspo" component={InspoScreen} />

                {/*<Tab.Screen*/}
                {/*    options={({route, navigation})=>({*/}
                {/*        ...orgHeader(route,navigation),*/}
                {/*        headerShown:true,*/}
                {/*        tabBarLabel:'Orgs',*/}
                {/*        title:'Orgs',*/}
                {/*        tabBarInactiveTintColor:'gray',*/}
                {/*        tabBarActiveTintColor:'#3EB489',*/}
                {/*        tabBarIcon:({focused})=>{return(<Ionicons name={'ios-business-outline'} size={20} color={focused ?'#3EB489' : 'gray'}/>)}*/}
                {/*    })}*/}
                {/*    name="TestVideo" component={TestVideoScreen} />*/}


                <Tab.Screen
                    options={({route, navigation})=>({
                        ...nominationHeader(route,navigation),
                        headerShown:true,
                        tabBarLabel:'Nominations',
                        title:'Nominations',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'#3EB489',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'ios-hand-right-outline'} size={20} color={focused ?'#3EB489' : 'gray'}/>)}
                    })}
                    name="Nominations" component={NominationTabScreen} />
                <Tab.Screen
                    options={({route, navigation})=>({
                        ...profileHeaderOpts(route,navigation),
                        headerShown:true,
                        tabBarLabel:'Menu',
                        title:'Menu',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'#3EB489',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'ios-person-outline'} size={20} color={focused ?'#3EB489' : 'gray'}/>)}
                    })}
                    name="Menu" component={ProfileTabScreen} />
            </Tab.Navigator>
    );
}
