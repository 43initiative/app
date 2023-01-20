import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Keyboard, TextInput
} from 'react-native';
import Spacer from "../../design/spacer";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";
import Square from "../../designComps/square";
import {acquireAnImage} from "../../permissionCalls/imgUpload";
import {addAppreciation} from "../../firebase/addAppreciation";


export default class CreateAppreciation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post:''
        }

    }

    componentDidMount() {
        console.log('hi')
    }

    checkForDisabledButton = () => {
        return this.state.post === ''
    }

    postAppreciation = async () => {
        console.log('ran')
        let result = await addAppreciation(this.state.post,true,'');
        console.log(result);
        this.props.navigation.goBack()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <Animated.View style={[{height:'100%',width:'100%',backgroundColor:'#e3e3e3'}]}>
                    <Spacer spacing={.025}/>
                    <Hstack al={'center'} jc={'space-around'} width={1} height={.075} style={[{backgroundColor:'#e3e3e3',paddingTop:'5%'}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{width:'15%'}}>
                            <Ionicons name={'ios-close'} size={25} color={'#101010'}/>
                        </TouchableOpacity>

                        <Text style={[{width:'60%',textAlign:'center',fontWeight:'500',fontSize:16}]}>Log An Appreciation</Text>

                        <View style={{width:'15%'}}></View>
                    </Hstack>
                    <View style={{width:'100%',padding:'5%',backgroundColor:'white',height:'92.5%'}}>
                        <TextInput onChangeText={(val)=>{this.setState({post:val})}} value={this.state.post} placeholder={'Talk about the good deed you experienced, and how it inspired you.'} multiline={true} style={[{width:'95%',height:'60%',borderWidth:0,borderColor:'green'}]}/>
                        <Spacer spacing={.025} />

                        <Text style={[{fontWeight:'bold',fontSize:15,width:'95%'}]}>Add an image (optional).</Text>
                        <Spacer spacing={.025} />
                        <View style={[{width:'95%'}]}>
                            <TouchableOpacity onPress={()=>{acquireAnImage(true)}}>
                                <Square size={.075} backgroundColor={'#e3e3e3'} style={[{borderColor:'transparent'}]}>
                                    <Ionicons name={'ios-image'} size={30} color={'black'}/>
                                </Square>
                            </TouchableOpacity>
                        </View>
                        <Spacer spacing={.05} />

                        <RoundedButton disabled={this.checkForDisabledButton()} pressed={()=>{this.postAppreciation()}} style={[{backgroundColor:'red',height:'7.5%'}]} text={'Log Appreciation'} bgColor={'firebrick'}/>
                    </View>

                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
