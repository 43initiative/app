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
import {storeUserData, loginUser} from "../../firebase/fireStarter";
import {activateLoading, deactivateLoading, showToastMessage} from "../../reducers/controllers";
import {checkForOnboarding} from "../../firebase/fireStarter";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:'',
            checked:false
        }

    }

    loginUser = async () => {
        activateLoading();
        let loginAttempt =  await loginUser(this.state.email,this.state.password);
        console.log(loginAttempt)
        if(loginAttempt.passed) {
            let userDataCheck = await checkForOnboarding()
            if(!userDataCheck) {
                //navigate to onboarding
                this.props.navigation.navigate('OnboardingStack')
            } else {
                //navigate to tabs
                console.log('about to start fetching user data ')
                let storeUser = await storeUserData();
                if(storeUser.passed) {
                    this.props.navigation.navigate('TabStack')
                } else {
                    deactivateLoading()
                    showToastMessage('Login Failed',loginAttempt.errorMsg,'ios-sad-outline')

                    alert('login failed due to data not being present')
                }
            }
        } else {
            showToastMessage('Login Failed',loginAttempt.errorMsg,'ios-sad-outline')
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
                            trueSize={false}
                        >

                            <VStack
                                style={[{borderWidth:0,borderColor:'black'}]}
                                top={.1}
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
                                <Spacer height={.05}/>
                                <Input
                                    icon={'key'}
                                    size={15}
                                    color={'gray'}
                                    placeholder={'Password'}
                                    value={this.state.password}
                                    changeDetection={(val)=>{this.setState({password:val})}}
                                    isPassword
                                />




                                <Hstack
                                    height={.075}
                                    width={.8}
                                    trueSize
                                    jc={'space-between'}
                                >

                                    <CheckText tapped={()=>{

                                        this.setState((val)=>{
                                            return {checked:!val.checked}
                                        })

                                    }}
                                               borderColor={'gray'}
                                               activeColor={'firebrick'}
                                               inactiveColor={'transparent'}
                                               checkColor={'white'}
                                               text={'Remember Me'} checked={this.state.checked}/>
                                    <TextLink  textStyles={[{fontSize:12,color:'darkslategray'}]} text={'Forgot Password'} pressed={()=>{this.props.navigation.navigate('ForgotScreen')}}/>

                                </Hstack>
                                <VStack
                                    height={.0625}
                                    width={.8}
                                    trueSize
                                    top={.025}
                                >
                                    <RoundedButton disabled={this.state.email === '' || this.state.password === ''} pressed={()=>{this.loginUser()}} style={[{width:'100%',height:'90%'}]} bgColor={'#101010'} text={'Log in'}/>
                                </VStack>
                                <Spacer height={.0375}/>
                                {/*<Text style={[{fontSize:12,color:'darkslategray',fontWeight:'bold'}]}>OR SIGN IN WITH</Text>*/}
                                {/*<Spacer height={.0375}/>*/}
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

                                {/*<Spacer height={.1}/>*/}
                                <TextLink pressed={()=>{this.props.navigation.navigate('SignUp')}} text={`Don't have an account? Sign Up.`} textStyles={[{fontSize:12,color:'darkslategray',fontWeight:'bold'}]}/>
                            </VStack>

                        </VStack>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }


}
