import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { Provider } from 'react-redux'
import {combineReducers,createStore} from "redux";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import {initialize,checkForUser} from "./firebase/newFIre";
import Globe from "./reducers/globe";
import Entry from "./scaffold/entry";
import Navigation from "./reducers/navigation";
import {setStore, storeControllers} from "./reducers/controllers";
import UserSignUp from "./reducers/userSignUp";
import UserData from "./reducers/userData";
const rootReducer = combineReducers({
  globe:Globe,
    navigation:Navigation,
    userSignUp:UserSignUp,
    userData:UserData
})
const store = createStore(rootReducer)
const Stack = createNativeStackNavigator();
export default function App() {

  useEffect(()=>{
    runInit()
  },[])


  const runInit = async () => {
         setStore(store)
      console.log(storeControllers.store,'here look store')
// let x = await initialize()
//     console.log(x);
// let a = await checkForUser();
// console.log(a)
  }
  return (
      <Provider store={store}>
        <NavigationContainer store={store}>
         <Entry/>
        </NavigationContainer>
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
