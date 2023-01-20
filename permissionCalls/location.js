import * as Location from 'expo-location';


const runInitialLocationChecks = async () => {
    try {
        let locationServices = await Location.hasServicesEnabledAsync();
        if(!locationServices) {
            return {passed:false,reason:'servicesDisabled'}
            //have to leave here and ask user to turn on location services
        }
        let result = await Location.getForegroundPermissionsAsync();
        if(result.granted) {
            return {passed:true,reason:'already approved'}

            //somehow we already have perms
        } else {
            if (result.canAskAgain) {
                let result = await Location.requestForegroundPermissionsAsync();
                if (result.granted) {
                    return {passed:true,reason:'approved'}
                    // the user is approved
                } else {
                    //the user denied the request
                    return {passed:false,reason:'denied'}
                }
            } else {
                return {passed:false,reason:'can not ask again'}

            }
        }
    } catch (e) {
        return {passed:false,reason:e}
    }
}

const checkLocationPermissions = async () => {
    try {
        let locationServices = await Location.hasServicesEnabledAsync();
        if(!locationServices) {
            return {passed:false,reason:'servicesDisabled'}
            //have to leave here and ask user to turn on location services
        }
        let result = await Location.getForegroundPermissionsAsync();
        if(result.granted) {
            return {passed:true,reason:'already approved'}

            //somehow we already have perms
        } else {
            if (result.canAskAgain) {
                return {passed:false,canAskAgain:true,reason:'already approved'}

            } else {
                return {passed:false,canAskAgain:false,reason:'can not ask again'}

            }
        }
    } catch (e) {
        return {passed:false,reason:e}
    }
}

const startLocationTracking = async () => {
    let location= await Location.getCurrentPositionAsync({accuracy:2});
console.log(location)
    return { lat:location.coords.latitude,long:location.coords.longitude}

}

export {runInitialLocationChecks,startLocationTracking,checkLocationPermissions}
