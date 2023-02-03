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
import {convertTimeStamp, formatTimestamp} from "../../helperFuncs/dateTime";
import {getPifInspoTrend, loadCommentSection, getUserProfile} from "../../firebase/fireStarter";
import FastImage from "react-native-fast-image";
import Share from 'react-native-share'
import Video from "react-native-video";
import RoundedButton from "../buttons/roundedButton";
import * as WebBrowser from 'expo-web-browser';


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
        console.log(data.trendId,data.id,data.inspirationId)
        console.log(data.inspirationList ? data.inspirationList.length : 0)
this.setState({currentLikes:data.likedList.length,savedCount: data.inspirationList ? data.inspirationList.length : 0})
    }

    likePost = () => {
        let currentLikes = this.state.currentLikes;
        currentLikes += 1;
        this.setState({currentLikes},()=>{
            this.props.like()
        })
    }

    openBrowser = async (url) => {
    let action = await WebBrowser.openBrowserAsync(url);
console.log(action)
    };

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

    share = async (data) => {
        let url;
        let title;
        let message;

            if(data?.isEvent) {
                url =    "https://www.eventbrite.com/";
                title =    "Awesome Event";
                message = 'Check out this cool event I found on The 43 Initiative'
            } else if (data?.isFundraiser) {
                url =    "https://www.gofundme.com/";
                title =    "Solid Fundraiser";
                message = 'Check out this fundraiser event I found on The 43 Initiative'
            } else {
                title =    "The 43 Initiative";
                url =    "https://www.plitnick.com/";
               message =  "Be the one to spread the love by doing good deeds,check out The 43 Initiative on IOS";
            }





        const options = {
            title,
            url,
            message,
        };
        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    returnInspo = async (type,postId) => {
        let list = await getPifInspoTrend(type,postId);
        if(list.passed) {
            this.props.navigation.push('AllPifs',{
                data:list.data,
                title:list.title
            })
        } else {
            console.log('fail grab')
        }
    }

    render() {
        let data = this.props.data;

        return (
            <Animated.View style={[flexing.startColumn,{width:'100%',backgroundColor:'white',marginTop:'5%',borderTopWidth:8,borderColor:'#d3d3d3'}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>

                    <View style={[flexing.rowStart,{width:'75%'}]}>

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

                    <Spacer xAxis={true} spacing={.02}/>
                    <View style={[flexing.rowAround,{width:'20%'}]}>
                        <View style={[createSquare(.035,0,'purple'),{backgroundColor:'white'}]}>
                            {data.trendId !== data.id && data.trendList ?
                                <TouchableOpacity

                                    onPress={()=>{
                                        if(data?.inspirationList && data.inspirationList.length > 0) {
                                            this.returnInspo('trend',data.id)
                                        }
                                    }}>
                                    <Ionicons name={'ios-pulse-outline'} color={'#3EB489'} size={25}/>
                                </TouchableOpacity> :
                                <></>
                            }

                        </View>

                        <TouchableOpacity onPress={()=>{
                            console.log(data,'data here')
                            this.props.navigation.push("CreateNewPost",{
                                isNomination:false,
                                isInspired:true,
                                pifData:data
                            })
                        }} style={[createSquare(.04,0,'black'),{backgroundColor:'white',width:'45%'},flexing.centerColumn]}>

                            <Image source={require('../../assets/img/43v8.png')} style={{width:'100%',height:'100%'}} resizeMode={'contain'}/>



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
                            style={[{width:'100%',height:400}]}
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
                           paused={false}
                           muted={true}
                           fullscreenAutorotate={true}
                           disableFocus={false}
                           controls={true}
                           //onBuffer={(ev)=>{console.log(ev)}}
                           onError={(error)=>{alert('video error occurred')}}
                           resizeMode={'cover'}
                           style={{width:'100%',height:400,borderRadius:0}} />
                    : <></>
                }

                <Spacer  spacing={.025}/>

                <View style={[flexing.rowBetween,{width:'95%',marginLeft:'2.5%'}]}>
                    <TouchableOpacity style={[flexing.rowStart,{width:'20%'}]}>
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

                        <TouchableOpacity onPress={()=>{
                            if(data?.inspirationList && data.inspirationList.length > 0) {
                                this.returnInspo('inspo',data.postId)
                            }
                        }} style={[flexing.rowStart]}>
                            <Text>{data?.inspirationList ? data.inspirationList.length: 0}</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Inspo{this.state.savedCount === 1 ? '':'s'}</Text>
                        </TouchableOpacity>
                        <Spacer xAxis spacing={.05125}/>




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

                    <TouchableOpacity onPress={()=>{this.share()}} style={[flexing.rowStart,{justifyContent:'center'}]}>
                        <Ionicons name={'ios-share-outline'} size={20} color={'gray'}/>
                        <Spacer xAxis spacing={.005125}/>

                        <Text>Share</Text>


                    </TouchableOpacity>
                </View>
                <Spacer  spacing={.025}/>

                {!data.isEvent ?
                <></>
                :
                    <View style={[flexing.rowAround,{width:'90%',marginLeft:'5%'},flexing.rowStart]}>
                        <Ionicons name={'ios-calendar'} color={'#3EB489'} size={25}/>
                        <Spacer spacing={.025} xAxis/>
                        <Text style={{fontSize:15}}>This post features an event.</Text>
                        <Spacer spacing={.05} xAxis/>
                        <TouchableOpacity onPress={()=>{this.openBrowser('https://www.eventbrite.com')}} style={[{backgroundColor:'#e3e3e3',borderWidth:0,borderRadius:5,height:Dimensions.get('window').height * .0425,width:'25%'},flexing.centerColumn]}>
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
                        <TouchableOpacity onPress={()=>{this.openBrowser('https://www.gofundme.com')}} style={[{backgroundColor:'#e3e3e3',borderWidth:0,borderRadius:5,height:Dimensions.get('window').height * .0425,width:'25%'},flexing.centerColumn]}>
                            <Text style={[{color:'black'}]}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                }
                <Spacer  spacing={.025}/>

            </Animated.View>
        )
    }


}
