import {StyleSheet,Dimensions} from "react-native";
;
export  default StyleSheet.create({
    categoryButton : {
        backgroundColor:'#e3e3e3',
        width:'45%',
        height:Dimensions.get('window').height * .175,
        borderRadius:10
    },
    categoryImg : {
        width:'100%',height:'65%',borderWidth:0,
        borderColor:'black'
    },
    catButtonText : {
        fontSize:15,
        color:'#101010',
        fontFamily:"Arial",
        fontWeight:'bold'
    },
    roundedButton : {
        borderRadius: 20,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    outlineIconButton : {
        borderRadius: 20,
        borderWidth:1,
        backgroundColor:'green'
    },
    responseButton : {
        borderRadius: 20,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around'
    }

})
