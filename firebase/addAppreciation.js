import {initialize,returnStore} from "./fireInit";
import {addDoc, collection} from "firebase/firestore";


//when backend is added we should send only the message, the image, location, and the userId
//allow the backend to sanitize and format the rest of the details solely from the user's public info
//such as : img, username, timestamp
// this is when activity should be logged as well

const addAppreciation = async (message,isImg,img) => {
    let tempImg = 'https://cdn.mos.cms.futurecdn.net/huGmJ8ib2J2fHoz7YG2Qr6.jpg'
    let store = await returnStore();
    let db = store.getState().globe.fireStoreDb;
    console.log(db);
    let appreciation = {
        userName:'Joseph Mangi',
        userId:'KH5vtjQg6HPOTHEFTfln',
        userImg:tempImg,
        timestamp:Date.now(),
        imgIncluded:isImg,
        img:isImg ? tempImg : 'none',
        location:{
            lat:0,
            long:0
        },
        post:message,
    }
            const docRef = await addDoc(collection(db, "appreciations"), appreciation);
            console.log("Document written with ID: ", docRef.id);

return docRef.id

}

const getMyAppreciations = async () => {

}

module.exports = {
    addAppreciation
}
