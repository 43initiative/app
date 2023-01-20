import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import TextLink from "../../components/text/textLink";
import Circle from "../../designComps/circle";
import Spacer from "../../design/spacer";
import {acquireAnImage} from "../../permissionCalls/imgUpload";
import {flexing} from "../../styles/dimensions/dims";
import {transformBlob} from "../../firebase/fireStarter";
import {storeControllers} from "../../reducers/controllers";


export default class AddImg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicAdded:false,
            profilePicLink:''
        }

    }

    returnProfilePic = () => {
        return(
            <Circle backgroundColor={'#c6302c'} size={.2} borderRadius={100} borderColor={'lightgray'} borderWidth={8}>
                <Image resizeMode={'cover'} style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]} source={{uri:this.state.profilePicLink}}/>
            </Circle>
        )
    }

    returnInitials = () => {
        return(
            <Circle backgroundColor={'#c6302c'} size={.2} borderRadius={100} borderColor={'lightgray'} borderWidth={8}>
                <Text style={[{color:'white',fontSize:50,opacity:.7}]}>J.M</Text>
            </Circle>
        )
    }

    returnAnImage = async () => {
        let x = await acquireAnImage(true);
        console.log(x)
        await this.uploadImg(x.link)
        // if(x.passed) {
        //     this.setState({profilePicLink:x.link},()=>{
        //         this.setState({profilePicAdded:true})
        //     })
        // }

    }

    uploadImg = async (img) => {
        let x = await transformBlob(img)
        if(x.link) {
            console.log(x.link)
            this.setState({profilePicLink:x.link},()=>{
                      this.setState({profilePicAdded:true})

                console.log(this.state.profilePicLink,'this ran')
            })
        }
    }

    saveAndContinue = async () => {
        let store = storeControllers.store;
        store.dispatch({type:'SET_USER_IMAGING',payload: {img:this.state.profilePicAdded ? this.state.profilePicLink : null,imgProvided:this.state.profilePicAdded}});
        this.props.navigation.navigate('LocationScreen')
    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                <VStack jc={'space-around'} width={1} trueSize={false} height={.9}>
                    <VStack al={'flex-start'} jc={'space-around'} height={.15} width={.9} trueSize={false} style={{}}>
                        <Text style={[{fontSize:25,fontWeight:'bold',color:'#101010',width:'100%'}]}>Add A Profile Pic</Text>
                        <Text style={[{fontSize:13.75,color:'gray',width:'85%'}]}>
                           We will use your initials as shown below if you don't want to add a profile picture, you can always change this later.
                        </Text>
                    </VStack>
                    <VStack jc={'flex-start'} width={1} height={.4} top={.2} style={{backgroundColor:'transparent'}}>
                        {this.state.profilePicAdded ?
                        this.returnProfilePic() :
                            this.returnInitials()
                        }
<Spacer spacing={.025}/>
                        <TextLink underline pressed={()=>{this.returnAnImage()}} textStyles={[{color:'gray'}]} text={this.state.profilePicAdded ? 'Change Profile Picture' : 'Add Profile Picture'}/>
                        {this.state.profilePicAdded ?
                            <View style={[{width:'100%',marginTop:'2.5%'},flexing.centerColumn]}>
                                <Text style={[{color:'gray'}]}>Or</Text>
                                <Spacer spacing={.0125}/>
                                <TextLink underline pressed={()=>{this.setState({profilePicAdded:false})}} textStyles={[{color:'gray'}]} text={'Use your initials'}/>
                            </View>
                            :
                            <></>

                        }

                    </VStack>


                    <RoundedButton pressed={()=>{this.saveAndContinue()}} style={[{width:'80%',height:'7.5%'}]} bgColor={'#c6302c'} text={'Continue'}/>
                    <TextLink pressed={()=>{this.props.navigation.goBack()}} textStyles={[{color:'red'}]} text={'Go Back'}/>
                </VStack>

            </Animated.View>
        )
    }


}
