import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import {submitSignUpData,storeUserData} from "../../firebase/fireStarter";

export default class Finish extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }


    submitData = async () => {
        try {
            let x = await submitSignUpData();
            console.log(x)
            if(!x.passed) {
                return alert('failed in submit')
            }
            let storeData = await storeUserData()
            if(storeData.passed) {
                this.props.navigation.navigate('TabStack')

            } else {
               return alert('login failed due to data not being present')
            }
            this.props.navigation.navigate('TabStack')
        } catch (e) {

        }

    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                <VStack top={.1} width={1} height={.6} style={[{backgroundColor:'white'}]}>
                    <Image resizeMode={'contain'} style={[{width:'100%'}]} source={require('../../assets/img/finish.png')}/>
                </VStack>
                <VStack jc={'space-around'} style={{}} width={1} trueSize={false} height={.3}>
                    <VStack jc={'space-around'} width={.9} trueSize={false} height={.35}>
                        <Text style={[{fontSize:20,fontWeight:'bold',color:'#101010'}]}>You're ready to go!</Text>
                        <Text style={[{fontSize:13.75,color:'gray',textAlign:'center'}]}>Thank you for telling us more about yourself, we hope you enjoy the app!</Text>
                    </VStack>
                    <RoundedButton pressed={()=>{this.submitData()}} style={[{width:'80%',height:'20%'}]} bgColor={'#3EB489'} text={`Let's Go!`}/>
                </VStack>
            </Animated.View>
        )
    }


}
