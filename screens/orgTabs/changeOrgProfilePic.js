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
import {updateProfilePic,updateOrgProfilePic, transformBlob} from "../../firebase/fireStarter";
import {activateLoading, deactivateLoading, storeControllers} from "../../reducers/controllers";
import {UPDATE_ORG_IMG} from "../../reducers/actionTypes";


export default class ChangeOrgProfilePic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            imgProvided:false,
            img:'',
            initials:''
        }

    }

    componentDidMount() {
       let data = this.props.route.params;
       console.log(data)
        this.setState({
            imgProvided:data.imgProvided,
            img:data.img,
            initials:data.initials,
            tempImg:null
        })

    }

    returnProfilePic = () => {
        return(
            <Circle backgroundColor={'#c6302c'} size={.2} borderRadius={100} borderColor={'lightgray'} borderWidth={8}>
                <Image resizeMode={'cover'} style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]} source={{uri:this.state.tempImg ? this.state.tempImg : this.state.img}}/>
            </Circle>
        )
    }

    returnInitials = () => {
        return(
            <Circle backgroundColor={'#c6302c'} size={.2} borderRadius={100} borderColor={'lightgray'} borderWidth={8}>
                <Text style={[{color:'white',fontSize:50,opacity:.7}]}>{this.state.initials}</Text>
            </Circle>
        )
    }

    returnAnImage = async () => {
        let x = await acquireAnImage(true);
        return this.uploadImg(x.link)
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
            this.setState({tempImg:x.link},()=>{
                this.setState({imgProvided:true})

                console.log('uploaded new profile pic')
            })
        }
    }

    saveAndContinue = async () => {
        activateLoading()
        await this.uploadImg(this.state.tempImg)
        //update the database
        await updateOrgProfilePic(true,this.state.tempImg)
        //update the user data store
        let store = storeControllers.store
        store.dispatch({type:UPDATE_ORG_IMG,payload:{imgProvided: this.state.imgProvided,img:this.state.tempImg}})
        //trigger the param function
        deactivateLoading()
        this.props.route.params.updateData();
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                <VStack jc={'space-around'} width={1} trueSize={false} height={.9}>
                    <VStack al={'flex-start'} jc={'space-around'} height={.15} width={.9} trueSize={false} style={{}}>
                        <Text style={[{fontSize:25,fontWeight:'bold',color:'#101010',width:'100%'}]}>Edit Profile Pic</Text>
                        <Text style={[{fontSize:13.75,color:'gray',width:'85%'}]}>
                            You can change this image as often as you'd like.
                        </Text>
                    </VStack>
                    <VStack jc={'flex-start'} width={1} height={.4} top={.2} style={{backgroundColor:'transparent'}}>
                        {this.state.imgProvided ?
                            this.returnProfilePic() :
                            this.returnInitials()
                        }
                        <Spacer spacing={.025}/>
                        <TextLink underline pressed={()=>{this.returnAnImage()}} textStyles={[{color:'gray'}]} text={this.state.imgProvided ? 'Change Profile Picture' : 'Add Profile Picture'}/>
                        {this.state.imgProvided ?
                            <View style={[{width:'100%',marginTop:'2.5%'},flexing.centerColumn]}>
                                <Text style={[{color:'gray'}]}>Or</Text>
                                <Spacer spacing={.0125}/>
                                <TextLink underline pressed={()=>{this.setState({imgProvided:false})}} textStyles={[{color:'gray'}]} text={'Use your initials'}/>
                            </View>
                            :
                            <></>

                        }

                    </VStack>


                    <RoundedButton pressed={()=>{this.saveAndContinue()}} style={[{width:'80%',height:'7.5%'}]} bgColor={'#c6302c'} text={'Save'}/>
                    <TextLink pressed={()=>{this.props.navigation.goBack()}} textStyles={[{color:'red'}]} text={'Go Back'}/>
                </VStack>

            </Animated.View>
        )
    }


}
