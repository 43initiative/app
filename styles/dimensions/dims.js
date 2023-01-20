import {StyleSheet} from "react-native";
import {Dimensions} from "react-native";
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const dimensions = {
    returnHeight : (pct) => {
        return height * pct
    },
    returnWidth : (pct) => {
        return width * pct
    },
}
const displays = {
    absolute: (zIndex,...rest) => {
        return {
            position: 'absolute',
            top: rest[0],
            left: rest[1]
        }
    }
}

const screens = StyleSheet.create({
    fullScreen: {
        width:width,
        height:height,
    },
    overlay : {
        backgroundColor: 'black',
        width:'100%',
        height:'100%',
    }
})

const flexing = StyleSheet.create({
    centerColumn: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },
    spreadColumn : {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        alignContent:'center'
    },
    startColumn : {
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        alignContent:'center',
    },

    endColumn : {
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-end',
        alignContent:'center',
    },
    rowAround : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        alignContent:'center'
    },
    rowStart : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        alignContent:'center'
    },
    rowCenter : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },
    rowEnd : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        alignContent:'center'
    },
    rowBetween : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        alignContent:'center'
    },
    fs : {
        alignItems:'flex-start'
    },
    cc : {
        alignItems:'center'
    },
    smallPadding : {
        padding:10
    }
})

const components = StyleSheet.create({

    toastMessenger: {
        width:width * .9,
        height:height * .1,
        left:width * .05,
        position:'absolute',
        backgroundColor:'#2b2e2d',
        top:height * .8,
        borderRadius:10,
    },
    toastText : {
        fontSize:15,
        color:'white'
    },
    toastHeadline : {
        fontSize:20,
        color:'white'

    }
})


module.exports = {
    flexing,
    dimensions,
    components,
    screens,displays
}
