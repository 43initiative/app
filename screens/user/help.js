import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    ScrollView,
    TextInput,
    Keyboard
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import VStack from "../../designComps/vstack";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
import {activateLoading, deactivateLoading, showToastMessage} from "../../reducers/controllers";
import {waitACertainTime} from "../../helperFuncs/timers/wait";
import {submitFeedback} from "../../firebase/fireStarter";


export default class Help extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            helpFeedback:''
        }

    }

    submitFeedback = async () => {
        activateLoading()
        let response = await submitFeedback(this.state.helpFeedback)
        if(response.passed) {
            showToastMessage('Success!','Your feedback has been submitted','ios-checkmark')
        } else {
            showToastMessage('That did not work!','Your feedback failed to submit','ios-close-circle')

        }
        deactivateLoading()
        waitACertainTime(3000);
        this.props.navigation.goBack()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View style={[{width:'100%',marginLeft:'0%',paddingLeft:'5%',paddingRight:'5%',backgroundColor:'white'},flexing.rowStart]}>
                    <TouchableOpacity style={[{width:'25%'}]} onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                    <View style={[{width:'50%'}]}><Text style={[{fontSize:16,fontWeight:'bold',textAlign:'center'}]}>Help & Feedback</Text></View>

                </View>
                <View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                    <View style={[flexing.rowStart,{width:'90%',marginLeft:'5%',marginTop:'5%'}]}>
                        <Ionicons name={'ios-help-buoy'} size={30} color={'#c6302c'}/>
                        <Spacer spacing={.025} xAxis/>
                        <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                            Send us feedback
                        </Text>

                    </View>
                    <Text style={[{color:'black',width:'90%',marginLeft:'5%',marginTop:'2.5%',fontSize:15}]}>
                        If you want to send feedback, or let us know about an issue you're having, you can let us know here. We will reach out
                        to you through the email on your account.
                    </Text>
                        <VStack al={'flex-start'} jc={'flex-start'} width={.9} left={.05}  height={.4} top={.05} style={{backgroundColor:'transparent'}}>
                            <TextInput

                                multiline
                                style={[
                                    {paddingTop:'5%',padding:'5%',width:'100%',alignItems:'flex-start', height:'90%',borderWidth:.5,borderColor:'#e3e3e3',borderRadius:20}
                                ]}
                                value={this.state.helpFeedback}
                                onChangeText={(val)=>{this.setState({helpFeedback:val})}}
                                placeholderTextColor={'#a3a3a3'}
                                placeholder={`Tell us what's going on!`}
                            />
                        </VStack>

                </View>
                <View style={[{position:'absolute',top:'75%',width:'90%',marginLeft:'5%',height:'15%'}]}>
                    <RoundedButton disabled={this.state.helpFeedback === ''} pressed={()=>{this.submitFeedback()}} style={[{width:'90%',marginLeft:'5%',height:'50%'}]} bgColor={'#c6302c'} text={'Submit Feedback'}/>

                </View>

            </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }


}
