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

function NotifScreen({route,navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Notifications route={route} navigation={navigation}/>
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
                        tabBarActiveTintColor:'red',
                        title:'Home',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'home-outline'} size={20} color={focused ?'red' : 'gray'}/>)}
                    })}
                    name="Feed" component={FeedScreen} />
                <Tab.Screen
                    options={({route, navigation})=>({
                        ...tabHeaderOptions(route,navigation),
                        headerShown:true,
                        tabBarLabel:'My PIFS',
                        title:'Pifs',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'red',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'happy-outline'} size={20} color={focused ?'red' : 'gray'}/>)}
                    })}
                    name="Pifs" component={DeedsScreen} />
                <Tab.Screen
                    options={({route, navigation})=>({
                        ...tabHeaderOptions(route,navigation),
                        headerShown:true,
                        tabBarLabel:'My Inspos',
                        title:'Inspirations',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'red',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'heart-half-outline'} size={20} color={focused ?'red' : 'gray'}/>)}
                    })}
                    name="Inspo" component={InspoScreen} />

                <Tab.Screen
                    options={({route, navigation})=>({
                        ...tabHeaderOptions(route,navigation),
                        headerShown:true,
                        tabBarLabel:'Notifications',
                        title:'Notifications',
                        tabBarInactiveTintColor:'gray',
                        tabBarActiveTintColor:'red',
                        tabBarIcon:({focused})=>{return(<Ionicons name={'notifications-outline'} size={20} color={focused ?'red' : 'gray'}/>)}
                    })}
                    name="Notifications" component={NotifScreen} />
            </Tab.Navigator>
    );
}
