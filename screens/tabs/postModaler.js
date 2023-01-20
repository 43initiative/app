import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import Hstack from "../../designComps/hstack";
import Splash from "../../scaffold/splash";
import Spacer from "../../design/spacer";
import VStack from "../../designComps/vstack";
import {Ionicons} from "@expo/vector-icons";


export default class PostModaler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    createPif = async () => {
       await this.props.navigation.goBack()
         return  this.props.navigation.navigate('CreatePif')
    }

    logInspiration = async () => {
        await this.props.navigation.goBack()
        return  this.props.navigation.navigate('LogAppreciation')
    }

    render() {
        return (
            <View onPointerDownCapture={()=>{this.props.navigation.goBack()}} style={{height:Dimensions.get('window').height * .3,borderRadius:30,padding:'5%',marginTop:Dimensions.get('window').height * .7,width:'100%',backgroundColor:'white' }}>
                <Hstack width={1} height={.15} jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false}>


                <Text style={[{fontSize:18,fontWeight:'bold',color:'#101010'}]}>What would you like to do?</Text>
<TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Ionicons name={'ios-close-circle'} color={'black'} size={25}/>
</TouchableOpacity>
                </Hstack>
<Spacer spacing={.0125}/>
                <TouchableOpacity onPress={()=>{this.createPif()}} style={[{width:'100%',height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                    <Ionicons name={'ios-heart-outline'} color={'red'} size={30}/>
                    <VStack al={'flex-start'} height={.9} width={.8}>
                        <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Post a Pif (Pay it forward)</Text>
                        <Text style={[{fontSize:12,color:'#101010'}]}>Post a good deed you have done for someone else.</Text>
                    </VStack>
                    <Ionicons name={'ios-chevron-forward'} color={'gray'} size={30}/>

                </Hstack>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=>{this.logInspiration()}} style={[{width:'100%',height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                    <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                    <Ionicons name={'ios-heart-half-outline'} color={'red'} size={30}/>
                    <VStack al={'flex-start'} height={.9} width={.8}>
                        <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Log Inspo</Text>
                        <Text style={[{fontSize:12,color:'#101010'}]}>Create a journal entry of good deeds done for you.</Text>
                    </VStack>
                        <Ionicons name={'ios-chevron-forward'} color={'gray'} size={30}/>

                </Hstack>
                </TouchableOpacity>
            </View>
        )
    }


}
