const {Dimensions, StyleSheet} = require("react-native");
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const createCircle = (radius,borderWidth,borderColor) => {
    return {
        width:height * radius,
        height: height * radius,
        borderRadius:100,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderWidth: borderWidth,
        borderColor:borderColor
    }
}

const createSquare = (radius,borderWidth,borderColor,elongate,expand) => {
    return {
        width:expand ? (height * radius) * expand : height * radius,
        height: elongate ? (height*radius) * elongate : (height * radius),
        borderRadius:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderWidth: borderWidth,
        borderColor:borderColor
    }
}

const fixedShape = StyleSheet.create({
    line : {
        width:'100%',
        height:height * .00125,
        backgroundColor:'#e3e3e3'
    }
})

module.exports = {
    createCircle:createCircle,
    fixedShape:fixedShape,
    createSquare:createSquare
}
