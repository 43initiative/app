// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL,uploadString,uploadBytesResumable} from 'firebase/storage'
import {getAuth, createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword,sendPasswordResetEmail,updateEmail,updatePassword} from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import NetInfo from "@react-native-community/netinfo";

import { doc, getDocs,getFirestore,collection,getDoc,addDoc,query, where ,updateDoc,onSnapshot,serverTimestamp,orderBy} from "firebase/firestore";
import {showToastMessage, storeControllers} from "../reducers/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {returnStore} from "./fireInit";
import {
    SET_NOTIF, SET_ORG_NOTIF,
    SET_ORG_PRIVATE,
    SET_ORG_PUBLIC,
    STORE_PRIVATE_DATA,
    STORE_PUBLIC_DATA, UPDATE_ACTIONS_LISTINGS,
    UPDATE_USER_PRIVATE_DATA
} from "../reducers/actionTypes";
import firebase from "firebase/compat";
import {img} from "react-native/Libraries/Animated/AnimatedWeb";
import {waitACertainTime} from "../helperFuncs/timers/wait";
import {AppState} from "react-native";
import {Platform} from "react-native";
let app;
let db;
let auth;

import * as Notifications from 'expo-notifications';

// Notifications.addNotificationReceivedListener(notification => {
//     if (notification. === 'selected') {
//         // Handle the notification being tapped by the user
//         const { data } = notification;
//         // Access the data associated with the notification
//         console.log(data);
//     }
// });

let firebaseCreds = {
    app:null,
    db:null,
    auth:null
}

let networkStats = {
    type:null,
    connected:false
}

//initialize firebase
//
const setOnlineStatus = async (status) => {
    let userUid = firebaseCreds.auth.currentUser.uid;
    if(userUid) {
        const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const res = await updateDoc(userRef,{online:status})
        //console.log(res)
    }

}

const handleAppStateChange =  (ev) => {


console.log(ev)
        if(ev === 'active') {
            setOnlineStatus(true)

        } else {
            setOnlineStatus(false)
        }

}

AppState.addEventListener('change', handleAppStateChange);

const initialize = async () => {
    //add new firebase config here
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

let unsubscribeNetWatcher = null;
let everDisconnected = false;

const startNetworkWatcher = async () => {
    console.log('running net watchersss')
    if(!unsubscribeNetWatcher) {
        NetInfo.fetch().then(state => {
            networkStats.type = state.type;
            networkStats.connected = state.isConnected;
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
        unsubscribeNetWatcher = NetInfo.addEventListener(state => {
            console.log('ion the watcher')
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            networkStats.type = state.type;
            networkStats.connected = state.isConnected;
            if(!state.isConnected) {
                showToastMessage('No Internet','It seems that you have lost internet connection.','ios-wifi')
                everDisconnected = true;

            } else {
                if(everDisconnected) {
                    showToastMessage('Your Internet Is Back','You have restored your internet connection','ios-wifi')
                }
                everDisconnected = false;

            }
        });
    }

}



//check for active user
const checkForToken = async () => {
    return AsyncStorage.getItem('exAccessToken')
}

const markAllNotifsRead = async (list) => {
    for (let i = 0; i < list.length; i++) {
        await markNotifRead(list[i])
    }
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
      //  console.log('2aa',img)
        const response = await fetch(img);
     //   console.log('2a',response)
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


const getImage = async (img) => {
    return fetch(img)
        .then((response) => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Failed to fetch image');
        })
        .then((blob) => {

            return blob;
            // Use the image data (stored in the blob) here
        })
        .catch((error) => {
            console.error(error);
        });
}

//add image to post
const transformBlobForPost = async (img,fire,bucket,name) => {
    try {
        console.log('2aa',img)


        //console.log('2a',response)
       // console.log(response,'response')
        const blob = await getImage(img)
       // console.log(blob,'blob')
        return uploadToFirebaseForPost(blob,fire,bucket,name)
    } catch (e) {
       // console.log(e)
        return {passed:false,e:e}
    }

}

const chatGptImgUpload = async () => {
    const storage = getStorage(firebaseCreds.app);

    const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!response.cancelled) {
        const source = { uri: response.uri };
        const media = response.uri;

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function(e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', media, true);
            xhr.send(null);
        });

        const byteArray = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = function() {
                resolve(new Uint8Array(reader.result));
            };
            reader.readAsArrayBuffer(blob);
        });
        console.log(byteArray)
        const storageRef = ref(storage,`43pics/kjfd'/${Date.now()}/xyz`);

       // const mediaRef = storage.child(`${response.type === 'video' ? 'videos' : 'images'}/${media.uri}`);
        const snapshot = await uploadBytes(storageRef,byteArray);
        return getDownloadUrl(storage,storageRef)

    }

}




