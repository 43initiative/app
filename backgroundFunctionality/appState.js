
import { AppState } from "react-native";

const startAppStateWatcher = () => {
    let appState = AppState.addEventListener('change',(ev)=>{
        console.log(ev)
    })
}

module.exports = {
    startAppStateWatcher:startAppStateWatcher
}
