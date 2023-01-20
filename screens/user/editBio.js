import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TextInput, Keyboard
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import TextLink from "../../components/text/textLink";
import {activateLoading, deactivateLoading, storeControllers} from "../../reducers/controllers";
import {updateUserBio, updateProfilePic} from "../../firebase/fireStarter";
import {UPDATE_BIO, UPDATE_IMG} from "../../reducers/actionTypes";


export default class EditBio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bio:''
        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        this.setState({bio:data.bio})

    }

    saveAndContinue = async () => {
        activateLoading()
        //update the database
        await updateUserBio(this.state.bio)
        //update the user data store
        let store = storeControllers.store
        store.dispatch({type:UPDATE_BIO,payload:this.state.bio})
        //trigger the param function
        deactivateLoading()
        this.props.route.params.updateData();
        this.props.navigation.goBack()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                    <VStack jc={'space-around'} width={1} trueSize={false} height={.9}>
                        <VStack al={'flex-start'} jc={'space-around'} height={.15} width={.9} trueSize={false} style={{}}>
                            <Text style={[{fontSize:25,fontWeight:'bold',color:'#101010',width:'100%'}]}>Edit your about me section</Text>
                            <Text style={[{fontSize:13.75,color:'gray',width:'85%'}]}>
                                This information will show up on your public profile, feel free to keep it, change it , or leave it blank.
                            </Text>
                        </VStack>
                        <VStack al={'flex-start'} jc={'flex-start'} width={.9} left={0} height={.6} top={0} style={{backgroundColor:'transparent'}}>
                            <TextInput

                                multiline
                                style={[
                                    {paddingTop:'5%',padding:'5%',width:'100%',alignItems:'flex-start', height:'90%',borderWidth:.5,borderColor:'#e3e3e3',borderRadius:20}
                                ]}
                                value={this.state.bio}
                                onChangeText={(val)=>{this.setState({bio:val})}}
                                placeholder={' I enjoy paying it forward not only for the selfish reasons, but other stuff too.'}
                            />
                        </VStack>
                        <RoundedButton pressed={()=>{this.saveAndContinue()}} style={[{width:'80%',height:'7.5%'}]} bgColor={'#c6302c'} text={'Continue'}/>
                        <TextLink pressed={()=>{this.props.navigation.goBack()}} textStyles={[{color:'red'}]} text={'Go Back'}/>

                    </VStack>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
