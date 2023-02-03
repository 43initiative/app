import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, SafeAreaView, ScrollView
} from 'react-native';
import {dimensions, flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import {signOutOrg, signOutUser} from "../../firebase/fireStarter";


export default class OrgSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }


    signOut = async () => {
        let response = await signOutOrg();
        if(response.passed) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'SplashScreen' }],
            });
        } else {
            alert('sign out failed')
        }
    }

    render() {
        //change email
        //change password
        //privacy policy
        //tos
        //about
        //faq
        //delete account
        return (
            <SafeAreaView>
                <View style={[{width:'100%',marginLeft:'0%',paddingLeft:'5%',paddingRight:'5%',backgroundColor:'white'},flexing.rowBetween]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                    <View><Text style={[{fontSize:16,fontWeight:'bold'}]}>Settings</Text></View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('HelpScreen')}}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-help-buoy-outline'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={[{backgroundColor:'white'}]}>
                    <Spacer spacing={.05}/>
                    <Animated.View style={[flexing.startColumn, {backgroundColor:'white',width: '100%', height: dimensions.returnHeight(1),alignItems:'center'}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TermsScreen')}} style={[flexing.rowStart,{borderTopWidth:0,marginTop:15,width:'90%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>
                            <Ionicons name={'ios-newspaper-outline'} size={30} color={'black'}/>
                            <Spacer xAxis={true} spacing={.025}/>
                            <Text>Terms of Service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PrivacyScreen')}} style={[flexing.rowStart,{borderTopWidth:0,marginTop:15,width:'90%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>
                            <Ionicons name={'ios-glasses-outline'} size={30} color={'black'}/>
                            <Spacer xAxis={true} spacing={.025}/>
                            <Text>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FAQ')}} style={[flexing.rowStart,{borderTopWidth:0,marginTop:15,width:'90%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>
                            <Ionicons name={'ios-help-circle-outline'} size={30} color={'black'}/>
                            <Spacer xAxis={true} spacing={.025}/>
                            <Text>FAQ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.signOut()}} style={[flexing.rowStart,{borderTopWidth:0,marginTop:15,width:'90%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>
                            <Ionicons name={'log-out-outline'} size={30} color={'black'}/>
                            <Spacer xAxis={true} spacing={.025}/>
                            <Text>Log Out</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </ScrollView>
            </SafeAreaView>
        )
    }


}
