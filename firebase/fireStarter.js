// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {getAuth, createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword,sendPasswordResetEmail,updateEmail,updatePassword} from "firebase/auth";

import { doc, getDocs,getFirestore,collection,getDoc,addDoc,query, where ,updateDoc} from "firebase/firestore";
import {storeControllers} from "../reducers/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {returnStore} from "./fireInit";
import {STORE_PRIVATE_DATA, STORE_PUBLIC_DATA} from "../reducers/actionTypes";
let app;
let db;
let auth;

let firebaseCreds = {
    app:null,
    db:null,
    auth:null
}

//initialize firebase

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
    try {
        if(getApps.length < 1) {
            //store db, app and auth
            firebaseCreds.app = initializeApp(firebaseConfig);
            firebaseCreds.auth = getAuth(app)
            firebaseCreds.db = await getFirestore(app)
            return {passed:true,firebaseCreds}
        } else {
            return {passed:false,reason:'too many apps initialized'}
        }
    } catch (e) {
        return {passed:false,reason:e}
    }
}

const returnFirebaseCredentials = async () => {
    return firebaseCreds;
}



//check for active user
const checkForToken = async () => {
    return AsyncStorage.getItem('exAccessToken')
}

const checkForActiveUser = async () => {
    let tokenCheck = await checkForToken();
    return tokenCheck && firebaseCreds.auth.currentUser.uid;
}



//check for user sign up completion

const checkSignUpData = async () => {
    const userUid = firebaseCreds.auth.currentUser.uid;
    console.log(userUid,'useerUid')
    const docRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data().hasCompletedSignUp;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return false;
    }
}

const checkForOnboarding = async () => {
    let dataCheck = await checkSignUpData();
    return firebaseCreds.auth.currentUser.uid && dataCheck;
}

// Get a reference to the storage service, which is used to create references in your storage bucket

const transformBlob = async (img,fire,bucket,name) => {
    try {
        const response = await fetch(img);
        const blob = await response.blob();
        return uploadToFirebase(blob,fire,bucket,name)
    } catch (e) {
        console.log(e)
        return {passed:false,e:e}
    }

}

const uploadToFirebase = async (img,fire,bucket,name) => {
    try {
        let userUid;
        const storage = getStorage(firebaseCreds.app);

// Create a storage reference from our storage service

        if(!firebaseCreds.auth.currentUser.uid) {
            userUid = 'xxx'
        } else {
            userUid = firebaseCreds.auth.currentUser.uid;
        }
        const storageRef = ref(storage,`userProfilePics/${userUid}/profile.jpg`);
        //let ref = fire.storage().ref(`${bucket}/${userUid}/${name}`);
        //let searchRef = fire.storage().ref(`${bucket}/${userUid}/${name}_200x200`);
        await uploadBytes(storageRef, img)
        return getDownloadUrl(storage,storageRef)
    } catch (e) {
        return {passed:false,e:e}

    }

}

const getDownloadUrl = async (storage,storageRef,userUid) => {
    try {
        let link = await getDownloadURL(ref(storage,storageRef));
        console.log(link,'link')
        return {link:link,userUid:userUid,passed:true}
    } catch (e) {
        console.log(`this is the error ${e}`)
       // return getDownloadUrl(ref,userUid)
    }

}

const submitSignUpData = async (data) => {
    try {
        let signUpData = storeControllers.storeData().userSignUp;
        let db = firebaseCreds.db;
        let auth = firebaseCreds.auth
        let userUid = auth.currentUser.uid;
        const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const res = await updateDoc(userRef,signUpData)
        return {passed:true,reason:res}

    } catch (e) {
        return {passed:false,reason:e}
    }



}


const signOutUser = async (navigation) => {
    try {
        let x = await signOut(firebaseCreds.auth);
        console.log(x)
        //console.log(auth.currentUser.uid,'this the current users')
        await AsyncStorage.removeItem('exAccessToken');
        return {passed:true}
    } catch (e) {
        console.log(e)
        return {passed:false}
    }

}

