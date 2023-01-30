// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {getAuth, createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword,sendPasswordResetEmail,updateEmail,updatePassword} from "firebase/auth";

import { doc, getDocs,getFirestore,collection,getDoc,addDoc,query, where ,updateDoc,onSnapshot,serverTimestamp,orderBy} from "firebase/firestore";
import {storeControllers} from "../reducers/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {returnStore} from "./fireInit";
import {SET_NOTIF, STORE_PRIVATE_DATA, STORE_PUBLIC_DATA} from "../reducers/actionTypes";
import firebase from "firebase/compat";
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


//add image to post
const transformBlobForPost = async (img,fire,bucket,name) => {
    try {
        const response = await fetch(img);
        const blob = await response.blob();
        return uploadToFirebaseForPost(blob,fire,bucket,name)
    } catch (e) {
        console.log(e)
        return {passed:false,e:e}
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
        const storageRef = ref(storage,`43pics/${userUid}/${Date.now()}`);
        //let ref = fire.storage().ref(`${bucket}/${userUid}/${name}`);
        //let searchRef = fire.storage().ref(`${bucket}/${userUid}/${name}_200x200`);
        await uploadBytes(storageRef, img)
        return getDownloadUrl(storage,storageRef)
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

const getUserProfile = async (navigation,route,isSelf,userUid) => {
    try {
        console.log('here')
        let auth = firebaseCreds.auth;
        let myUid = auth.currentUser.uid;
        let isSelfUid = (myUid === userUid) || isSelf;
        let searchUid = isSelfUid ? myUid : userUid;
        const docRef = doc(firebaseCreds.db, "publicUsers", searchUid);
        const docSnap = await getDoc(docRef);
console.log('called')
        if (docSnap.exists()) {
            console.log(docSnap.data());
            let data = {userUid:searchUid,isSelf,...docSnap.data()}
            navigation.push('PublicProfile',data)
            return {data: {userUid:searchUid,isSelf,...docSnap.data()},passed:true}
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
    const userRef = collection(db,'publicUsers');
    const querySnapshot = await getDocs(userRef);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({userUid:doc.id,...doc.data()})
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
        return {data:list,passed:true};
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
        console.log(pif.inspirationId)
        let {auth,db,app} = firebaseCreds
        let userUid = auth.currentUser.uid;
        pif.userUid = userUid;
        pif.timestamp = serverTimestamp()
        const docRef = await addDoc(collection(db, "pifs"), pif);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getAllDeeds = async () => {
    let {auth,db} = firebaseCreds;
    const pifRef = collection(db,'pifs')
    const querySnapshot = await getDocs(pifRef);

    //
   ///const q = query(userRef,where('userUid','==',searchUid));
   //const q = query(pifRef, orderBy("timestamp"))
   // const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let newData = {postId:doc.id}
        list.push({id:doc.id,postId:doc.id,...doc.data()})
        //console.log(doc.id, " => ", doc.data());
    });

    console.log(list,'here')
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
        let userUid = auth.currentUser.uid;
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
        let userUid = auth.currentUser.uid;
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
    returnFollowerList
}