const uploadToFirebaseForPost = async (img,fire,bucket,name) => {
    try {
        let userUid;
        const storage = getStorage(firebaseCreds.app);

// Create a storage reference from our storage service

        if(!firebaseCreds.auth.currentUser.uid) {
            userUid = 'xxx'
        } else {
            userUid = firebaseCreds.auth.currentUser.uid;
        }
        const storageRef = ref(storage,`43pics/${userUid}/${Date.now()}/xyz.jpg`);
    if(img) {
        await uploadBytes(storageRef, img)
        return getDownloadUrl(storage,storageRef)
    }

    } catch (e) {
        return {passed:false,e:e}

    }

}



//

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

const submitSignUpData = async (data) => {
    try {
        let signUpData = storeControllers.storeData().userSignUp;
        console.log(signUpData,'sign up data')
        // if(signUpData.isOrganization) {
        //     let response = await checkForPlaceIdExists(signUpData.placeId);
        //     console.log(response)
        //     if(response.exists) {
        //         return {passed:false,reason:'A profile for this organization already exists.'}
        //     }
        // }

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

const updatePushToken = async (token) => {
    let db = firebaseCreds.db;
    let auth = firebaseCreds.auth
    let userUid = auth.currentUser.uid;

    const userRef = doc(firebaseCreds.db, "privateUsers", userUid);

    const res = await updateDoc(userRef,{
        permissions: {
            pushNotifications:true,
            pushToken:token
        }
    },{merge:true})
}


const signOutUser = async (navigation) => {
    try {

        if(userWatcher) {
            userWatcher();

        }

        if(unsubscribeNotifWatcher) {
            unsubscribeNotifWatcher()
        }
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

const checkForPlaceIdExists = async (placeId) => {
    let activityRef = collection(db,'publicUsers')
    let q = query(activityRef,where('placeId' ,'==', placeId));
    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({id:doc.id,...doc.data()})
        console.log(doc.id, " => ", doc.data());
    });
    console.log(list);
    return {exists:list.length > 0};
}

const storeUserData = async () => {
    try {
        let storePublicData =  storeControllers.storeData().userData.publicData;

        console.log('starting storeUserData')
        let {auth,app,db} = firebaseCreds;
        const userUid = auth.currentUser.uid;
        let store = storeControllers.store;
        console.log('store in firestarted',store)
        let publicData = await getUserPublicData(userUid);
        let privateData = await getUserPrivateData(userUid);
        if(privateData.passed && publicData.passed) {
            store.dispatch({type:STORE_PRIVATE_DATA,payload:privateData.data})
            store.dispatch({type:STORE_PUBLIC_DATA,payload: {userUid,...publicData.data}});
           let storePrivateData =  storeControllers.storeData().userData.privateData;
           let storePublicData =  storeControllers.storeData().userData.publicData;
          // console.log('data watch start')
           userDataWatcher();
           userActionWatcher();

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


//all org functions

const updateOrgProfilePic = async (imgProvided,img) => {
    try {
        let auth = firebaseCreds.auth
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const res = await updateDoc(userRef,{imgProvided,img})
        return {passed:true,reason:res}

    } catch (e) {
        return {passed:false,reason:e}
    }
}

const updateOrgBio = async (bio) => {
    try {
        let auth = firebaseCreds.auth
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
        const res = await updateDoc(userRef,{aboutMe:bio})
        return {passed:true,reason:res}

    } catch (e) {
        return {passed:false,reason:e}
    }
}

const getOrgActivity = async () => {
    try {
        let {auth,db,app} = firebaseCreds
        let userUid = storeControllers.storeData().orgData.activeOrgId;
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

const submitOrgFeedback = async (message) => {
    try {
        let {db,auth} = firebaseCreds;
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        await addDoc(collection(db, "feedback"), {
            userUid: userUid,
            feedback:message
        });
        return {passed:true}
    }catch (e) {
        return {passed:false}
    }

}

const getOrgFollowers = async () => {
    try {
        let {auth,db} = firebaseCreds;
        let userUid = storeControllers.storeData().orgData.activeOrgId;

        const userRef = collection(db,'publicUsers');
        const q = query(userRef,where('followingList','array-contains',userUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });

        return {passed:true,data:list}
    } catch (e) {
        return {passed:false}
    }

}

const getOrgFollowing = async () => {
    try {
        let {auth,db} = firebaseCreds;
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        const userRef = collection(db,'publicUsers');
        const q = query(userRef,where('followList','array-contains',userUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });

        return {passed:true,data:list}
    } catch (e) {
        return {passed:false}
    }


}

const getOrgDeeds = async () => {
    try {
        let {auth,db} = firebaseCreds;
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        const userRef = collection(db,'pifs');
        const q = query(userRef,where('userUid','==',userUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });

        return {passed:true,data:list}
    } catch (e) {
        return {passed:false}
    }
}

const returnOrgFollowingList = async () => {
    let followingList = storeControllers.storeData().orgData.publicData.followingList;
    console.log(followingList)
    return followingList;
}

const returnOrgFollowerList = async () => {
    let followingList = storeControllers.storeData().orgData.publicData.followList;
    console.log(followingList,'look for follow')
    return followingList;
}

const returnOrgLikedList = async () => {
    let likedList = storeControllers.storeData().orgData.publicData.likedList;
    return likedList;
}

const returnOrgSavedList = async () => {
    let savedList = storeControllers.storeData().orgData.publicData.savedList;
    return savedList;
}

const updateOrgFollowingList = async (followingList) => {
    let auth = firebaseCreds.auth
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const res = await updateDoc(userRef,{followingList})
    return {passed:true,reason:res}
}

const updateOrgSavedList = async (savedList) => {
    let auth = firebaseCreds.auth
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const res = await updateDoc(userRef,{savedList})
    return {passed:true,reason:res}
}

const updateOrgLikedList = async (likedList) => {
    let auth = firebaseCreds.auth
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const res = await updateDoc(userRef,{likedList})
    return {passed:true,reason:res}
}

const getOrgNotifications = async () => {
    try {
        let {auth,db,app} = firebaseCreds
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        let activityRef = collection(db,'notifications')
        let q = query(activityRef,where('userUid' ,'==', userUid));
        const querySnapshot = await getDocs(q);
        let list = []


        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });
        console.log(list);
        return {data:list,passed:true};
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}



const getOrgInspiration = async () => {
    let {auth,db,app} = firebaseCreds
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    const q = query(collection(db, "pifs"), where("savedList", "array-contains", userUid));

    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({postId:doc.id,id:doc.id,...doc.data()})
        console.log(doc.id, " => ", doc.data());
    });

    if(list.length > 0) {
        return {passed:true,data:list}

    }

    return {passed:false,data:[]}

}

const addOrgPif = async (pif) => {

    try {
        console.log(pif)
        let {auth,db,app} = firebaseCreds
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        pif.userUid = userUid;
        pif.timestamp = Date.now()
        const docRef = await addDoc(collection(db, "pifs"), pif);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const submitOrgComment = async (post,postId) => {

    try {
        let {db,auth} = firebaseCreds;
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        let {img,imgProvided,initials,displayName} = storeControllers.storeData().orgData.publicData

        let comment = {
            img,
            imgProvided,displayName,initials,
            comment:post,
            postId:postId,
            timestamp:Date.now(),
            userUid
        }
        await addDoc(collection(db, "comments"), comment);
        return {passed:true,comment}
    }catch (e) {
        return {passed:false}
    }

}

let unsubscribeOrgNotifWatcher = null;

const orgNotifWatcher = async () => {
    if(unsubscribeOrgNotifWatcher !== null) {
        return
    }
    let {db,auth} = firebaseCreds;
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    const q = query(collection(db, "notifications"), where("userUid", "==", userUid));
    unsubscribeOrgNotifWatcher = onSnapshot(q, (querySnapshot) => {
        const notifs = [];
        querySnapshot.forEach((doc) => {
            notifs.push({id:doc.id,...doc.data()});
        });
        console.log(notifs,'notifs')
        let newNotification = notifs.filter((val)=>{
            return !val.read
        })
        storeControllers.store.dispatch({type:SET_ORG_NOTIF,payload:{newNotifications: newNotification.length > 0,notifCount:newNotification.length,notificationList:notifs}})
    });
}

let orgPrivateWatcher;

const orgPrivateDataWatcher = async () => {
    // if(userWatcher !== null) {
    //     return
    // }
    //  console.log('activated watcher')
    let {db,auth} = firebaseCreds;
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    let data;
    orgPrivateWatcher = onSnapshot(doc(db, "privateUsers", userUid), (doc) => {
        data = doc.data();
        //  console.log("Private watcher live ", doc.data());
        console.log(data,'data here')
        storeControllers.store.dispatch({type:SET_ORG_PRIVATE,payload:data})
    });


}

let orgPublicWatcher;

const orgPublicDataWatcher = async () => {
    // if(userWatcher !== null) {
    //     return
    // }
    //  console.log('activated watcher')
    let {db,auth} = firebaseCreds;
    let userUid = storeControllers.storeData().orgData.activeOrgId;
    let data;
    orgPublicWatcher = onSnapshot(doc(db, "publicUsers", userUid), (doc) => {
        data = doc.data();
        //  console.log("Private watcher live ", doc.data());
        console.log(data,'data here')
        storeControllers.store.dispatch({type:SET_ORG_PRIVATE,payload:data})
    });


}


const markOrgNotifRead = async (id) => {
    try {
        const notifRef = doc(firebaseCreds.db, "notifications", id);
        const res = await updateDoc(notifRef,{read:true})
        return {passed:true,reason:res}
    } catch (e) {
        console.warn(e,'warning')
    }

}


const getOrgSentNominations = async () => {
    try {
        let {auth,db,app} = firebaseCreds
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        let activityRef = collection(db,'nominations')
        let q = query(activityRef,where('nominatorId' ,'==', userUid));
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

const getOrgRecNominations = async () => {


    try {
        let {auth,db,app} = firebaseCreds
        let userUid = storeControllers.storeData().orgData.activeOrgId;
        let activityRef = collection(db,'nominations')
        let q = query(activityRef,where('nominatedId' ,'==', userUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
        });
        console.log(list);
        return {passed:true,data:list};
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

const rejectOrgNominations = async (nomId) => {
    let {db,auth} = firebaseCreds;

    const nomRef = doc(db, "nominations", nomId);
    const res = await updateDoc(nomRef,{pending:false,accepted:false})
}

const withdrawOrgNominations = async (nomId) => {
    let {db,auth} = firebaseCreds;

    const nomRef = doc(db, "nominations", nomId);
    const res = await updateDoc(nomRef,{withdrawn:true,pending:false})
}

//start

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

const submitFeedback = async (message) => {
    try {
        let {db,auth} = firebaseCreds;
        let userUid = auth.currentUser.uid;
        await addDoc(collection(db, "feedback"), {
            userUid: userUid,
            feedback:message
        });
        return {passed:true}
    }catch (e) {
        return {passed:false}
    }

}

const reportUser = async (message,reportedUserUid,postId) => {
    try {
        let {db,auth} = firebaseCreds;
        let userUid = auth.currentUser.uid;
        console.log(userUid)
        await addDoc(collection(db, "reportUser"), {
            submitter: userUid,
            reportedUser:reportedUserUid,
            feedback:message,
            postId:postId,
            timestamp:Date.now()
        });
        return {passed:true}
    }catch (e) {
        console.log(e)
        return {passed:false}
    }

}

const reportPost = async (message,reportedUserUid,postId) => {
    try {
        let {db,auth} = firebaseCreds;
        let userUid = auth.currentUser.uid;
        await addDoc(collection(db, "reportPif"), {
            submitter: userUid,
            reportedUser:reportedUserUid,
            feedback:message,
            postId:postId,
            timestamp:Date.now()
        });
        return {passed:true}
    }catch (e) {
        return {passed:false}
    }

}

//come back
//always null for is self on org side
const getUserProfile = async (navigation,route,isSelf,userUid) => {
    try {
        console.log('here',userUid)
        let auth = firebaseCreds.auth;
         let myUid = auth.currentUser.uid;
        // let isSelfUid = (myUid === userUid) || isSelf;
        // let searchUid = isSelfUid ? myUid : userUid;
        const docRef = doc(firebaseCreds.db, "publicUsers", userUid ? userUid: myUid);
        const docSnap = await getDoc(docRef);
        let pifs = await getUserDeeds(false,userUid)
console.log('called and got pifs',pifs.data)
        if (docSnap.exists()) {
            console.log(docSnap.data());
            let data = {pifs:pifs.data.slice(0,pifs.data.length < 5 ? pifs.data.length : 5),userUid:userUid,isSelf,...docSnap.data()}
            navigation.push('PublicProfile',data)
            return {data: {pifs:pifs.data,userUid:userUid,isSelf,...docSnap.data()},passed:true}
        } else {
            console.log("No such document!");
            return {data:null,passed:false,reason:'no such document exists'}
        }
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

const getDeed = async (postId,navigation,route) => {
    try {
        const docRef = doc(firebaseCreds.db, "pifs", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            return loadFullCommentSection(navigation,route,postId,{id:docSnap.id,...docSnap.data()},null,null)
        } else {
            return {data:null,passed:false,reason:'no such document exists'}
        }
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

const getPifPost = async (postId) => {
    try {
        console.log(postId)
        const docRef = doc(firebaseCreds.db, "pifs", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {data:{id:docSnap.id,...docSnap.data()},passed:true,reason:'no such document exists'}
        } else {
            return {data:null,passed:false,reason:'no such document exists'}
        }
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}



const getFollowers = async (isSelf,userUid) => {
    try {
        let {auth,db} = firebaseCreds;
        let myUid = auth.currentUser.uid;
        let searchUid = isSelf ? myUid : userUid;
        const userRef = collection(db,'publicUsers');
        const q = query(userRef,where('followingList','array-contains',searchUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });

        return {passed:true,data:list}
    } catch (e) {
        return {passed:false}
    }

}

const getFollowing = async (isSelf,userUid) => {
    try {
        let {auth,db} = firebaseCreds;
        let myUid = auth.currentUser.uid;
        let searchUid = isSelf ? myUid : userUid;
        const userRef = collection(db,'publicUsers');
        const q = query(userRef,where('followList','array-contains',searchUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });

        return {passed:true,data:list}
    } catch (e) {
        return {passed:false}
    }


}

const getUserDeeds = async (isSelf,userUid) => {
    try {
        let {auth,db} = firebaseCreds;
        let myUid = auth.currentUser.uid;
        let searchUid = isSelf ? myUid : userUid;
        const userRef = collection(db,'pifs');
        const q = query(userRef,where('userUid','==',searchUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });

        return {passed:true,data:list}
    } catch (e) {
        return {passed:false}
    }
}

const getAllUsers = async () => {
    let {auth,db} = firebaseCreds;
    let uid = auth.currentUser.uid;
    const userRef = collection(db,'publicUsers');
    const querySnapshot = await getDocs(userRef);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if(doc.id !== uid) {
            list.push({userUid:doc.id,...doc.data()})
        }
    });
    return {passed:true,data:list}
}


const returnUserFollowingList = async () => {
    let followingList = storeControllers.storeData().userData.publicData.followingList;
    console.log(followingList)
    return followingList;
}

const returnFollowerList = async () => {
    let followingList = storeControllers.storeData().userData.publicData.followList;
    console.log(followingList,'look for follow')
    return followingList;
}

const returnUserLikedList = async () => {
    let likedList = storeControllers.storeData().userData.publicData.likedList;
    return likedList;
}

const returnUserSavedList = async () => {
    let savedList = storeControllers.storeData().userData.publicData.savedList;
    return savedList;
}

const updateFollowingList = async (followingList) => {
    let auth = firebaseCreds.auth
    let userUid = auth.currentUser.uid;
    const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const res = await updateDoc(userRef,{followingList})
    return {passed:true,reason:res}
}

const updateSavedList = async (savedList) => {
    let auth = firebaseCreds.auth
    let userUid = auth.currentUser.uid;
    const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const res = await updateDoc(userRef,{savedList})
    return {passed:true,reason:res}
}

const updateLikedList = async (likedList) => {
    let auth = firebaseCreds.auth
    let userUid = auth.currentUser.uid;
    const userRef = doc(firebaseCreds.db, "publicUsers", userUid);
    const res = await updateDoc(userRef,{likedList})
    return {passed:true,reason:res}
}



const getNotifications = async () => {
    try {
        let {auth,db,app} = firebaseCreds
        let userUid = auth.currentUser.uid;
        let activityRef = collection(db,'notifications')
        let q = query(activityRef,where('userUid' ,'==', userUid));
        const querySnapshot = await getDocs(q);
        let list = []


        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
            console.log(doc.id, " => ", doc.data());
        });
        console.log(list);
        return {unread:list.filter((val)=>{
            return !val.read
            }),read:list.filter((val)=>{
            return val.read
            }),passed:true};
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}



const getInspiration = async () => {
    let {auth,db,app} = firebaseCreds
    let userUid = auth.currentUser.uid;
    const q = query(collection(db, "pifs"), where("savedList", "array-contains", userUid));

    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({postId:doc.id,id:doc.id,...doc.data()})
        console.log(doc.id, " => ", doc.data());
    });

    if(list.length > 0) {
        return {passed:true,data:list}

    }

    return {passed:false,data:[]}

}

const addPif = async (pif) => {

    try {
        console.log(pif)
        let {auth,db,app} = firebaseCreds
        let userUid = auth.currentUser.uid;
        pif.userUid = userUid;
        pif.timestamp = Date.now()
        await addDoc(collection(db, "pifs"), pif);

        return {passed:true}
    } catch (e) {
        console.log(e)
        return {passed:false}
        //console.error("Error adding document: ", e);
    }
}

const getTagOptions = async () => {
    let {auth,db} = firebaseCreds;

    const tagRef = collection(db,'tagList')
    const querySnapshot = await getDocs(tagRef);
    let list = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({tagName:doc.data().tagName,score:doc.data().relevancyScore})
        //console.log(doc.id, " => ", doc.data());
    });

    return {passed:true,

    list: list.sort((a,b)=>{
        return b.relevancyScore = a.relevancyScore
    }).map((val)=>{
        return val.tagName
    })

    }
}


const getAllDeeds = async (tagList) => {
    if(networkStats.isConnected) {
        return showToastMessage('No Internet','It seems that you have lost internet connection.','ios-wifi')

    }
    let {auth,db} = firebaseCreds;
    const pifRef = collection(db,'pifs')

    let list = []
if(tagList.length > 0) {
    const q = query(collection(db, "pifs"), where("tagList", "array-contains-any", tagList));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let newData = {postId:doc.id}
        list.push({id:doc.id,postId:doc.id,...doc.data()})
        //console.log(doc.id, " => ", doc.data());
    });

    console.log(list,'here')
} else {
    const querySnapshot = await getDocs(pifRef);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let newData = {postId:doc.id}
        list.push({id:doc.id,postId:doc.id,...doc.data()})
        //console.log(doc.id, " => ", doc.data());
    });

    console.log(list,'here')
}
    //
   ///const q = query(userRef,where('userUid','==',searchUid));
   //const q = query(pifRef, orderBy("timestamp"))
   // const querySnapshot = await getDocs(q);


    //
    // //
    // let list = []
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     list.push({postId:doc.id,...doc.data()})
    // });
    return {passed:true,data:list}
}

const loadCommentSection = async (navigation,route,postId,pifData,moveToTop,posterUid,altScreen) => {
    try {
        let {auth,db,app} = firebaseCreds
        console.log(postId)

        const q = query(collection(db, "comments"), where("postId", "==", postId));

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot,'query')
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data(),'ran')
            list.push({id:doc.id,...doc.data()})
        });

        console.log(list,'from call')

        navigation.push('CommentSection',{
            commentsExist:list.length > 0,
            commentList:list,
            pifData:pifData,
            postId:postId
        })


    } catch (e) {
        console.warn(e)
    }


}

