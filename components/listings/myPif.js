import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare,fixedShape} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import {Ionicons} from "@expo/vector-icons";
import LiveButton from "../buttons/liveButton";
import InitialOrPic from "../buttons/initialOrPic";
import {convertTimeStamp} from "../../helperFuncs/dateTime";
import {loadCommentSection, getUserProfile} from "../../firebase/fireStarter";
import FastImage from "react-native-fast-image";
import * as WebBrowser from "expo-web-browser";
import Video from "react-native-video";


export default class MyPif extends React.Component {
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
        this.setState({currentLikes:data.likedList.length,savedCount:data.savedList.length})
    }

    openBrowser = async (url) => {
        let action = await WebBrowser.openBrowserAsync(url);
        console.log(action)
    };

    loadComments = async (data) => {
        console.log(this.props.data,'data')
        if(this.props.ableToLoadComments) {
            loadCommentSection(this.props.navigation,this.props.route,data.id,data)
        }
    }

    render() {
        let data = this.props.data;

        return (
            <Animated.View style={[flexing.startColumn,{width:'90%',marginLeft:'5%',backgroundColor:'ghostwhite',marginTop:'5%',borderRadius:20}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>

                    <View style={[flexing.rowStart,{width:'80%',borderWidth:0,borderColor:'red'}]}>

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

                    <View style={[flexing.rowAround,{width:'20%',borderWidth:0,borderColor:'red'}]}>
                        {data.trendId === data.id && data.trendList ?
                            <View style={[createSquare(.035, 0, 'purple'), {backgroundColor: 'white'}]}>

                                <TouchableOpacity>
                                    <Ionicons name={'ios-pulse-outline'} color={'#3EB489'} size={25}/>
                                </TouchableOpacity> :
                                <></>


                            </View>

                            :
                            <></>
                        }

                    </View>
                    {/*<View style={[createSquare(.035,1,'purple'),{backgroundColor:'purple'}]}>*/}
                    {/*    <TouchableOpacity>*/}
                    {/*        <Ionicons name={'ios-git-branch-outline'} color={'white'} size={25}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
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

                {data.videoProvided

                    ?
                    <Video source={{uri: data.video}}
                           ref={(ref) => {
                               this.player = ref
                           }}
                           paused={true}
                           muted={true}
                           fullscreenAutorotate={true}
                           disableFocus={false}
                           controls={true}
                        //onBuffer={(ev)=>{console.log(ev)}}
                           onError={(error)=>{alert('video error occurred')}}
                           resizeMode={'cover'}
                           style={{width:'100%',height:250,borderRadius:0}} />
                    : <></>
                }

                <Spacer  spacing={.025}/>

                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%'}]}>
                    <View style={[flexing.rowStart,{width:'30%'}]}>
                        <Ionicons name={'ios-heart-circle'} color={'red'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>{data.likedList.length}</Text>
                    </View>

                    <View style={[flexing.rowEnd,{width:'70%'}]}>
                        <TouchableOpacity onPress={()=>{this.loadComments(data)}} style={[flexing.rowStart]}>
                            <Text>{data.commentList.length}</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Comment{data.commentList.length === 1 ? '':'s'}</Text>
                        </TouchableOpacity>
                        <Spacer xAxis spacing={.05125}/>

                        <View style={[flexing.rowStart]}>
                            <Text>{data.savedList.length}</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Inspo{data.savedList.length === 1 ? '':'s'}</Text>
                        </View>


                    </View>

                    {!data.isEvent ?
                        <></>
                        :
                        <View style={[flexing.rowAround,{width:'90%',marginLeft:'5%'},flexing.rowStart]}>
                            <Ionicons name={'ios-calendar'} color={'#3EB489'} size={25}/>
                            <Spacer spacing={.025} xAxis/>
                            <Text style={{fontSize:15}}>This post features an event.</Text>
                            <Spacer spacing={.05} xAxis/>
                            <TouchableOpacity onPress={()=>{this.openBrowser('https://www.eventbrite.com')}} style={[{backgroundColor:'#e3e3e3',borderWidth:0,borderRadius:5,height:Dimensions.get('window').height * .035,width:'25%'},flexing.centerColumn]}>
                                <Text style={[{color:'black'}]}>View Event</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {!data.isFundraiser ?
                        <></>
                        :
                        <View style={[flexing.rowAround,{width:'90%',marginLeft:'5%'},flexing.rowStart]}>
                            <Ionicons name={'ios-calendar'} color={'#3EB489'} size={25}/>
                            <Spacer spacing={.025} xAxis/>
                            <Text style={{fontSize:15}}>This post features a fundraiser.</Text>
                            <Spacer spacing={.05} xAxis/>
                            <TouchableOpacity onPress={()=>{this.openBrowser('https://www.gofundme.com')}} style={[{backgroundColor:'#e3e3e3',borderWidth:0,borderRadius:5,height:Dimensions.get('window').height * .035,width:'25%'},flexing.centerColumn]}>
                                <Text style={[{color:'black'}]}>Learn More</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
                <Spacer  spacing={.0125}/>
                <Spacer  spacing={.0125}/>

            </Animated.View>
        )
    }


}
