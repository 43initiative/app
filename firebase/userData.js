import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";

import { doc, getDocs,getFirestore,collection,getDoc,addDoc,query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const signUpUser = async (email,password) => {
    try {
        const auth = getAuth()
        let x = await createUserWithEmailAndPassword(auth,email,password)
        let userUid = x.user.uid;
        console.log(auth,'here is the auth')
        await AsyncStorage.setItem('exAccessToken',userUid)
        return {passed:true,userUid}
    } catch (e) {
        return {passed:false,error:e.code,errorMsg:e.message}
    }

}



const getUserData = async (userUid) => {
    console.log(getAuth().currentUser.uid,'this is the user id');
    const docRef = doc(xdb, "appreciations", appreciationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

const saveInitialUserData = async (userUid,data) => {
    let db ;
    return db.doc(`publicUsers/${userUid}`).set({
        firstName:data.firstName,
        lastName:data.lastName,
        aboutMe:data.aboutMe,
        displayName:`${data.firstName} ${data.lastName}`,
        birthMonth:data.birthMonth,
        birthYear:data.birthYear,
        img:data.imgProvided ? data.img : '',
        imgProvided:data.imgProvided,
        isOrganization:false,
        initials:`${data.firstName.split('')[0]}.${data.lastName.split('')[0]}.`,
        deedCount:[],
        city:data.city,
        state:data.state,
        followingCount:0,
        followerCount:0,
        followList:[],
        followingList:[]
    })
}



const checkForSignUpCompletion = async (xdb) => {
    const userUid = getAuth().currentUser.uid;
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

module.exports = {
    getUserData,
  //  signUpUser,
    saveInitialUserData,

    checkForSignUpCompletion
}