const loadFullCommentSection = async (navigation,route,postId,pifData,moveToTop,posterUid) => {
    try {
        let {auth,db,app} = firebaseCreds
        console.log(postId)
        const q = query(collection(db, "comments"), where("postId", "==", postId));

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot,'query')
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data(),'ran')
            list.push({id:doc.id,...doc.data()})
        });

        console.log(list,'from call')

        navigation.push('ViewSinglePost',{
            commentsExist:list.length > 0,
            commentList:list,
            pifData:pifData,
            postId:postId
        })


    } catch (e) {
        console.warn(e)
    }


}

const submitComment = async (post,postId) => {

    try {
        let {db,auth} = firebaseCreds;
        let userUid = auth.currentUser.uid;
        let {img,imgProvided,initials,displayName} = storeControllers.storeData().userData.publicData

        let comment = {
            img,
            imgProvided,displayName,initials,
            comment:post,
            postId:postId,
            timestamp:Date.now(),
            userUid
        }
        await addDoc(collection(db, "comments"), comment);
        return {passed:true,comment}
    }catch (e) {
        return {passed:false}
    }

}

let unsubscribeNotifWatcher = null;

const notifWatcher = async () => {
    if(unsubscribeNotifWatcher !== null) {
        return
    }
    let {db,auth} = firebaseCreds;
    let userUid = auth.currentUser.uid;
    const q = query(collection(db, "notifications"), where("userUid", "==", userUid));
    unsubscribeNotifWatcher = onSnapshot(q, (querySnapshot) => {
        const notifs = [];
        querySnapshot.forEach((doc) => {
            notifs.push({id:doc.id,...doc.data()});
        });
        console.log(notifs,'notifs')
        let newNotification = notifs.filter((val)=>{
            return !val.read
        })
        storeControllers.store.dispatch({type:SET_NOTIF,payload:{newNotifications: newNotification.length > 0,notifCount:newNotification.length,notificationList:notifs}})
    });
}
let userWatcher;

