import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import InitialOrPic from "../buttons/initialOrPic";
import Spacer from "../../design/spacer";
import {getUserProfile} from "../../firebase/fireStarter";
import {convertTimeStamp} from "../../helperFuncs/dateTime";
import {Ionicons} from "@expo/vector-icons";
import {createSquare, fixedShape} from "../../styles/globals/shapes";
import LiveButton from "../buttons/liveButton";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import * as WebBrowser from "expo-web-browser";

export default class CommentPif extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    openBrowser = async (url) => {
        let action = await WebBrowser.openBrowserAsync(url);
        console.log(action)
    };

    render() {
        let data = this.props.data;

        return (
            <Animated.View style={[flexing.startColumn,{width:'100%',backgroundColor:'ghostwhite',marginTop:'5%'}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>


                    <Spacer xAxis={true} spacing={.095}/>


                </View>

                <Text style={[{width:'95%',marginLeft:'2.5%',marginTop:'5%'}]}>
                    {data.post}
                </Text>
                <Spacer  spacing={.05}/>

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
                <Spacer  spacing={.025}/>



            </Animated.View>)
    }


}
