import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Keyboard
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";
import {activateLoading, deactivateLoading, showToastMessage} from "../../reducers/controllers";
import {waitACertainTime} from "../../helperFuncs/timers/wait";
import {changeUserEmail} from "../../firebase/fireStarter";
import FormInput from "../../components/inputs/formInput";
import Spacer from "../../design/spacer";
import Input from "../../components/inputs/input";


export default class ChangeEmail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:''
        }

    }

    submitNewEmail = async () => {
        activateLoading();
        //do password check
        let response = await changeUserEmail(this.state.email);
        console.log(response)
        //if password reset went well
        deactivateLoading();
        showToastMessage('Submitted','Your email address has been changed','ios-mail');
        await waitACertainTime(2000);
        this.props.navigation.goBack()

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                    <View style={[{position:'absolute',width:'90%',marginTop:'2.5%',marginLeft:'5%'}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                            <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[{marginTop:'15%',width:'90%',marginLeft:'5%'}]}>
                        <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                            Want to change your email?
                        </Text>

                        <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                            No problem! Submit your new email address below!
                        </Text>

                        <Spacer spacing={.05}/>
                        <Input
                            label={'Your email address'}
                            width={.9}
                            height={.05}
                            value={this.state.email}
                            changeDetection={(val)=>{this.setState({email:val})}}
                            placeholder={'yournewemail@email.com'}
                            hasIcon
                            icon={'ios-mail'}
                            size={20}
                            color={'#c6302c'}
                        />


                    </View>



                    <View style={[{position:'absolute',top:'75%',width:'90%',marginLeft:'5%',height:'15%'}]}>
                        <RoundedButton disabled={this.state.email === '' || !this.state.email.includes('@')} pressed={()=>{this.submitNewEmail()}} style={[{width:'90%',marginLeft:'5%',height:'50%'}]} bgColor={'#c6302c'} text={'Submit Email'}/>

                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
