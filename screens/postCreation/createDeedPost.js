import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    TextInput,
    Keyboard,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import Circle from "../../designComps/circle";
import {flexing} from "../../styles/dimensions/dims";
import {fixedShape} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";
import Spacer from "../../design/spacer";
import Pif from "../../components/listings/pif";
import OutlineButton from "../../components/buttons/outlineButton";
import OutlineIconButton from "../../components/buttons/outlineIconButton";
import TextLink from "../../components/text/textLink";
import {acquireAnImage} from "../../permissionCalls/imgUpload";
import {getPifPost,
    transformBlobForPost,
    transformBlob,
    addPif,
    getInspiration,
    getRecNominations
} from "../../firebase/fireStarter";
import {activateLoading, deactivateLoading, showToastMessage} from "../../reducers/controllers";
import {waitACertainTime} from "../../helperFuncs/timers/wait";
import NominationSection from "../../components/listings/nominationSection";
import CommentPif from "../../components/listings/commentPif";


export default class CreateDeedPost extends React.Component {
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
            trendId:null

        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        if(data.isNomination) {
            this.setState({isNomination:true,pifData:data.pifData,nominationData:data.nomData,isInspired:true,inspirationId:data.pifData.id,trendId:data.pifData.trendId})
        }

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

    buttonDisabled = () => {
        switch(this.state.stage) {
            case 0 : {
                return this.state.post.length < 1
            }

            case 1 : {

                return false
                // if(this.state.inspirationList.length !== 0) {
                //     if(!this.state.inspirationBypassed) {
                //         if(!this.state.inspirationId) {
                //             return true
                //         } else {
                //             return false
                //         }
                //     } else {
                //         return false
                //     }
                // } else {
                //     return false
                // }

            }
        }
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
            let post = {
                post:this.state.post,
                isInspired:this.state.isInspired,
                inspirationId:this.state.inspirationId,
                nominationList:this.state.nominationList.map((val)=>{
                    return val.id
                }),
                imgProvided:imgLink !== null,
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

    retunStage = () => {
        switch (this.state.stage) {

            case 0 : {
               return( <TextInput
                   style={[{borderColor:'#e3e3e3',borderWidth:1,borderRadius:20,height:'60%',padding:'5%',paddingTop:'5%'}]}
                   value={this.state.post}
                   maxLength={500}
                   onChangeText={(val)=>{this.setState({post:val})}}
                   placeholder={'Talk about your good deed.'}
                   multiline={true}
               />)
            }

            case 1 : {
            return this.returnInspirationSection()
            }

            case 2 : {
                return this.returnImageSelection()
            }

            case 3 : {
                return this.returnNominationSection()
            }

            case 4 : {
                return this.returnFinishSection()
            }
        }

    }



    returnAnImage = async () => {
        let x = await acquireAnImage(true);
        console.log(x)
        if(x.passed) {
            this.setState({imageSelected:true,chosenImageLink:x.link})
        }
        //await this.uploadImg(x.link)
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

    returnImageSelection = () => {

        if(this.state.imageSelected) {
            return(
                <View style={[{width:'100%',height:'70%'},flexing.centerColumn]}>

                    <Image source={{uri:this.state.chosenImageLink}} resizeMode={'contain'} style={{width:'90%',height:'100%'}}/>
                    <View style={[{width:'40%'},flexing.rowAround]}>
                        <TextLink pressed={()=>{this.returnAnImage()}} textStyles={[{color:'firebrick'}]} underline underlineColor={'firebrick'}  text={'Change'}/>
                        <Spacer spacing={.025} xAxis/>
                        <TextLink pressed={()=>{this.setState({imageSelected:false,chosenImageLink:null})}} underline underlineColor={'firebrick'} textStyles={[{color:'firebrick'}]}  text={'Remove'}/>

                    </View>
                </View>
            )
        } else {
            return(
                <View style={[{width:'100%',height:'70%'},flexing.centerColumn]}>
                    <Text style={[{width:'70%',textAlign:'center',color:'#101010',fontWeight:'bold'}]}>You don't have to add an image, but we recommend it, just make sure the number 43 is included somewhere in the image. </Text>
                    <Spacer spacing={.025}/>
                    <OutlineIconButton pressed={()=>{this.returnAnImage()}} icon={'ios-image'} size={20} color={'firebrick'} borderColor={'firebrick'} bgColor={'firebrick'} style={[{height:'10%',width:'50%'}]} text={'Add Picture'}/>
                    <Spacer spacing={.025}/>
                </View>
            )
        }

    }

    returnOriginalPost = () => {
        if(this.state.viewOriginalPost) {
            return( <View style={[flexing.startColumn]}>
                <Text style={[{color:'black',fontSize:15,fontWeight:'600'}]}>Original Post:</Text>

                <CommentPif
                    ableToLoadComments={false}
                    route={this.props.route} navigation={this.props.navigation} data={this.state.pifData} userUid={this.state.pifData.userUid}/>
                <Spacer spacing={.025}/>
            </View>)
        } else {
            return(<></>)
        }
    }

    returnInspirationSection = () => {

        if(this.state.isNomination) {
            return( <View style={[{width:'100%',height:'90%'},flexing.centerColumn]}>
                <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',borderWidth:0,borderColor:'red'}}>
                    <Text style={[{color:'black',fontSize:15,fontWeight:'600'}]}>Nomination message: </Text>
                    <Spacer spacing={.025}/>
                    <NominationSection data={this.state.nominationData}/>
                    <View style={[flexing.rowStart,{width:'100%'}]}>
                        <TouchableOpacity onPress={()=>{this.state.viewOriginalPost ? this.setState({viewOriginalPost:false}) : this.setState({viewOriginalPost:true})}} style={[flexing.centerColumn,{borderColor:'gray',borderWidth:1,width:'45%',borderRadius:8,height:Dimensions.get('window').height * .0325}]}>
                            <Text style={[{color:'gray',fontWeight:'bold'}]}>{this.state.viewOriginalPost ? 'Hide' : 'View'} Original Post</Text>
                        </TouchableOpacity>
                        <Spacer spacing={.025} xAxis/>
                        <TouchableOpacity onPressOut={()=>{this.removeNomination()}}  style={[flexing.centerColumn,{borderColor:'firebrick',borderWidth:1,width:'45%',borderRadius:8,height:Dimensions.get('window').height * .0325}]}>
                            <Text style={[{color:'firebrick',fontWeight:'bold'}]}>Remove Nomination</Text>
                        </TouchableOpacity>
                    </View>
                    <Spacer spacing={.025}/>

                    {this.returnOriginalPost()}
                    <Spacer spacing={.25}/>

                </ScrollView>
            </View>)
        } else {
            if(this.state.inspirationList.length === 0) {
                return(
                    <View style={[{width:'100%',height:'80%'},flexing.centerColumn]}>
                        <Text style={[{width:'60%',textAlign:'center'}]}>You do not have any nominations or inspirations saved. No worry you can still post your good deed!</Text>
                    </View>
                )
            } else {

                if(this.state.inspirationId) {

                    return(   <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',borderWidth:0,borderColor:'red'}}>
                        <Spacer spacing={.025}/>
                        <View style={[flexing.startColumn]}>


                            <CommentPif
                                ableToLoadComments={false}
                                route={this.props.route} navigation={this.props.navigation} data={this.state.pifData} userUid={this.state.pifData.userUid}/>
                            <Spacer spacing={.025}/>
                        </View>
                        <Spacer spacing={.25}/>

                    </ScrollView>)

                } else {
                    return(
                        <View style={[{width:'100%',height:'50%'},flexing.centerColumn]}>
                            <Text style={[{width:'70%',textAlign:'center',color:'#101010',fontWeight:'bold'}]}>You can choose from good deeds you've saved, or any pending nominations you may have.</Text>
                            <Spacer spacing={.15}/>
                            <OutlineIconButton pressed={()=>{this.addInspiration()}} icon={'ios-image'} size={20} color={'firebrick'} borderColor={'firebrick'} bgColor={'firebrick'} style={[{height:'10%',width:'50%'}]} text={'Add Inspo'}/>
                            <Spacer spacing={.025}/>
                        </View>
                    )
                }

            }
        }

    }

    returnNominationSection = () => {
        if(this.state.nominationList.length !== 0) {
            return(
                <View style={[{width:'100%',height:'80%'},flexing.centerColumn]}>
                    <Spacer spacing={.0725}/>

                    <TextInput
                        style={[{borderColor:'#e3e3e3',borderWidth:1,borderRadius:20,width:'80%',height:'60%',padding:'5%',paddingTop:'5%'}]}
                        value={this.state.nomMsg}
                        maxLength={500}
                        onChangeText={(val)=>{this.setState({nomMsg:val})}}
                        placeholder={'Talk about your good deed.'}
                        multiline={true}
                    />
                    <Spacer spacing={.05}/>

                    <Text style={[{width:'60%',textAlign:'center',fontWeight:'bold'}]}>You have nominated {this.state.nominationList.length} user{this.state.nominationList.length > 1 ? 's' : ''}! Great Job!</Text>
                    <Spacer spacing={.025}/>
                    <OutlineIconButton pressed={()=>{this.popNominationModal()}} icon={'ios-add-circle'} size={20} color={'firebrick'} borderColor={'firebrick'} bgColor={'firebrick'} style={[{height:'10%',width:'50%'}]} text={'Edit Noms'}/>

                </View>
            )
        } else {


                return(
                    <View style={[{width:'100%',height:'50%'},flexing.centerColumn]}>
                        <Spacer spacing={.0725}/>

                        <Text style={[{width:'90%',textAlign:'center',color:'#101010',fontWeight:'500',marginTop:'10%'}]}>You can add a nomination message that informs those you nominate as to what you expect from them</Text>

                        <Spacer spacing={.05}/>
                        <TextInput
                            style={[{borderColor:'#e3e3e3',borderWidth:1,borderRadius:20,width:'80%',height:'60%',padding:'5%',paddingTop:'5%'}]}
                            value={this.state.nomMsg}
                            maxLength={500}
                            onChangeText={(val)=>{this.setState({nomMsg:val})}}
                            placeholder={'Tell them what you want them to do.'}
                            multiline={true}
                        />
                        <Spacer spacing={.025}/>

                        <Text style={[{width:'70%',textAlign:'center',color:'#101010',fontWeight:'bold'}]}>You can nominate up to 5 users that follow you.</Text>
                        <Spacer spacing={.025}/>
                        <OutlineIconButton pressed={()=>{this.popNominationModal()}} icon={'ios-add-circle'} size={20} color={'firebrick'} borderColor={'firebrick'} bgColor={'firebrick'} style={[{height:'15%',width:'50%'}]} text={'Add Noms'}/>
                        <Spacer spacing={.025}/>
                    </View>
                )


        }
    }

    returnFinishSection = () => {
        return(
            <View style={[{width:'100%',height:'75%'},flexing.centerColumn]}>
                <Text style={[{width:'70%',textAlign:'center',color:'#101010',fontWeight:'bold',fontSize:22}]}>All Set! You can go back and edit anything you'd like before you post. Tap the checkmarks above to do so.</Text>
                <Spacer spacing={.025}/>
                <Ionicons name={'ios-checkmark-circle'} size={60} color={'firebrick'}/>

            </View>
        )
    }

    shareNominations = (list) => {
        console.log(list)
        this.setState({nominationList:list},()=>{
            this.props.navigation.goBack()
        })
    }

    popNominationModal = async () => {
        console.log('tapped')
        this.props.navigation.navigate('NominationModal',{
            shareNominations:this.shareNominations,
            list:this.state.nominationList
        })
    }



    render() {
        return (
            <TouchableWithoutFeedback disabled={this.state.stage === 1} onPress={Keyboard.dismiss}>
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <View style={[{width:'90%',marginLeft:'5%',height:'7.5%'},flexing.rowBetween]}>
                    <View style={[flexing.rowStart,{width:'80%'}]}>
                        <Text style={[{fontSize:25,fontWeight:'bold'}]}>{this.state.stage + 1}.</Text>
                        <Spacer spacing={.0125} xAxis/>
                        <Text style={[{fontSize:22.5,fontWeight:'bold'}]}>{this.state.stageOptions[this.state.stage].title}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name={'ios-close-circle'} size={30} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <View style={[{width:'100%',marginLeft:'0%',marginTop:'5%',position:'relative',height:'8%'},flexing.rowAround,{alignItems:'center'}]}>
                    <View style={[{position:'absolute',height:'100%'},fixedShape.line,{left:0,width:'80%',marginLeft:'10%'}]}></View>

                    {this.state.stageOptions.map((val,i)=>(
                        <TouchableOpacity onPress={()=>{this.state.stage >= i ? this.setState({stage:i}) : console.log('somethign')}}>
                        <Circle size={.03} borderColor={'firebrick'} backgroundColor={this.state.stage >= i ? 'firebrick' : 'white'}>
                            {this.state.stage >= i ?                             <Ionicons name={val.icon} color={'white'} size={17}/>
:<Ionicons name={val.icon} color={'firebrick'} size={17}/>
                            }
                        </Circle>
                        </TouchableOpacity>
                    ))}

                </View>

                <View style={[{width:'90%',marginLeft:'5%',height:'65%',marginTop:'5%',backgroundColor:'white'}]}>
                    {this.retunStage()}
                </View>

                <View style={[{width:'80%',marginLeft:'10%',height:'15%',backgroundColor:'white'}]}>
                    <RoundedButton pressed={()=>{this.state.stage === 4 ? this.submitPost() : this.advanceStage()}} disabled={this.buttonDisabled()} style={[{backgroundColor:'firebrick',height:'50%',width:'100%'}]} textStyles={{color:'white'}}  bgColor={'firebrick'} text={this.state.stage !== 4 ?'Continue' : 'Submit'}/>
                </View>
            </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
