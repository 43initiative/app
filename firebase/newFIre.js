// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signOut} from "firebase/auth";

import { doc, getDocs,getFirestore,collection,getDoc,addDoc,query, where } from "firebase/firestore";
import {storeControllers} from "../reducers/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


let store;

const saveStore = async (passed) => {
    try {

        store = passed;

    } catch (e) {
        console.warn(e)
    }


    // console.log('store is saved', store)
}
const returnStore = async () => {
    return store;
}

const saveFireDb = async (db) => {
    console.log('saving db')
    let stored = storeControllers.store
    return stored.dispatch({type:'STORE_FIRESTORE_DB',payload:db})

}
let xdb = ''
let app;
let auth;

const initialize = async () => {
    const firebaseConfig = {
        apiKey: "AIzaSyD5fTcIle-PVJAYiQj4qX6u5rCHhTnu8Hg",
        authDomain: "project-b2117.firebaseapp.com",
        projectId: "project-b2117",
        storageBucket: "project-b2117.appspot.com",
        messagingSenderId: "954058964813",
        appId: "1:954058964813:web:0c815fe4e9211991b00104",
        measurementId: "G-2C44W4NCGC"
    };


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


// Initialize Firebase
    if(getApps.length < 1) {
         app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
        const db = await getFirestore(app)
        xdb = db;
        console.log(xdb)
        await saveFireDb(db)
        return {db,app}
    }

}

const checkForUser = async () => {
    const auth = await getAuth(app)
//console.log(auth.currentUser.uid,'here auths')
//console.log(auth.currentUser.uid)
    return auth.currentUser;
}

const signUpUser = async (email,password) => {
    try {
         auth = getAuth(app)
        let x = await createUserWithEmailAndPassword(auth,email,password)
        let userUid = x.user.uid;
        console.log(auth,'here is the auths')
        await AsyncStorage.setItem('exAccessToken',userUid)
        return {passed:true,userUid}
    } catch (e) {
        return {passed:false,error:e.code,errorMsg:e.message}
    }

}

const checkForSignUpCompletion = async () => {
    const userUid = getAuth(app).currentUser.uid;
    const docRef = doc(xdb, "publicUsers", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data().hasCompletedSignUp;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return false;
    }
}

const signOutUser = async (navigation) => {
    try {
        console.log('signing outy')
        const auth = getAuth(app);
        console.log(auth.currentUser.uid,'before sign out')
        let x = await signOut(auth);
        console.log(x)
        console.log(auth.currentUser.uid,'this the current users')
        await AsyncStorage.removeItem('exAccessToken');
        return {passed:true}
    } catch (e) {
        console.log(e)
        return {passed:false}
    }

}



module.exports = {
    initialize,
    checkForUser,
    signUpUser,
    checkForSignUpCompletion,
    signOutUser
}
