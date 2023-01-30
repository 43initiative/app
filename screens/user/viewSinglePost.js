import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    KeyboardAvoidingView,
    TextInput,
    Dimensions, ScrollView, SafeAreaView, Keyboard
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Pif from "../../components/listings/pif";
import  {
    getUserProfile,
    returnUserLikedList,
    returnUserSavedList,
    updateLikedList,
    updateSavedList,
    submitComment
} from "../../firebase/fireStarter";
import Spacer from "../../design/spacer";
import components, {flexing} from "../../styles/dimensions/dims";
import CommentPif from "../../components/listings/commentPif";
import InitialOrPic from "../../components/buttons/initialOrPic";
import {convertTimeStamp} from "../../helperFuncs/dateTime";
import Comment from "../../components/listings/comment";

export default class ViewSinglePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myComment:'',
            likedList:[],savedList:[],commentList : []
        }

    }

    componentDidMount() {
        let comments = this.props.route.params.commentList
        this.setState({commentList:comments})
        this.getLists();

    }

    getLists = async () => {
        let likedList = await returnUserLikedList();
        let savedList = await returnUserSavedList();
        this.setState({likedList, savedList})
    }

    likePost = async (postId,i) => {
        let likedList = this.state.likedList;
        likedList.push(postId);
        console.log(likedList);
        this.setState({likedList:[...likedList]},async()=>{
            await updateLikedList(likedList);
        })


    }

    unlikePost = async  (postId) => {

        let likedList = this.state.likedList;
        let index  = likedList.findIndex((val)=>{return val === postId})
        likedList.splice(index,1)
        console.log(likedList)

        this.setState({likedList:[...likedList]},async()=>{
            await updateLikedList(likedList);
        })


    }

    savePost = async (postId,i) => {
        let savedList = this.state.savedList;
        savedList.push(postId);
        console.log(savedList);
        this.setState({savedList:[...savedList]},async()=>{
            await updateSavedList(savedList);
        })


    }

    unsavePost = async  (postId) => {

        let savedList = this.state.savedList;
        let index  = savedList.findIndex((val)=>{return val === postId})
        savedList.splice(index,1)
        console.log(savedList)

        this.setState({savedList:[...savedList]},async()=>{
            await updateSavedList(savedList);
        })


    }

    returnCommentSectin = () => {


        if( this.props.route.params.commentList.length > 0) {
            return this.props.route.params.commentList.map((val)=>(
                <Comment
                    comment={val.comment}
                    userUid={val.userUid}
                    initials={val.initials}
                    imgProvided={val.imgProvided}
                    displayName={val.displayName}
                    timestamp={val.timestamp}
                    img={val.img}
                    circleRadius={.05}
                    navigation={this.props.navigation} route={this.props.route}/>

            ))
        } else {
            return(
                <View style={[flexing.centerColumn,{height:'50%'}]}>
                    <Ionicons name={'ios-chatbubbles'} color={'gray'} size={30}/>
                    <Spacer spacing={.025}/>
                    <Text style={{color:'gray'}}>No Comments Yet</Text>
                </View>
            )
        }

    }

    postComment = async () => {
        let postId = this.props.route.params.postId;

        let response = await submitComment(this.state.myComment,postId);
        if(response.passed) {
            let list = this.state.commentList;
            list.unshift(response.comment);
            this.setState({comments:list,myComment:''})
            Keyboard.dismiss();
        }
    }

    render() {
        let data = this.props.route.params.pifData;
        return (
            <SafeAreaView>
                <Animated.View style={[{backgroundColor:'white',width:Dimensions.get("window").width,height:Dimensions.get('window').height}]}>
                    <View style={[{position:'absolute',zIndex:1,width:'90%',marginTop:'2.5%',marginLeft:'5%',paddingBottom:'7.5%',borderColor:'black',borderWidth:0},flexing.rowStart]}>
                        <TouchableOpacity style={{width:'15%'}} onPress={()=>{this.props.navigation.goBack()}}>
                            <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                        </TouchableOpacity>

                        <View style={[flexing.rowStart,{width:'80%',alignItems:'flex-start',height:'100%'}]}>

                            <InitialOrPic circleRadius={.05} initials={data.userInitials} route={this.props.route} navigation={this.props.navigation} userUid={data.userUid} imgProvided={data.userImgProvided} img={data.userImg}/>

                            <Spacer xAxis={true} spacing={.025}/>

                            <TouchableOpacity onPress={()=>{
                                getUserProfile(this.props.navigation,this.props.route,false,this.props.userUid)

                            }} style={[flexing.startColumn]}>
                                <Text style={[{fontSize:15,fontWeight:'500'}]}>{data.userDisplayName}</Text>
                                <View style={[flexing.rowStart]}>
                                    <Text style={[{fontSize:11,color:'gray'}]}>{convertTimeStamp(data.timestamp)}</Text>
                                    <Spacer xAxis={true} spacing={.0125}/>
                                    <Ionicons name={'ios-globe'} size={15} color={'gray'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <KeyboardAvoidingView style={[{flex:1,marginTop:'15%'}]} behavior={'padding'}>
                        <ScrollView>

                            <View style={[{width:'100%'}]}>
                                <CommentPif
                                    ableToLoadComments={true}
                                    like={()=>{this.likePost(data.postId)}} unlike={()=>{this.unlikePost(data.postId)}}
                                    save={()=>{this.savePost(data.postId)}} unsave={()=>{this.unsavePost(data.postId)}}
                                    isSaved={this.state.savedList.indexOf(data.postId) !== -1}  isLiked={this.state.likedList.indexOf(data.postId) !== -1}  route={this.props.route} navigation={this.props.navigation} data={data} userUid={data.userUid}/>

                            </View>

                            {this.returnCommentSectin()}
                            <Spacer spacing={.340}/>
                        </ScrollView>



                        <View style={[flexing.rowAround,{width:'100%',top:'75%',height:'20%',paddingTop:'5%',position:'absolute',zIndex:2,backgroundColor:'white',alignItems:'flex-start'}]}>
                            <TextInput
                                placeholder={'your comment here'}
                                multiline={true}
                                autoCorrect={false}
                                textAlignVertical={'center'}
                                style={{width:'75%',paddingLeft:'5%',paddingTop:'2.5%',minHeight:Dimensions.get('window').height * .05,borderRadius:10,borderColor:'gray',borderWidth:1}}
                                value={this.state.myComment}
                                onChangeText={(val)=>{this.setState({myComment:val})}}
                            />
                            <TouchableOpacity onPress={()=>{this.postComment()}} disabled={this.state.myComment === ''} style={[{opacity:this.state.myComment === '' ? .3 : 1,width:'15%',height:'30%',borderRadius:10,backgroundColor:'firebrick'},flexing.centerColumn]}>
                                <Text style={{color:'white'}}>Post</Text>
                            </TouchableOpacity>
                        </View>




                    </KeyboardAvoidingView>

                </Animated.View>
            </SafeAreaView>
        )
    }


}
