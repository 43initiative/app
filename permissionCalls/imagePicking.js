import { Linking,Alert,AppState } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {launchAlertDialog} from './alertDialogs';


const getPermissions = async (proceedToRequest,camOrImg) => {
    let accessing = camOrImg === 'camera' ? [ImagePicker.getCameraPermissionsAsync,ImagePicker.requestCameraPermissionsAsync,ImagePicker.launchCameraAsync] : [ImagePicker.getMediaLibraryPermissionsAsync,ImagePicker.requestMediaLibraryPermissionsAsync,ImagePicker.launchImageLibraryAsync];
    let currentPermissions = await accessing[0];
    //return basic response
    let permissionResponse =  {
        permitted:currentPermissions.granted,
        canAskAgain:currentPermissions.canAskAgain,
        expiration:currentPermissions.expires,
    }
    console.log(permissionResponse)

    if(proceedToRequest) {
        if(permissionResponse.permitted) {
            return executePermittedActions(accessing[2])
        } else if(permissionResponse.canAskAgain) {
            return requestPermissions();
        }
        return openAlertDialog()
    }
    return permissionResponse;
}

const executePermittedActions = async (accessing) => {
   let result = await accessing({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
   });

   return result;

}

const requestPermissions = async (accessing) => {
    return accessing()
}


const openAlertDialog = async () => {
    let launchDialog = await launchAlertDialog("Allow Camera & Image Access",
        "You have denied permission before, so you will have to allow us to access the camera and image library in the settings. After that, try again.",false,
        [
            {text:'Cancel',buttonResponse:{isFunc:false,buttonExec:{permissionDenied:true,fromPoint:'alert'}},style:'cancel'},
            {text:'Open Settings',buttonResponse:{isFunc:true,buttonExec:openCameraSettings},style:null}
        ])
    console.log(launchDialog)
    if(launchDialog.isFunc) {
        return launchDialog.execution()
    }
    return launchDialog.execution;
}


const openCameraSettings = async () => {

    await Linking.openURL('app-settings:');
}

module.exports = {
    getPermissions:getPermissions
}
