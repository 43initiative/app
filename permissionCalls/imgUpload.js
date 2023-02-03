
import * as ImagePicker from 'expo-image-picker';
import {Platform, Alert,AppState,ActivityIndicator} from 'react-native';


const currentAppState = {
    currentState:null
}

//check for permissions
const acquireAnImage = async(followDenialWithAlert,options,firebaseReference,bucket,name) => {
    try {
        console.log('here')
        if (Platform.OS !== 'web') {
            console.log('here')

            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(status)
              //await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    if(followDenialWithAlert) {
                        return accessWasDenied()
                    } else {
                        return {passed:false,message:'Camera permissions have been denied',status:status}
                    }
                } else {
                    return selectAnImage(options,firebaseReference,bucket,name)
                }
            } else {
                return {passed:false,message:'Web Platform is not suppported here'}
            }
            }

            catch (e) {
        console.log(e)
        return {passed:false,message:`Caught in catch, ${e}`}

    }

}



//granted
const selectAnImage = async (options ,firebaseReference,bucket,name) => {
    try {

        let result = await ImagePicker.launchImageLibraryAsync(options ? options: {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection:false,
            aspect: [4, 3],
            quality:1,
            base64:false
        });
        console.log(result)

        if (!result.canceled) {
            let selectedImage = result.assets[0].uri;
           // console.log(result.assets,'assets')
            console.log(selectedImage)
            return {passed:true,link:selectedImage,}
            // return transformBlob(selectedImage,firebaseReference,bucket,name)
        } else {
            return {passed:false}
        }
    } catch (e) {

    }

};


//not granted

const accessWasDenied = async () => {
    await  Alert.alert(
        "You Have Denied Camera Access",
        "If you'd like to change your mind, you can change settings manually.",
        [
            {
                text: "Cancel",
                onPress: () => {

                },
                style: "cancel"
            },
            { text: "Go To Settings", onPress: () => {
                  //  watchForReturnToApp();
                   // return openSettings()
                } }
        ],
        { cancelable: false }
    );
}

//send to settings



const endAppStateListener = async () => {
    AppState.removeEventListener('change',(current)=>{
        currentAppState.currentState = null;
    })
}


//transform to blob
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
        if(!fire.auth().currentUser) {
            userUid = 'xxx'
        } else {
            userUid = fire.auth().currentUser.uid;
        }
        let ref = fire.storage().ref(`${bucket}/${userUid}/${name}`);
        //let searchRef = fire.storage().ref(`${bucket}/${userUid}/${name}_200x200`);
        await ref.put(img);
        return getDownloadUrl(ref,userUid)
    } catch (e) {
        return {passed:false,e:e}

    }

}

const getDownloadUrl = async (ref,userUid) => {
    try {
        let link = await ref.getDownloadURL();
        return {link:link,userUid:userUid,passed:true}
    } catch (e) {
        return getDownloadUrl(ref,userUid)
    }

}


//request validation-- this will be called seperetly

const requestValidation = async (img,fire,bucket,name) => {
//const requestValidation = async (link,fire,userUid,scanBranch) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let blob =  await transformBlob(img,fire,bucket,name)
            if(!blob.passed) {
                console.log('error')
            }
            let submitForScan = fire.database().ref('imageUpload');
            let imgObject = {
                userUid:blob.userUid,
                processed:false,
                error:false,
                passed:false,
                downloadUrl:blob.link
            }

            let watchForResult = await submitForScan.push(imgObject);
            let resultingBranch =  submitForScan.child(watchForResult.key)
            await resultingBranch.on('value',(snap)=>{
                if(snap.exists()) {
                    let data = snap.val()
                    console.log(`current data is ${JSON.stringify(data)}`)
                    if(data.processed) {
                        // if(data.error) {
                        //     console.log('inappropriate')
                        // } else {
                        //     console.log('image passed')
                        // }
                        return resolve({passed:true,error:data.error,errorMsg:data.errorMsg,branch:resultingBranch})
                        //return unsubscribeFromBranch(resultingBranch,data.error,data.errorMsg)
                    }
                }
            })

        } catch (e) {
            return {passed:false,e:e}
        }
    })


}



const addTo43Img = async  (img,fire,bucket,name) => {
    try {
        const response = await fetch(img);
        const blob = await response.blob();
        return uploadToFirebase(blob,fire,bucket,name)
    } catch (e) {
        console.log(e)
        return {passed:false,e:e}
    }

}


const unsubscribeFromBranch = async (branch) => {
    await branch.off()
    return {passed:true}
}

export {acquireAnImage,requestValidation,unsubscribeFromBranch,uploadToFirebase,transformBlob}
