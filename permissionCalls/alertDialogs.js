import {Alert} from "react-native";




const createDialogButton = async (buttonObject,resolve) => {
    let {text,buttonResponse,style} = buttonObject;
    let button = {};
    button.text = text;
    button.onPress = () => {
        return resolve({
            isFunc:buttonResponse.isFunc,
            execution:buttonResponse.buttonExec
        })
    }
    if(style) {
        button.style = style;
    }
    return button
}

const launchAlertDialog = async (title,message,cancelable,buttons) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let compiledButtons = []
            for (let i = 0; i < buttons.length; i++) {
                let compiled = await createDialogButton(buttons[i],resolve)
                compiledButtons.push(compiled)
            }
          await Alert.alert(
                title,
                message,
                compiledButtons,
                { cancelable: cancelable }
            )

        } catch (e) {
            return reject(e)
        }
    })


}



module.exports = {
    launchAlertDialog:launchAlertDialog
}