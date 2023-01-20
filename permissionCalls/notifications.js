import * as Notifications from 'expo-notifications'
import { Linking,Alert,AppState } from 'react-native'
import {launchAlertDialog} from './alertDialogs'


const getPermissions = async (proceedToRequest) => {
    let currentPermissions = await Notifications.getPermissionsAsync();
    //return basic response
    let permissionResponse =  {
        permitted:currentPermissions.granted,
        canAskAgain:currentPermissions.canAskAgain,
        expiration:currentPermissions.expires,
    }

    if(proceedToRequest && !permissionResponse.permitted) {
        if(permissionResponse.canAskAgain) {
            return requestPermissions();
        }
        return openAlertDialog()
    }
    return permissionResponse;
}

const grabPushToken = async () => {
    let pushToken =  (await Notifications.getExpoPushTokenAsync({experienceId:'@mangicode/foodee'})).data;
    return pushToken;
}

const openAlertDialog = async () => {
    let launchDialog = await launchAlertDialog("Turn on Push Notifications",
        "You have denied permission before, so you will have to allow notifications from the settings menu.",false,
        [
            {text:'Cancel',buttonResponse:{isFunc:false,buttonExec:{permissionDenied:true,fromPoint:'alert'}},style:'cancel'},
            {text:'Open Settings',buttonResponse:{isFunc:true,buttonExec:openNotificationSettings},style:null}
        ])
    console.log(launchDialog)
    if(launchDialog.isFunc) {
        return launchDialog.execution()
    }
    return launchDialog.execution;
}


const openNotificationSettings = async () => {
    // let appState = AppState;
    // appState.addEventListener('change',(ev)=>{
    //     if(settingsOpen && ev === 'active') {
    //         return assessReturnFromNotifications(appState)
    //     }
    // })
    //  let settingsOpen =
    await Linking.openURL('app-settings:');
}



const removeStateListener = async (apper) => {
    console.log('here')
    apper.removeEventListener('change',(ev)=>{
        console.log('closed out listener',ev)
    })
}

const requestPermissions = async () => {
    return Notifications.requestPermissionsAsync()
}

const deliverNotification = async (title,body) => {
    let permissionCheck = await getPermissions(false);
    if(permissionCheck.permitted) {
        await  Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });
        return  Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
            },
            trigger: {seconds:1},
        });
    }

}

const assessReturnFromNotifications = async (apper) => {
    await removeStateListener(apper);
    // let permissionCheck = await getPermissions(false);
    // console.log(permissionCheck)
    // if(permissionCheck.permitted) {
    //     return displayStatusOnReturn('Notifications Now On!','Notifications have been turned on succesfully.')
    // } else {
    //     return displayStatusOnReturn('Notifications Still Off!','Notifications will still not appear for you.')
    // }
}
const displayStatusOnReturn = async (title,message) => {
    await launchAlertDialog(title,message,false,[{text:'OK',buttonResponse:{isFunc:false,buttonExec:{completed:true}},style:null}])
}




module.exports = {
    getPermissions:getPermissions,
    requestPermissions:requestPermissions,
    deliverNotification:deliverNotification,
    grabPushToken:grabPushToken
}