const userDataWatcher = async () => {
    // if(userWatcher !== null) {
    //     return
    // }
  //  console.log('activated watcher')
    let {db,auth} = firebaseCreds;
    let userUid = auth.currentUser.uid;
    let data;
    userWatcher = onSnapshot(doc(db, "privateUsers", userUid), (doc) => {
       data = doc.data();
      //  console.log("Private watcher live ", doc.data());
        console.log(data,'data here')
        storeControllers.store.dispatch({type:UPDATE_USER_PRIVATE_DATA,payload:data})
    });


}

let actionWatcher;

const userActionWatcher = async () => {
    // if(userWatcher !== null) {
    //     return
    // }
    //  console.log('activated watcher')
    let {db,auth} = firebaseCreds;
    let userUid = auth.currentUser.uid;
    let data;
    actionWatcher = onSnapshot(doc(db, "actionLists", userUid), (doc) => {
        data = doc.data();
        //  console.log("Private watcher live ", doc.data());
        storeControllers.store.dispatch({type:UPDATE_ACTIONS_LISTINGS,payload:data})
    });


}


const markNotifRead = async (id) => {
    try {
        const notifRef = doc(firebaseCreds.db, "notifications", id);
        const res = await updateDoc(notifRef,{read:true})
        return {passed:true,reason:res}
    } catch (e) {
        console.warn(e,'warning')
    }

}


