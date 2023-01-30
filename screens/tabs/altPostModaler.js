import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import VStack from "../../designComps/vstack";
import {flexing} from "../../styles/dimensions/dims";


export default class AltPostModaler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }


    createPif= () => {
            this.props.navigation.goBack()
            this.props.navigation.push('CreateDeedPost',{
                isNomination:false
            })
    }

    render() {
        return (
<View style={{width:'100%',height:'100%',marginLeft:'0%',backgroundColor:'white'}}>

                <TouchableOpacity onPress={()=>{this.createPif()}} style={[{width:'100%',height:'15%',paddingTop:'5%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                    <View  style={[{backgroundColor:'white',alignItems:'center',height:'100%'},flexing.rowAround]}>
                        <Ionicons name={'ios-heart-outline'} color={'red'} size={30}/>
                        <View style={[flexing.startColumn]}>
                            <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Post a Pif (Pay it forward)</Text>
                            <Text style={[{fontSize:12,color:'#101010'}]}>Post a good deed you have done for someone else.</Text>
                        </View>
                        <Ionicons name={'ios-chevron-forward'} color={'gray'} size={30}/>

                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=>{this.logInspiration()}} style={[{width:'100%',height:'15%',paddingTop:'5%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                    <View  style={[{backgroundColor:'white',alignItems:'center',height:'100%'},flexing.rowAround]}>
                        <Ionicons name={'ios-heart-half-outline'} color={'red'} size={30}/>
                        <View style={[flexing.startColumn]}>
                            <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Log an appreciation</Text>
                            <Text style={[{fontSize:12,color:'#101010'}]}>Create a journal entry of good deeds done for you.</Text>
                        </View>
                        <Ionicons name={'ios-chevron-forward'} color={'gray'} size={30}/>

                    </View>
                </TouchableOpacity>
            </View>
        )

    }


}
