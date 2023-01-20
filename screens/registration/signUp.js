import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image,Keyboard,KeyboardAvoidingView
} from 'react-native';

import VStack from "../../designComps/vstack";
import Input from "../../components/inputs/input";
import Spacer from "../../designComps/spacer";
import Hstack from "../../designComps/hstack";
import RoundedButton from "../../components/buttons/roundedButton";
import OutlineIconButton from "../../components/buttons/outlineIconButton";
import {branding} from "../../appSpecifics/branding";
import CheckText from "../../components/text/checkText";
import TextLink from "../../components/text/textLink";
import {signUpUser} from "../../firebase/newFIre";
import {activateLoading, deactivateLoading, showToastMessage} from "../../reducers/controllers";


export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:'',
            confirm:'',
            checked:false,
            confirmPassword:''
        }

    }

    signUpUser = async () => {
        activateLoading();
      let signUpAttempt =  await signUpUser(this.state.email,this.state.password);
      if(signUpAttempt.passed) {
          this.props.navigation.navigate('OnboardingStack')
      } else {
          showToastMessage('SignUp Failed','please try signing in again','ios-sad-outline')
      }
      deactivateLoading()

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style={{width:'100%',height:'100%',backgroundColor:'white'}} >
                    <KeyboardAvoidingView style={[{flex:1}]} behavior={'padding'}>
                        <VStack
                            style={[{borderWidth:0,borderColor:'black'}]}
                            jc={'flex-start'}
                            left={.05}
                            width={.9}
                            height={1}
                            top={.1}
                            trueSize={false}
                        >

                            <VStack
                                style={[{borderWidth:0,borderColor:'black'}]}
                                top={0}
                                height={1}
                                width={1}
                                jc={'flex-start'}
                                trueSize={false}>
                                <Image resizeMode={'contain'} style={{width:'55%',height:'32.5%',borderWidth:0,borderColor:'black'}} source={branding.splashScreen}/>
                                <Input
                                    icon={'mail'}
                                    size={15}
                                    color={'gray'}
                                    placeholder={'Email Address'}
                                    value={this.state.email}
                                    changeDetection={(val)=>{this.setState({email:val})}}
                                />
                                <Spacer height={.0325}/>
                                <Input
                                    icon={'key'}
                                    size={15}
                                    color={'gray'}
                                    placeholder={'Password'}
                                    value={this.state.password}
                                    changeDetection={(val)=>{this.setState({password:val})}}
                                    isPassword
                                />
                                <Spacer height={.0325}/>
                                <Input
                                    icon={'lock-closed'}
                                    size={15}
                                    color={'gray'}
                                    placeholder={'Confirm Password'}
                                    value={this.state.confirm}
                                    changeDetection={(val)=>{this.setState({confirm:val})}}
                                    isPassword
                                />





                                <VStack
                                    height={.0725}
                                    width={.8}
                                    trueSize
                                    top={.025}
                                >
                                    <Spacer trueSize height={.025}/>

                                    <RoundedButton disabled={this.state.email === '' || this.state.password === '' || (this.state.password !== this.state.confirm)} pressed={()=>{this.signUpUser()}} style={[{width:'100%',height:'90%'}]} bgColor={'#101010'} text={'Sign Up'}/>
                                </VStack>
                                {/*<Spacer height={.0375}/>*/}
                                {/*<Text style={[{fontSize:12,color:'darkslategray',fontWeight:'bold'}]}>OR SIGN UP WITH</Text>*/}

                                {/*<Spacer height={.0275}/>*/}
                                {/*<Hstack*/}
                                {/*    jc={'space-around'}*/}
                                {/*    width={.8}*/}
                                {/*    height={.0725}*/}
                                {/*    trueSize*/}
                                {/*    style={[]}*/}
                                {/*>*/}


                                {/*    <OutlineIconButton*/}
                                {/*        style={[{height:'80%',width:'45%'}]}*/}
                                {/*        text={'Facebook'}*/}
                                {/*        size={15}*/}
                                {/*        icon={'logo-facebook'}*/}
                                {/*        color={'teal'}*/}
                                {/*        borderColor={'gray'}*/}
                                {/*    />*/}

                                {/*    <OutlineIconButton*/}
                                {/*        style={[{height:'80%',width:'45%'}]}*/}
                                {/*        text={'Google'}*/}
                                {/*        size={15}*/}
                                {/*        icon={'logo-google'}*/}
                                {/*        color={'firebrick'}*/}
                                {/*        borderColor={'gray'}*/}
                                {/*    />*/}

                                {/*</Hstack>*/}

                                <Spacer height={.05}/>
                                <TextLink pressed={()=>{this.props.navigation.goBack()}} text={`Have an account already? Sign In.`} textStyles={[{fontSize:12,color:'darkslategray',fontWeight:'bold'}]}/>
                                <Spacer height={.15}/>

                                <TextLink pressed={()=>{this.props.navigation.navigate('TermsScreen')}} text={`View our Terms of Service`} textStyles={[{fontSize:12,color:'lightslategray',fontWeight:'bold'}]}/>
                            </VStack>

                        </VStack>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }


}
