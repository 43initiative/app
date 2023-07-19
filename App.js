import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { Provider } from 'react-redux'
import {combineReducers,createStore} from "redux";
import {Link, NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {initialize,checkForUser} from "./firebase/newFIre";
import Globe from "./reducers/globe";
import Entry from "./scaffold/entry";
import Navigation from "./reducers/navigation";
import {setStore, storeControllers} from "./reducers/controllers";
import UserSignUp from "./reducers/userSignUp";
import UserData from "./reducers/userData";
import Notifications from "./reducers/notifications";
import OrgData from "./reducers/orgData";
import OrgNotifications from "./reducers/orgNotifications";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import Actions from "./reducers/actionListing";
const rootReducer = combineReducers({
  globe:Globe,
    navigation:Navigation,
    userSignUp:UserSignUp,
    userData:UserData,
    notifications:Notifications,
    orgData:OrgData,
    orgNotifications:OrgNotifications,
    actions:Actions
})
const store = createStore(rootReducer)
const Stack = createNativeStackNavigator();
export default function App() {

  useEffect(()=>{
    runInit()
  },[])



    Linking.addEventListener('url',({url})=>{
        console.log(url,'handle the url')
    })

  const runInit = async () => {
      let x =   await Linking.getInitialURL()
      console.log(x,'initial url')
         setStore(store)
      console.log(storeControllers.store,'here look store')
// let x = await initialize()
//     console.log(x);
// let a = await checkForUser();
// console.log(a)
  }
  return (
      <Provider store={store}>
          <ActionSheetProvider>
        <NavigationContainer store={store}>
         <Entry/>
        </NavigationContainer>
          </ActionSheetProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
