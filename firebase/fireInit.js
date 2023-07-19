// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";

import { doc, getDocs,getFirestore,collection,getDoc,addDoc,query, where } from "firebase/firestore";




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
    return store.dispatch({type:'STORE_FIRESTORE_DB',payload:db})

}
let xdb = ''

const initialize = async () => {
    //add new firebaseConfig here
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
        const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
        const db = await getFirestore(app)
        xdb = db;
        console.log(xdb)
        await saveFireDb(db)
        return {db,app}
    }

}



const addData = async (db) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getUserProfileData = async (db,userId) => {
    const docRef = doc(db, "users", "KH5vtjQg6HPOTHEFTfln");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

const getSingleAppreciation = async (appreciationId) => {
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

const getAllUsers = async (db) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let user = {userId:doc.id,...doc.data()}
        users.push(user)
    });
    return users;
}

const addPif = async (db,pif) => {
    try {
        const docRef = await addDoc(collection(db, "pifs"), pif);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getAllPifs = async (db) => {
    const querySnapshot = await getDocs(collection(xdb, "pifs"));
    let pifs = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let pif = {pifId:doc.id,...doc.data()}
        pifs.push(pif)
    });
    return pifs;
}

const getMyAppreciations = async (userUid) => {
   // const querySnapshot = await getDocs(collection(db, "appreciations"));
    let appreciations = []
    let appreciationRef = collection(xdb,'appreciations');
    let q = query(appreciationRef,where("userId",'==',userUid))
    const querySnapshot = await getDocs(q);
   await  querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        appreciations.push({id:doc.id,...doc.data()})
    });

    return appreciations;
}


//eYjAI2Syuoz8wwM49wIW
const getSpecificPif = async (db,pifId) => {
    const docRef = doc(db, "pifs", pifId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}


module.exports = {
    initialize,
    addData,
    getUserProfileData,
    addPif:addPif,
    getSpecificPif:getSpecificPif,
    getAllUsers:getAllUsers,
    getAllPifs:getAllPifs,
    returnStore,
    saveStore,
    getMyAppreciations,
    getSingleAppreciation
}


