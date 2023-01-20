import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
            <VStack top={.1} width={1} height={.6} style={[{backgroundColor:'white'}]}>
            <Image resizeMode={'contain'} style={[{width:'100%'}]} source={require('../../assets/img/welcomimg.png')}/>
            </VStack>
                <VStack jc={'space-around'} style={{}} width={1} trueSize={false} height={.3}>
                    <VStack jc={'space-around'} width={.9} trueSize={false} height={.35}>
                        <Text style={[{fontSize:20,fontWeight:'bold',color:'#101010'}]}>Welcome To the 43Initiative</Text>
                        <Text style={[{fontSize:13.75,color:'gray',textAlign:'center'}]}>Spreading positivity one good deed at a time and reminding you to have half a heart and pay it forward.</Text>
                    </VStack>
                  <RoundedButton pressed={()=>{this.props.navigation.navigate('PersonalScreen')}} style={[{width:'80%',height:'20%'}]} bgColor={'#c6302c'} text={'Get Started'}/>
                </VStack>
            </Animated.View>
        )
    }


}
