import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare,fixedShape} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import {Ionicons} from "@expo/vector-icons";
import LiveButton from "../buttons/liveButton";
import InitialOrPic from "../buttons/initialOrPic";
import {convertTimeStamp, formatTimestamp} from "../../helperFuncs/dateTime";
import {loadCommentSection, getUserProfile} from "../../firebase/fireStarter";
import FastImage from "react-native-fast-image";


export default class Pif extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            likeCounter:0,
            currentLikes:0,
            savedCount:0
        }

    }

    componentDidMount() {
        let data = this.props.data;
this.setState({currentLikes:data.likedList.length,savedCount: data.inspirationList ? data.inspirationList.length : 0})
    }

    likePost = () => {
        let currentLikes = this.state.currentLikes;
        currentLikes += 1;
        this.setState({currentLikes},()=>{
            this.props.like()
        })
    }

    unlikePost = () => {
        let currentLikes = this.state.currentLikes;
        currentLikes -= 1;
        this.setState({currentLikes},()=>{
            this.props.unlike()
        })
    }

    savePost = () => {
        // let currentSaves = this.state.savedCount;
        // currentSaves += 1;
       // this.setState({savedCount:currentSaves},()=>{
            this.props.save()
       // })
    }

    unsavePost = () => {
        // let currentSaves = this.state.savedCount;
        // currentSaves -= 1;
       // this.setState({savedCount:currentSaves},()=>{
            this.props.unsave()
       // })
    }

    loadComments = async (data) => {
        console.log(data,'data')
        if(this.props.ableToLoadComments) {
            loadCommentSection(this.props.navigation,this.props.route,data.postId,data)
        }
    }

    render() {
        let data = this.props.data;

        return (
            <Animated.View style={[flexing.startColumn,{width:'100%',backgroundColor:'white',marginTop:'5%',borderTopWidth:8,borderColor:'#d3d3d3'}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>

                    <View style={[flexing.rowStart,{width:'80%'}]}>

                        <InitialOrPic circleRadius={.05} initials={data.userInitials} route={this.props.route} navigation={this.props.navigation} userUid={data.userUid} imgProvided={data.userImgProvided} img={data.userImg}/>

                        <Spacer xAxis={true} spacing={.025}/>

                        <TouchableOpacity onPress={()=>{
                            getUserProfile(this.props.navigation,this.props.route,false,this.props.userUid)

                        }} style={[flexing.startColumn]}>
                            <Text style={[{fontSize:15,fontWeight:'500'}]}>{data.userDisplayName}</Text>
                            <View style={[flexing.rowStart]}>
                                <Text style={[{fontSize:11,color:'gray'}]}>{formatTimestamp(data.timestamp)}</Text>
                                <Spacer xAxis={true} spacing={.0125}/>
                                <Ionicons name={'ios-globe'} size={15} color={'gray'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Spacer xAxis={true} spacing={.095}/>

                    <View style={[createSquare(.035,1,'purple'),{backgroundColor:'purple'}]}>
                        <TouchableOpacity>
                        <Ionicons name={'ios-git-branch-outline'} color={'white'} size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[{width:'95%',marginLeft:'2.5%',marginTop:'5%'}]}>
                    {data.post}
                </Text>
                <Spacer  spacing={.025}/>

                {data.imgProvided

                ?
                    <View style={[flexing.centerColumn,{width:'100%'}]}>
                        <FastImage
                            style={[{width:'100%',height:250}]}
                            source={{
                                uri: data.img,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        {/*<Image source={{uri:data.img}} resizeMode={'cover'} style={[{width:'100%',height:250}]}/>*/}

                    </View>
                    : <></>
                }

                <Spacer  spacing={.025}/>

                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%'}]}>
                    <TouchableOpacity style={[flexing.rowStart,{width:'30%'}]}>
                        <Ionicons name={'ios-heart-circle'} color={'red'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>{this.state.currentLikes}</Text>
                    </TouchableOpacity>

                    <View style={[flexing.rowEnd,{width:'70%'}]}>
                        <TouchableOpacity onPress={()=>{this.loadComments(data)}} style={[flexing.rowStart]}>
                            <Text>{data.commentList.length}</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Comment{data.commentList.length === 1 ? '':'s'}</Text>
                        </TouchableOpacity>
                        <Spacer xAxis spacing={.05125}/>

                        <TouchableOpacity style={[flexing.rowStart]}>
                            <Text>{this.state.savedCount}</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Inspo{this.state.savedCount === 1 ? '':'s'}</Text>
                        </TouchableOpacity>


                    </View>

                </View>
                <Spacer  spacing={.0125}/>
                <View style={[fixedShape.line,{width:'90%',marginLeft:'5%'}]}></View>
                <Spacer  spacing={.0125}/>

                <View style={[flexing.rowAround,{width:'95%',marginLeft:'2.5%'}]}>
                    <LiveButton
                        pressed={()=>{this.props.isLiked ? this.unlikePost() : this.likePost()}}
                        active={this.props.isLiked}
                    activeIcon={'ios-heart'}
                    activeColor={'red'}
                    inactiveIcon={'ios-heart-outline'}
                        text={'Admire'}
                   />

                    <TouchableOpacity onPress={()=>{this.loadComments(data)}} style={[flexing.rowStart]}>
                        <Ionicons name={'ios-chatbubble-outline'} color={'gray'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>Comment</Text>
                    </TouchableOpacity>


                    <LiveButton
                        pressed={()=>{this.props.isSaved ? this.unsavePost() : this.savePost()}}
                        active={this.props.isSaved}
                        activeIcon={'ios-bookmark'}
                        activeColor={'gold'}
                        inactiveIcon={'ios-bookmark-outline'}
                        text={'Saved'}
                    />

                </View>
                <Spacer  spacing={.025}/>

            </Animated.View>
        )
    }


}
