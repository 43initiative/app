import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    Image,
    Keyboard,
    TextInput,
    Switch,
    Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {doImgUpload,
    testVideoUpload,
    testSecondOption,
    getInspiration,
    transformBlobForPost,
    addPif, getRecNominations, getPifPost,doVideoUpload
} from "../../firebase/fireStarter";
import {getSingleAppreciation} from "../../firebase/fireInit";
import VStack from "../../designComps/vstack";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import Circle from "../../designComps/circle";
import RoundedButton from "../../components/buttons/roundedButton";
import Square from "../../designComps/square";
import {activateLoading, deactivateLoading, showToastMessage, storeControllers} from "../../reducers/controllers";
import {waitACertainTime} from "../../helperFuncs/timers/wait";
import Video from "react-native-video";


export default class CreateNewPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stage:0,
            post:'',
            stageOptions:[
                {title: 'Create Post',icon:'ios-pencil'},
                {title: 'Add Inspiration',icon:'ios-happy'},
                {title: 'Add Media',icon:'ios-image'},
                {title: 'Add Nominations',icon:'ios-hand-right'},
                {title: 'Review & Post',icon:'ios-checkmark'},
            ],
            isNomination:false,
            inspirationId:null,
            inspirationBypassed:false,
            inspirationList:[],
            imageSelected:false,
            chosenImageLink:null,
            nominationList:[],
            nomMsg:'',
            pifData:null,
            nominationData:null,
            viewOriginalPost:false,
            isInspired:false,
            trendId:null,
            didEventLink:false,
            didFundraiserLink:false,
            fundLink:null,
            eventLink:null

        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        // if(data.isNomination) {
        //     this.setState({isNomination:true,pifData:data.pifData,nominationData:data.nomData,isInspired:true,inspirationId:data.pifData.id,trendId:data.pifData.trendId})
        // }

        this.fetchInspiration();
    }

    removeNomination = () => {
        this.setState({isNomination:false,pifData:null,nominationData:null,isInspired:false,inspirationId:null,trendId:null})
    }

    fetchInspiration = async () => {
        let response = await getInspiration();
        if(response.passed) {
            this.setState({inspirationList:response.data})
        }
    }

    fetchNominationPost = (postId) => {
        //need nomination message
        //need post info
        //display as commentPif
        //display nomination message above pif alongside userImg (should disable profile view?)

    }



    advanceStage = () => {
        let currentStage = this.state.stage;
        currentStage+=1
        this.setState({stage:currentStage})
    }

    submitPost = async () => {
        try {
            activateLoading()
            let imgLink = null;
            if(this.state.chosenImageLink) {
                console.log('1',this.state.chosenImageLink)
                let fireLink =  await transformBlobForPost(this.state.chosenImageLink);
                console.log('2',fireLink)
                if(fireLink.passed) {
                    console.log('3',fireLink.link)
                    imgLink = fireLink.link;
                }
            }
            console.log('4',imgLink)
            let data = storeControllers.storeData().userData.publicData

            let post = {
                post:this.state.post,
                isInspired:this.state.isInspired,
                inspirationId:this.state.inspirationId,
                nominationList:this.state.nominationList.map((val)=>{
                    return val.id
                }),
                imgProvided:imgLink !== null,
                videoProvided:null,
                video:null,
                isOrganization:data.isOrganization,
                img:imgLink,
                savedList:[],
                likedList:[],
                commentList:[],
                nominationMsg:this.state.nomMsg,
                trendId:this.state.trendId,
                isNomination:this.state.isNomination
            }

            let response = await addPif(post)
            //console.log(response)
            if(response.passed) {
                deactivateLoading()
                showToastMessage('Post submitted','Your deed has posted','ios-thumbs-up');
                waitACertainTime(2000);
            } else {
                deactivateLoading()
                showToastMessage('Something went wrong','Your deed didnt post','ios-thumbs-down');
                waitACertainTime(2000);
                console.log(response)
            }

            this.props.navigation.goBack()
        } catch (e) {
            // console.log('error here')
            deactivateLoading()
            showToastMessage('Something went wrong','Please change the image','ios-thumbs-down');

        }

    }


    setInspiration = async (isNomination,pifData,nomMsg,nomData) => {
        this.setState({isNomination:isNomination,pifData:pifData,nominationData:nomData,isInspired:true,inspirationId:pifData.id,trendId:pifData.trendId ? pifData.trendId : null},()=>{
           console.log('here')
            this.props.navigation.goBack()
        })
    }

    clearInspiration = async () => {
        this.setState({isNomination:false,pifData:null,nominationData:null,isInspired:true,inspirationId:null.id,trendId: null},()=>{
            console.log('here')
            this.props.navigation.goBack()
        })
    }

    addInspiration = async () => {

        let recCall = await getRecNominations();
        let inspirations;
        let nominations;

        console.log(recCall)


        if(recCall.passed) {
            nominations = recCall.data
        }

        for (let i = 0; i < nominations.length; i++) {
            let pifId = nominations[i].postId;
            let pifData = await getPifPost(pifId)
            nominations[i].pifData = pifData.data
        }

        console.log(nominations,'noms')
        console.log(inspirations,'inspo')
        //
        this.props.navigation.push('InspoModaler',{
            inspirations: this.state.inspirationList,
            nominations,
            setInspiration:this.setInspiration
        })

    }

    addPhoto = async () => {
        let downloadLink = await doImgUpload();
        console.log(downloadLink)
        if(downloadLink.passed) {
            this.setState({imgProvided:true,img:downloadLink.link})
        } else {

        }
    }

    addVideo = async () => {
        let downloadLink = await doVideoUpload();
        console.log(downloadLink)
        if(downloadLink.passed) {
            this.setState({videoProvided:true,video:downloadLink.link})
        } else {

        }
    }

    shareNominations = (list,nomMsg) => {
        console.log(list)
        this.setState({nominationList:list,nomMsg},()=>{
            this.props.navigation.goBack()
        })
    }


    popNominationModal = async () => {
        console.log('tapped')
        this.props.navigation.navigate('NominationModal',{
            shareNominations:this.shareNominations,
            list:this.state.nominationList,
            nomMsg:this.state.nomMsg
        })
    }
    render() {
        let data = storeControllers.storeData().userData.publicData
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>

                <Animated.View style={[{height:'100%',width:'100%',backgroundColor:'white'}]}>
                    <Spacer spacing={.0125}/>
                    <Hstack al={'center'} jc={'space-around'} width={.95} left={.025} height={.075} style={[{backgroundColor:'white',paddingTop:'5%'}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{width:'15%'}}>
                            <Ionicons name={'ios-close'} size={25} color={'#101010'}/>
                        </TouchableOpacity>

                        <Text style={[{width:'60%',textAlign:'center',fontWeight:'500',fontSize:16}]}>Create A Post</Text>

                        <RoundedButton disabled={this.state.post === ''} textStyles={{color:'white',textTransform:'capitalize'}} bgColor={'#3EB489'} text={'Post'} style={[{backgroundColor:'#3EB489',height:'70%',width:'15%',borderRadius:7}]}/>
                    </Hstack>

                    <VStack jc={'flex-start'} height={.9} trueSize={false} width={1} style={[{backgroundColor:'white'}]}>
                        <Hstack jc={'flex-start'} style={{borderColor:'red',borderWidth:0}} top={.025} width={.9} height={.075}>
                            <Circle borderWidth={0} borderColor={'transparent'} style={[{borderColor:'firebrick'},flexing.centerColumn]} size={.05}>
                                {data.imgProvided ?
                                    <Image  style={[{width:'100%',height:'100%',borderRadius:100}]} source={{uri:data.img}} resizeMode={'cover'} />
:     <Text>{data.initals}</Text>
                                }


                            </Circle>
                            <Spacer spacing={.025} xAxis/>
                            <VStack al={'flex-start'} trueSize={false}  width={.8} height={1} style={[{borderWidth:0,borderColor:'blue'}]}>
                                <Text style={[{fontWeight:'bold'}]}>{data.displayName}</Text>

                            </VStack>

                        </Hstack>

                        <TextInput placeholderTextColor={'#101010'} onChangeText={(val)=>{this.setState({post:val})}} value={this.state.deed} placeholder={'Tell the people about your good deed!'} multiline={true} style={[{width:'95%',height:'22.5%',borderWidth:0,borderColor:'green'}]}/>

                        <View style={[{width:'90%',marginLeft:'5%',borderColor:'red',borderWidth:0,height:Dimensions.get('window').height * .08}]}>
                           {this.state.imgProvided ?
                               <View style={{width:'25%',height:'100%'}}>
                                   <Image source={{uri:this.state.img}} style={{width:'100%',height:'100%',borderRadius:20}} resizeMode={'contain'}/>
                                    <View style={[{position:'absolute',zIndex:1,top:0,left:0,height:'100%',width:'100%',opacity:.3,backgroundColor:'black'}]}>
                                    </View>
                                   <TouchableOpacity onPress={()=>{
                                       this.setState({imgProvided:false,img:null})}
                                   } style={[{position:'absolute',zIndex:2,top:0,left:0,height:'100%',width:'100%',opacity:1,backgroundColor:'transparent'}]}>
                                       <Ionicons name={'ios-close-circle'} color={'white'} size={25}/>
                                   </TouchableOpacity>
                               </View>
                               :<></>
                           }
                            {this.state.videoProvided ?
                                <View style={{width:'25%',height:'100%',backgroundColor:'transparent'}}>
                                <Video source={{uri: this.state.video}}
                                    ref={(ref) => {
                                    this.player = ref
                                }}
                                       paused={true}
                                       muted={true}
                                       fullscreenAutorotate={true}
                                    onBuffer={(ev)=>{console.log(ev)}}
                                    onError={(error)=>{alert('video error occurred')}}
                                    resizeMode={'cover'}
                                    style={{width:'100%',height:'100%',borderRadius:20}} />
                                    <View style={[{position:'absolute',zIndex:1,top:0,left:0,height:'100%',width:'100%',opacity:.3,backgroundColor:'black'}]}>
                                    </View>
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({videoProvided:false,video:null})}
                                    } style={[{position:'absolute',zIndex:2,top:0,left:0,height:'100%',width:'100%',opacity:1,backgroundColor:'transparent'}]}>
                                        <Ionicons name={'ios-close-circle'} color={'white'} size={25}/>
                                    </TouchableOpacity>
                                </View>

                                :<></>
                            }
                       </View>
                        <Spacer spacing={.025}/>



                        <View style={[flexing.startColumn,{width:'90%',marginLeft:'5%'}]}>
                            {!data.isOrganization ?
                                <>

                                    <TouchableOpacity
                                        onPress={()=>{
                                            if(this.state.fundLink === null) {
                                                this.setState({didEventLink:true})
                                            } else {
                                                alert('You can only link an event or a fundraiser, not both.')
                                            }
                                        }}
                                        style={[flexing.rowStart]}>
                                        <Ionicons name={'ios-calendar-outline'} color={'#3EB489'} size={30}/>
                                        <Spacer spacing={.025} xAxis/>
                                        {this.state.didEventLink
                                            ?
                                            <View style={[{width:'75%'},flexing.rowStart]}>
                                                <TextInput
                                                    value={this.state.eventLink}
                                                    style={{borderRadius:20,width:'80%',paddingLeft:'5%',height:Dimensions.get('window').height * .05,borderWidth:1,borderColor:'#d3d3d3'}}
                                                    onChangeText={(eventLink)=>{this.setState({eventLink})}}
                                                    placeholder={'Paste your event url here'}
                                                    placeholderTextColor={'#101010'}
                                                />
                                                <Spacer spacing={.05} xAxis/>
                                                <TouchableOpacity onPress={()=>{this.setState({didEventLink:false,eventLink:null})}}>
                                                    <Ionicons name={'ios-close-circle'} color={'black'} size={25}/>
                                                </TouchableOpacity>
                                            </View>

                                            :
                                            <Text style={[{color:'black',fontWeight:'bold'}]}>Link Event</Text>}
                                    </TouchableOpacity>

                                    <Spacer spacing={.025}/>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            if(this.state.eventLink === null) {
                                                this.setState({didFundraiserLink:true})
                                            } else {
                                                alert('You can only link an event or a fundraiser, not both.')
                                            }
                                        }}

                                        style={[flexing.rowStart]}>
                                        <Ionicons name={'ios-cash-outline'} color={'#47bbfe'} size={30}/>
                                        <Spacer spacing={.025} xAxis/>
                                        {this.state.didFundraiserLink
                                            ?
                                            <View style={[{width:'75%'},flexing.rowStart]}>
                                                <TextInput
                                                    value={this.state.fundLink}
                                                    style={{borderRadius:20,width:'80%',paddingLeft:'5%',height:Dimensions.get('window').height * .05,borderWidth:1,borderColor:'#d3d3d3'}}
                                                    onChangeText={(fundLink)=>{this.setState({fundLink})}}
                                                    placeholder={'Paste your fundraiser url here'}
                                                    placeholderTextColor={'#101010'}
                                                />
                                                <Spacer spacing={.05} xAxis/>
                                                <TouchableOpacity onPress={()=>{this.setState({didFundraiserLink:false,fundLink:null})}}>
                                                    <Ionicons name={'ios-close-circle'} color={'black'} size={25}/>
                                                </TouchableOpacity>
                                            </View>

                                            :
                                            <Text style={[{color:'black',fontWeight:'bold'}]}>Link fundraiser</Text>}
                                    </TouchableOpacity>
                                </>
                                :
                                <></>
                            }
                            <Spacer spacing={.025}/>
                        <TouchableOpacity onPress={()=>{this.addPhoto()}} style={[flexing.rowStart]}>
                            <Ionicons name={'ios-image-outline'} color={'#3EB489'} size={30}/>
                            <Spacer spacing={.025} xAxis/>
                            <Text style={[{color:'black',fontWeight:'bold'}]}>{this.state.imgProvided ? 'Change' :'Add'} Photo</Text>

                            <Spacer spacing={.425} xAxis/>
                            {this.state.imgProvided ?

                                <Ionicons name={'ios-checkmark'} size={20} color={'black'}/>
                                :
                                <></>

                            }

                        </TouchableOpacity>
                            <Spacer spacing={.015}/>
                            <TouchableOpacity onPress={()=>{this.addVideo()}} style={[flexing.rowStart]}>
                                <Ionicons name={'ios-film-outline'} color={'#fEB289'} size={30}/>
                                <Spacer spacing={.025} xAxis/>
                                <Text style={[{color:'black',fontWeight:'bold'}]}>{this.state.videoProvided ? 'Change' : 'Add'} Video</Text>

                                <Spacer spacing={.425} xAxis/>
                                {this.state.videoProvided ?

                                    <Ionicons name={'ios-checkmark'} size={20} color={'black'}/>
                                    :
                                    <></>

                                }
                            </TouchableOpacity>

                            <Spacer spacing={.015}/>
                            <TouchableOpacity onPress={()=>{this.addInspiration()}} style={[flexing.rowStart]}>
                                <Ionicons name={'ios-body-outline'} color={'firebrick'} size={30}/>
                                <Spacer spacing={.025} xAxis/>
                                <Text style={[{color:'black',fontWeight:'bold'}]}>{this.state.isNomination || this.state.isInspired ? 'Change' : 'Add'} Inspiration</Text>
                                <Spacer spacing={.425} xAxis/>
                                {this.state.isNomination || this.state.isInspired ?

                                    <Ionicons name={'ios-checkmark'} size={20} color={'black'}/>
                                    :
                                    <></>

                                }
                            </TouchableOpacity>

                            <Spacer spacing={.015}/>
                            <TouchableOpacity
                                onPress={()=>{this.popNominationModal()}}
                                style={[flexing.rowStart]}>
                                <Ionicons name={'ios-hand-right-outline'} color={'#875f9a'} size={30}/>
                                <Spacer spacing={.025} xAxis/>
                                <Text style={[{color:'black',fontWeight:'bold'}]}>{this.state.nominationList.length > 0 ? 'Change Nominations' :'Nominate Followers'}</Text>
                                {this.state.isNomination || this.state.isInspired ?

                                    <Ionicons name={'ios-checkmark'} size={20} color={'black'}/>
                                    :
                                    <></>

                                }
                            </TouchableOpacity>

                            {this.state.nominationList.length > 0 ?
                            <View style={[]}>
                            </View>
                            :
                            <></>
                            }

                            <Spacer spacing={.015}/>


                        </View>


                        <Spacer spacing={.025} />


                    </VStack>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}


// render() {
//         return (
//             <Animated.View style={[{width:'100%',height:'100%'},flexing.centerColumn]}>
//                 <TouchableOpacity onPress={()=>{testVideoUpload()}} style={[{marginTop:'25%'}]}>
//                     <Text>test video</Text>
//                 </TouchableOpacity>
//             </Animated.View>
//         )
//     }
//
//
// }
