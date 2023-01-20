import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, TextInput, Keyboard, Switch
} from 'react-native';
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
import VStack from "../../designComps/vstack";
import Circle from "../../designComps/circle";
import {createCircle} from "../../styles/globals/shapes";
import Square from "../../designComps/square";
import {getSingleAppreciation} from "../../firebase/fireInit";


export default class CreatePif extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deed:'',
            isPublic:true,
            inspirationChosen:false,
            inspireClass:0,
            appInspoPlaceholder: null
        }

    }

    attachAppreciation = async (inspirationId) => {
        console.log(inspirationId)
        let data = await getSingleAppreciation(inspirationId);
        console.log(data)
       this.setState({
            appInspoPlaceholder : {
                userImg:data.userImg,
                userName: data.userName,
                timestamp:data.timestamp,
                post:data.post
            }
        },()=>{
           return this.setState({inspirationChosen:true,inspireClass:1})
       })
    }

    attachInspiration = async (inspirationId)  => {
        console.log(inspirationId)
        let data = await getSingleAppreciation(inspirationId);
        console.log(data)
        this.setState({
            appInspoPlaceholder : {
                userImg:data.userImg,
                userName: data.userName,
                timestamp:data.timestamp,
                post:data.post
            }
        },()=>{
            return this.setState({inspirationChosen:true,inspireClass:2})
        })
    }

    decideInspiration = (ic) => {
        if(ic ===1) {
            this.props.navigation.navigate('OTSAppreciation',{
                    attachAppreciation:this.attachAppreciation,
                    test:'data'

            });
        } else if(ic===0) {
            return this.setState({inspirationChosen:true,inspireClass:0})

        } else {
            this.props.navigation.navigate('SelectInspiration',{
                attachInspiration:this.attachInspiration,
                test:'data'
            });
        }




    }


    returnInspirationSection = () => {
        if(this.state.inspirationChosen) {

            if(this.state.inspireClass === 0) {
                return(<VStack al={'flex-start'} jc={'space-around'} top={.025} width={.95} height={.2} style={[{backgroundColor:'white'}]}>
                        <Text style={[{fontWeight:'bold',fontSize:15}]}>You have chosen not to include an inspiration for this PIF.</Text>
                        <TouchableOpacity onPress={()=>{this.setState({inspirationChosen:false})}} style={[{width:'100%',height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                            <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                                <Ionicons name={'ios-return-up-back'} color={'red'} size={30}/>
                                <VStack al={'flex-start'} height={.9} width={.8}>
                                    <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Changed your mind?</Text>
                                    <Text style={[{fontSize:12,color:'#101010'}]}>Go back and add an inspiration</Text>
                                </VStack>
                                <Ionicons name={'ios-return-up-back'} color={'white'} size={30}/>
                            </Hstack>
                        </TouchableOpacity>
                    </VStack>
                )
            }  else {
                return(<VStack al={'flex-start'} jc={'flex-start'} top={.025} width={.95} height={.3} style={[{backgroundColor:'white'}]}>
                        <Text style={[{fontWeight:'bold',fontSize:15}]}>You have included the following inspiration for this PIF:</Text>
                        <Spacer spacing={.015}/>
                        <View style={[{borderBottomWidth:1,borderColor:'#e3e3e3',width:'100%',padding:'2.5%',borderRadius:20}]}>
                            <Hstack jc={'flex-start'} top={.025} width={.9} height={.175}>
                                <Circle borderWidth={0} borderColor={'transparent'} style={[{borderColor:'transparent'}]} size={.05}>
                                    <Image  style={[{width:'100%',height:'100%',borderRadius:100}]} source={{uri:this.state.appInspoPlaceholder.userImg}} resizeMode={'cover'} />

                                </Circle>
                                <Spacer spacing={.025} xAxis/>
                                <VStack al={'flex-start'} trueSize={false}  width={.8} height={1} style={[{borderWidth:0,borderColor:'blue'}]}>
                                    <Text style={[{fontWeight:'bold'}]}>{this.state.appInspoPlaceholder.userName}</Text>
                                    <Text style={[{fontWeight:'300',fontSize:10}]}>{this.state.appInspoPlaceholder.timestamp}</Text>

                                </VStack>

                            </Hstack>
                            <Spacer spacing={.015}/>

                            <Text numberOfLines={3} style={[{fontSize:12,marginTop:'2.5%'}]}>{this.state.appInspoPlaceholder.post}</Text>

                        </View>


                        <TouchableOpacity onPress={()=>{this.setState({inspirationChosen:false})}} style={[{width:'100%',height:'20%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                            <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                                <Ionicons name={'ios-return-up-back'} color={'red'} size={30}/>
                                <VStack al={'flex-start'} height={.9} width={.8}>

                                    <Text style={[{fontSize:12,color:'#101010'}]}>Choose a different inspiration</Text>
                                </VStack>
                                <Ionicons name={'ios-return-up-back'} color={'white'} size={30}/>
                            </Hstack>
                        </TouchableOpacity>
                    </VStack>
                )
            }

        }
        return(                    <VStack al={'flex-start'} jc={'space-around'} top={.025} width={.95} height={.3} style={[{backgroundColor:'white'}]}>
                <Text style={[{fontWeight:'bold',fontSize:15}]}>Want to add an inspiration for this good deed.</Text>
                <Spacer spacing={.0125}/>
                <TouchableOpacity onPress={()=>{this.decideInspiration(2)}} style={[{width:'100%',height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                    <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                        <Ionicons name={'ios-heart-half-outline'} color={'red'} size={30}/>
                        <VStack al={'flex-start'} height={.9} width={.8}>
                            <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Select From My Inspo</Text>
                            <Text style={[{fontSize:12,color:'#101010'}]}>Choose a pif you saved to your inspo section, or choose an appreciation you've logged.</Text>
                        </VStack>
                        <Ionicons name={'ios-chevron-forward'} color={'gray'} size={30}/>
                    </Hstack>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.decideInspiration(1)}} style={[{width:'100%',height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                    <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                        <Ionicons name={'ios-add-outline'} color={'red'} size={30}/>
                        <VStack al={'flex-start'} height={.9} width={.8}>
                            <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>Write your own inspiration</Text>
                            <Text style={[{fontSize:12,color:'#101010'}]}>You can create your reason for this good deed now.</Text>
                        </VStack>
                        <Ionicons name={'ios-chevron-forward'} color={'gray'} size={30}/>
                    </Hstack>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.decideInspiration(0)}} style={[{width:'100%',height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                    <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={1}>
                        <Ionicons name={'ios-close'} color={'red'} size={30}/>
                        <VStack al={'flex-start'} height={.9} width={.8}>
                            <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>No thank you.</Text>
                            <Text style={[{fontSize:12,color:'#101010'}]}>You don't need to add an inspiration.</Text>
                        </VStack>
                        <Ionicons name={'ios-close-circle'} color={'white'} size={30}/>
                    </Hstack>
                </TouchableOpacity>
            </VStack>
        )
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

                <Text style={[{width:'60%',textAlign:'center',fontWeight:'500',fontSize:16}]}>Create A Pif</Text>

               <RoundedButton textStyles={{color:'white',textTransform:'capitalize'}} bgColor={'#c6302c'} text={'Post'} style={[{backgroundColor:'#c6302c',height:'70%',width:'15%',borderRadius:7}]}/>
            </Hstack>

                <VStack jc={'flex-start'} height={.9} trueSize={false} width={1} style={[{backgroundColor:'white'}]}>
                    <Hstack jc={'flex-start'} top={.025} width={.9} height={.075}>
                        <Circle borderWidth={0} borderColor={'transparent'} style={[{borderColor:'transparent'}]} size={.05}>
                            <Image  style={[{width:'100%',height:'100%',borderRadius:100}]} source={{uri:'https://www.intouchweekly.com/wp-content/uploads/2019/08/kylie-jenner-sexiest-moments-02.jpg?fit=772%2C762&quality=86&strip=all'}} resizeMode={'cover'} />

                        </Circle>
<Spacer spacing={.025} xAxis/>
                        <VStack al={'flex-start'} trueSize={false}  width={.8} height={1} style={[{borderWidth:0,borderColor:'blue'}]}>
                            <Text style={[{fontWeight:'bold'}]}>Joseph Mangi</Text>
                            <Text style={[{fontSize:12,color:'gray'}]}>0 Pifs so far</Text>

                        </VStack>

                    </Hstack>

                    <TextInput onChangeText={(val)=>{this.setState({deed:val})}} value={this.state.deed} placeholder={'Tell the people about your good deed!'} multiline={true} style={[{width:'95%',height:'27.5%',borderWidth:0,borderColor:'green'}]}/>
                    {this.returnInspirationSection()}
                    <Spacer spacing={.025} />

                    <Text style={[{fontWeight:'bold',fontSize:15,width:'95%'}]}>Add an image (optional).</Text>
                    <Spacer spacing={.025} />

                    <View style={[{width:'95%'}]}>
                        <TouchableOpacity>
                            <Square size={.075} backgroundColor={'#e3e3e3'} style={[{borderColor:'transparent'}]}>
                                <Ionicons name={'ios-image'} size={30} color={'black'}/>
                            </Square>
                        </TouchableOpacity>
                    </View>
                    <Spacer spacing={.025} />
                    <View style={[{width:'95%'}]}>

                        {this.state.isPublic ?
                            <Text style={[{fontWeight:'bold',fontSize:15,width:'95%'}]}>This PIF is public</Text>:
                            <Text style={[{fontWeight:'bold',fontSize:15,width:'95%'}]}>This PIF is private</Text>

                        }
                        <Spacer spacing={.0125} />


                        <Switch
                            trackColor={{ false: "#gray", true: "#green" }}
                            thumbColor={this.state.isPublic ? "#white" : "#white"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(val)=>{console.log(val);this.setState({isPublic:val})}}
                            value={this.state.isPublic}
                        />
                    </View>

                </VStack>
            </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
