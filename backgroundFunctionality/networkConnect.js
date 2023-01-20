import NetInfo from "@react-native-community/netinfo";
let netInfoSubscription;
const subscribeToNetworkInfo = () => {
    netInfoSubscription = NetInfo.addEventListener((state)=>{
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
    })
}

const unsubscribeFromNetworkInfo = () => {
    netInfoSubscription()
}


module.exports = {
    subscribeToNetworkInfo:subscribeToNetworkInfo,
    unsubscribeFromNetworkInfo:unsubscribeFromNetworkInfo
}