const loginUser = async (email,password) => {
    try {
        auth = getAuth(app)
        let x = await signInWithEmailAndPassword(auth,email,password)
        let userUid = x.user.uid;
        console.log(auth,'here is the auths')
        await AsyncStorage.setItem('exAccessToken',userUid)
        return {passed:true,userUid}
    } catch (e) {
        return {passed:false,error:e.code,errorMsg:e.message}
    }

}

const getUserPublicData = async (userUid) => {

    try {
        const docRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            return {data:docSnap.data(),passed:true}
        } else {
            console.log("No such document!");
            return {data:null,passed:false,reason:'no such document exists'}
        }
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }

}

const getUserPrivateData = async (userUid) => {
    try {
        const docRef = doc(firebaseCreds.db, "privateUsers", userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            return {data:docSnap.data(),passed:true}
        } else {
            console.log("No such document!");
            return {data:null,passed:false,reason:'no such document exists'}
        }
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

const storeUserData = async () => {
    try {
        console.log('starting storeUserData')
        let {auth,app,db} = firebaseCreds;
        const userUid = auth.currentUser.uid;
        let store = storeControllers.store;
        console.log('store in firestarted',store)
        let publicData = await getUserPublicData(userUid);
        let privateData = await getUserPrivateData(userUid);
        if(privateData.passed && publicData.passed) {
            store.dispatch({type:STORE_PRIVATE_DATA,payload:privateData.data})
            store.dispatch({type:STORE_PUBLIC_DATA,payload:publicData.data});
           let storePrivateData =  storeControllers.storeData().userData.privateData;
           let storePublicData =  storeControllers.storeData().userData.publicData;
           console.log(storePublicData,storePrivateData);
            return {passed:true}

        } else {
            return {passed:false,reason:'could not locate both documents'}

        }
    } catch (e) {
        return {passed:false,reason:e}

    }




}


//edit profilePic

const updateProfilePic = async (imgProvided,img) => {
    try {
        let auth = firebaseCreds.auth
        let userUid = auth.currentUser.uid;
        const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const res = await updateDoc(userRef,{imgProvided,img})
        return {passed:true,reason:res}

    } catch (e) {
        return {passed:false,reason:e}
    }
}

//edit bio

const updateUserBio = async (bio) => {
    try {
        let auth = firebaseCreds.auth
        let userUid = auth.currentUser.uid;
        const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const res = await updateDoc(userRef,{aboutMe:bio})
        return {passed:true,reason:res}

    } catch (e) {
        return {passed:false,reason:e}
    }
}

//start notification watcher

//like a Pif


//comment a Pif


//add to inspiration


//create a pif


//add image to users photobucket


//follow a user


//follow an organization

//forgot password


const forgotPassword = async (email) => {
    try {
        let auth = firebaseCreds.auth
        let forgot = await sendPasswordResetEmail(auth,email);
        console.log(forgot)
    } catch (e) {
        return {passed:false}
    }

}

//get user activity

const getUserActivity = async () => {
    try {
        let {auth,db,app} = firebaseCreds
        let userUid = auth.currentUser.uid;
       let activityRef = collection(db,'userActivity')
        let q = query(activityRef,where('userUid' ,'==', userUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });
        console.log(list);
        return list;
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

//change email address

const changeUserEmail = async (newEmail) => {
    try {
        let auth = firebaseCreds.auth;
        let response = await updateEmail(auth.currentUser, newEmail)
        return {passed:true}
    } catch (e) {
        return {passed:false,reason:e}
    }
}

const changeUserPassword = async (newPassword) => {
    try {
        let auth = firebaseCreds.auth;
        let response = await updatePassword(auth.currentUser, newPassword)
        return {passed:true}
    } catch (e) {
        return {passed:false,reason:e}
    }
}


module.exports = {
    checkForOnboarding,
   checkForActiveUser,
    returnFirebaseCredentials,
    initialize,
    transformBlob,
    uploadToFirebase,
    submitSignUpData,
    signOutUser,
    loginUser,
    storeUserData,
    forgotPassword,
    getUserActivity,
    updateUserBio,
    updateProfilePic,
    changeUserEmail,
    changeUserPassword
}