const getSentNominations = async () => {
    try {
        let {auth,db,app} = firebaseCreds
        let userUid = auth.currentUser.uid;
        let activityRef = collection(db,'nominations')
        let q = query(activityRef,where('nominatorId' ,'==', userUid));
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

const getRecNominations = async () => {


    try {
        let {auth,db,app} = firebaseCreds
        let userUid = auth.currentUser.uid;
        let activityRef = collection(db,'nominations')
        let q = query(activityRef,where('nominatedId' ,'==', userUid));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
        });
        console.log(list);
        return {passed:true,data:list};
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

const rejectNominations = async (nomId) => {
    let {db,auth} = firebaseCreds;

    const nomRef = doc(db, "nominations", nomId);
    const res = await updateDoc(nomRef,{pending:false,accepted:false})
}

const withdrawNominations = async (nomId) => {
    let {db,auth} = firebaseCreds;

    const nomRef = doc(db, "nominations", nomId);
    const res = await updateDoc(nomRef,{withdrawn:true,pending:false})
}

//end
//end


//Business Organization Section


const checkForOrganization = async (placeId) => {
    try {
        let {auth,db,app} = firebaseCreds
        let activityRef = collection(db,'potentialOrgProfiles')
        let q = query(activityRef,where('placeId' ,'==', placeId));
        const querySnapshot = await getDocs(q);
        let list = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({id:doc.id,...doc.data()})
        });
        let document = null;
        if(list.length > 0) {
            document = list[0]
        }
        return {passed:true,data:list,isActivated:document?.hasBeenActivated,exists:list.length > 0};
    } catch (e) {
        return {data:null,passed:false,reason:e}

    }
}

