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
    Dimensions,
    ActivityIndicator
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
import {runInitialLocationChecks, startLocationTracking} from "../../permissionCalls/location";


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
            tagList:'',
            isNomination:false,
            includeLocation:false,
            lat:0,
            long:0,
            inspirationId:null,
            inspirationBypassed:false,
            inspirationList:[],
            imageSelected:false,
            chosenImageLink:null,
            nominationList:[],
            nomMsg:'',
            pifData:null,
            public:true,
            nominationData:null,
            viewOriginalPost:false,
            isInspired:false,
            trendId:null,
            didEventLink:false,
            didFundraiserLink:false,
            fundLink:null,
            eventLink:null,
            mediaLoading:false,
            isFundRaiser:false,
            isEvent:false,
            imgProvided:false,
            videoProvided:false,
            img:null,
            video:null,
            locationOption:false

        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        if(data.isNomination) {
            this.setState({isNomination:true,pifData:data.pifData,nominationData:data.nomData,isInspired:true,inspirationId:data.pifData.id,trendId:data.pifData.trendId})
        }

        if(data.isInspired) {
            this.setState({isNomination:false,pifData:data.pifData,isInspired:true,inspirationId:data.pifData.id,trendId:data.pifData.trendId})
        }

        this.fetchInspiration();
        this.checkLocation()
    }

    checkLocation = async () => {
        let check = await runInitialLocationChecks(true);
        if(check.passed) {
            let {lat,long} = await startLocationTracking();
            this.setState({includeLocation:true,locationOption:true,lat,long})
        } else {

        }
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

    testTagList = () => {
        let amendedTagList = [];
        if(this.state.tagList !== '') {
            let tagArray = this.state.tagList.split(" ")

            amendedTagList =  tagArray.filter((val)=>{return  val && val !== 'undefined' &&  val.includes('#') && val[0] === '#' && val.length > 1} ).slice(0,4).map((val)=>{
                return val.split('#')[1]
            })
            console.log(amendedTagList)
        }
    }

    submitPost = async () => {
        try {
            let amendedTagList = [];
            if(this.state.tagList !== '') {
                let tagArray = this.state.tagList.split(" ")

                amendedTagList =  tagArray.filter((val)=>{return  val && val !== 'undefined' &&  val.includes('#') && val[0] === '#' && val.length > 1} ).slice(0,4).map((val)=>{
                    return val.split('#')[1]
                })
                console.log(amendedTagList)
            }

            activateLoading()
            let data = storeControllers.storeData().userData.publicData
            let post = {
                post:this.state.post,
                isInspired:this.state.isInspired,
                inspirationId:this.state.inspirationId,
                nominationList:this.state.nominationList,
                imgProvided:this.state.imgProvided,
                videoProvided:this.state.videoProvided,
                video:this.state.video,
                isOrganization:data.isOrganization,
                img:this.state.img,
                public:this.state.public,
                includeLocation: this.state.includeLocation,
                lat:this.state.lat,
                long:this.state.long,
                isEvent:this.state.didEventLink,
                eventLink:this.state.eventLink,
                fundLink:this.state.fundLink,
                isFundraiser:this.state.didFundraiserLink,
                savedList:[],
                likedList:[],
                commentList:[],
                tagList:amendedTagList,
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

        this.setState({mediaLoading:true})
        let downloadLink = await doImgUpload();
        console.log(downloadLink)
        if(downloadLink.passed) {
            this.setState({imgProvided:true,img:downloadLink.link})
        } else {
            console.log(downloadLink)
        }
        this.setState({mediaLoading:false})
    }

    addVideo = async () => {
        this.setState({mediaLoading:true})

        let downloadLink = await doVideoUpload();
        console.log(downloadLink)
        if(downloadLink.passed) {
            this.setState({videoProvided:true,video:downloadLink.link})
        } else {
            console.log(downloadLink)

        }
        this.setState({mediaLoading:false})


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

                        <RoundedButton pressed={()=>{
                            this.submitPost();
                            //this.testTagList()
                        }} disabled={this.state.post === ''} textStyles={{color:'white',textTransform:'capitalize'}} bgColor={'#3EB489'} text={'Post'} style={[{backgroundColor:'#3EB489',height:'70%',width:'15%',borderRadius:7}]}/>
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

                        <TextInput placeholderTextColor={'#101010'} onChangeText={(val)=>{this.setState({post:val})}} value={this.state.deed} placeholder={'Tell the people about your good deed!'} multiline={true} style={[{width:'95%',height:'20%',borderWidth:0,borderColor:'green'}]}/>

                        <View style={[{width:'95%',height:'5%',borderWidth:0,borderColor:'blue'}]}>
                            {this.state.post !== '' ?
                                <TextInput placeholderTextColor={'#d3d3d3'} onChangeText={(val)=>{this.setState({tagList:val})}} value={this.state.tagList} placeholder={'Add up to 4 hashtags i.e #helpthehomeless'} multiline={false} style={[{width:'100%',height:'100%'}]}/>
                                :<></>
                            }
                        </View>


                        <View style={[{width:'90%',marginLeft:'2.5%',borderColor:'red',borderWidth:0,height:Dimensions.get('window').height * .08}]}>

                            {this.state.mediaLoading
                            ?
                                <View style={[{width:'25%',height:'100%'},flexing.centerColumn]}>
                                 <ActivityIndicator size={'large'}/>

                                </View>
                                :

                                <></>
                            }


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
                            {data.isOrganization ?
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
                                                <Spacer spacing={.0425} xAxis/>
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
                                                <Spacer spacing={.0425} xAxis/>
                                                <TouchableOpacity onPress={()=>{this.setState({didFundraiserLink:false,fundLink:null})}}>
                                                    <Ionicons name={'ios-close-circle'} color={'black'} size={25}/>
                                                </TouchableOpacity>
                                            </View>

                                            :
                                            <Text style={[{color:'black',fontWeight:'bold'}]}>Link fundraiser</Text>}
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <View style={[flexing.rowStart]}>
                                        <View style={[flexing.rowStart,{width:'85%'}]}>

                                        <Ionicons name={'ios-globe-outline'} color={'#3EB489'} size={30}/>
                                        <Spacer spacing={.025} xAxis/>

                                        <Text style={[{color:'black',fontWeight:'bold'}]}>Post {this.state.public  ? 'Is' : 'Is Not'} Public </Text>
                                        </View>
                                        <Switch
                                        trackColor={{false: 'firebrick', true: '#3EB489'}}
                                        thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(val)=>{this.setState({public:val})}}
                                        value={this.state.public}
                                    />
                                    </View>
                                    <Spacer spacing={.025}/>
                                    {this.state.locationOption ?
                                        <View style={[flexing.rowStart]}>
                                            <View style={[flexing.rowStart,{width:'85%'}]}>
                                                <Ionicons name={'ios-navigate-outline'} color={'#47bbfe'} size={30}/>
                                                <Spacer spacing={.025} xAxis/>
                                                <Text style={[{color:'black',fontWeight:'bold'}]}>You are {this.state.includeLocation  ? 'Sharing' : 'Not Sharing'} Location </Text>

                                            </View>

                                            <Switch
                                                trackColor={{false: 'firebrick', true: '#3EB489'}}
                                                thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={(val)=>{this.setState({includeLocation:val})}}
                                                value={this.state.includeLocation}
                                            />
                                        </View>
                                    :
                                    <></>}

                                </>
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
                                <Spacer spacing={.4} xAxis/>
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
                                <Spacer spacing={.4} xAxis/>
                                {this.state.nominationList.length > 0 ?

                                    <Ionicons name={'ios-checkmark'} size={20} color={'black'}/>
                                    :
                                    <></>

                                }
                            </TouchableOpacity>
                            <Spacer spacing={.025}/>

                            {this.state.nominationList.length > 0 ?
                            <View style={[{width:'75%'},flexing.startColumn]}>
                                <Text style={[{fontSize:15}]}>Your Nomination Message:</Text>
                                <Spacer spacing={.0125}/>
                                <Text style={[{fontSize:13}]}>"...{this.state.nomMsg}..."</Text>
                                <Spacer spacing={.0125}/>
                                <TouchableOpacity onPress={()=>{this.popNominationModal()}}>
                                    <Text style={[{color:'#3EB489',textDecorationLine:'underline'}]}>Edit Nominations</Text>
                                </TouchableOpacity>
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