const matchCode = async (placeId,code) => {
    let {auth,db,app} = firebaseCreds
    let codeRef = collection(db,'codeRef')
    let q = query(codeRef,where('code' ,'==', code));
    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({id:doc.id,...doc.data()})
    });

    return {
        passed:true,
        list,
        exists:list.length > 0
    }

}

const orgCreateRequest = async (placeId,placeInfo) => {
    try {
        let {auth,db,app} = firebaseCreds;
        let userUid = auth.currentUser.uid;
        await addDoc(collection(db, "orgCreation"), {
           name:placeInfo.name,
            imgProvided:placeInfo.imgProvided,
            img:placeInfo.imgProvided ? placeInfo.img : null,
            city:placeInfo.city,
            state:placeInfo.state,
            formatted_address:placeInfo['formatted_address'],
            lat:placeInfo.lat,
            long:placeInfo.long,
            website:placeInfo.website,
            userUid,
            placeId,
            appMsg:placeInfo.appMsg,
            applicantName:placeInfo.applicantName
        });
        return {passed:true}
    } catch (e) {
        return {passed:false,reason:e}
    }

}

const signOutOrg = async () => {

}

const testSecondOption = async (options) => {
    let result = await ImagePicker.launchImageLibraryAsync(options ? options : {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        //videoMaxDuration:30,
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
    });
console.log(result)
    // const uri = Platform.OS === 'ios' ? result.uri.replace('file://','') : result.uri;
    // const storage = getStorage(firebaseCreds.app);
    // const storageRef = ref(storage,`43vids/${Date.now()}`);
    // await uploadString(storageRef, uri, 'data_url').then((snapshot) => {
    //     console.log('Uploaded a base64 string!');
    // });

}

const doImgUpload = async () => {

    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //videoMaxDuration:30,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if(result.cancelled) {
            return {passed:false,reason:'canceled'}
        }
        const resp = await fetch(result.uri);
        const blob = await resp.blob()
       await waitACertainTime(3000)
        let{auth} = firebaseCreds
        let userUid = auth.currentUser.uid;
        const storage = getStorage(firebaseCreds.app);
        const storageRef = ref(storage,`43pics/${Date.now()}${userUid}.jpg`);
        await  uploadBytesResumable(storageRef,blob).then((snap)=>{

        }).catch((e)=>{
            return {passed:false,reason:'something went wrong with the upload'}
        })

        let url = await getDownloadURL(storageRef);
        blob.close()
        return {passed:true,link:url};
    } catch (e) {
        console.log('error here',e)
    }



}

const doImgUploadForProfile = async () => {

    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //videoMaxDuration:30,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if(result.cancelled) {
            return {passed:false,reason:'canceled'}
        }
        const resp = await fetch(result.uri);
        const blob = await resp.blob()
        await waitACertainTime(3000)
        let{auth} = firebaseCreds
        let userUid = auth.currentUser.uid;

        const storage = getStorage(firebaseCreds.app);
        const storageRef = ref(storage,`userProfilePics/${userUid}/profile.jpg`);
        await  uploadBytesResumable(storageRef,blob).then((snap)=>{

        }).catch((e)=>{
            return {passed:false,reason:'something went wrong with the upload'}
        })

        let url = await getDownloadURL(storageRef);
        blob.close()
        return {passed:true,link:url};
    } catch (e) {

    }



}

const doVideoUpload = async () => {



    let result = await ImagePicker.launchImageLibraryAsync( {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        //videoMaxDuration:30,
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
    });

    if(result.cancelled) {
        return {passed:false,reason:'canceled'}
    }


    const resp = await fetch(result.uri);
    const blob = await resp.blob()
     await waitACertainTime(6000)
    let{auth} = firebaseCreds
    let userUid = auth.currentUser.uid;
    const storage = getStorage(firebaseCreds.app);
    const storageRef = ref(storage,`43vids/${Date.now()}${userUid}.mp4`);
    await  uploadBytesResumable(storageRef,blob).then((snap)=>{

    }).catch((e)=>{
        return {passed:false,reason:'something went wrong with the upload'}
    })

    let url = await getDownloadURL(storageRef);
    blob.close()
    return {passed:true,link:url};

}

// Create a storage reference from our storage service



const getPifInspoTrend = async (inspoTrend,postId) => {
let title;
    try {
        let list = [];
        let {db} = firebaseCreds
        let pifRef = collection(db,'pifs')
        if(inspoTrend === 'inspo') {
title='Inspiration'
            let q = query(pifRef,where('inspirationId' ,'==', postId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                list.push({id:doc.id,...doc.data()})

            });

        } else {
            title='Trending'
            let q = query(pifRef,where('trendId' ,'==', postId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                list.push({id:doc.id,...doc.data()})

            });
        }

        return {passed:true,data:list.sort((a,b)=>{
            return a.timestamp-b.timestamp
            }),title}
    } catch (e) {
        return {passed:false}
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
    changeUserPassword,
    submitFeedback,
    getUserProfile,
    getFollowers,
    getFollowing,
    getUserDeeds,
    getAllUsers,
    returnUserFollowingList,
    updateFollowingList,
    getNotifications,
    getInspiration,
    transformBlobForPost,
    uploadToFirebaseForPost,
    addPif,
    getAllDeeds,
    updateSavedList,
    updateLikedList,
    returnUserSavedList,
    returnUserLikedList,
    loadCommentSection,
    submitComment,
    notifWatcher,
    markNotifRead,
    getSentNominations,
    getRecNominations,
    withdrawNominations,
    rejectNominations,
    getDeed,
    getPifPost,
    returnFollowerList,
    checkForOrganization,
    matchCode,
    orgCreateRequest,
    userDataWatcher,
    returnOrgFollowingList,
    returnOrgFollowerList,
    updateOrgLikedList,
    updateOrgSavedList,
    updateOrgFollowingList,

    returnOrgLikedList,
    returnOrgSavedList,
    getOrgDeeds,
    getOrgRecNominations,
    getOrgSentNominations,
    rejectOrgNominations,
    withdrawOrgNominations,
    getOrgInspiration,
    updateOrgBio,
    updateOrgProfilePic,
    orgNotifWatcher,
    signOutOrg,
    getOrgNotifications,
    markOrgNotifRead,
    chatGptImgUpload,
    doImgUpload,
    doVideoUpload,
    testSecondOption,
    signUpUser,
    getPifInspoTrend,
    doImgUploadForProfile,
    startNetworkWatcher,
    getTagOptions,
    markAllNotifsRead,
    updatePushToken,
    reportPost,
    reportUser
}
