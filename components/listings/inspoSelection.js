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
import RoundedButton from "../buttons/roundedButton";


export default class InspoSelection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            currentLikes:0,
            savedCount:0,
            selected:false
        }

    }

    componentDidMount() {
        let data = this.props.pifData;
        this.setState({currentLikes:data.likedList.length,savedCount:data.savedList.length})
    }




    render() {
        let pifData = this.props.pifData;

        return (
            <Animated.View style={[flexing.startColumn,{width:'90%',marginLeft:'5%',backgroundColor:'ghostwhite',marginTop:'5%',borderRadius:20}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>

                    <View style={[flexing.rowStart,{width:'70%',borderWidth:0,borderColor:'red'}]}>

                        <InitialOrPic circleRadius={.05} initials={pifData.userInitials} route={this.props.route} navigation={this.props.navigation} userUid={pifData.userUid} imgProvided={pifData.userImgProvided} img={pifData.userImg}/>

                        <Spacer xAxis={true} spacing={.025}/>

                        <TouchableOpacity onPress={()=>{
                            getUserProfile(this.props.navigation,this.props.route,false,pifData.userUid)

                        }} style={[flexing.startColumn]}>
                            <Text style={[{fontSize:15,fontWeight:'500'}]}>{pifData.userDisplayName}</Text>
                            <View style={[flexing.rowStart]}>
                                <Text style={[{fontSize:11,color:'gray'}]}>{convertTimeStamp(pifData.timestamp)}</Text>
                                <Spacer xAxis={true} spacing={.0125}/>
                                <Ionicons name={'ios-globe'} size={15} color={'gray'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Spacer xAxis={true} spacing={.00}/>

                    <TouchableOpacity style={[{borderColor:'blue',width:'25%',height:Dimensions.get('window').height * .04},flexing.centerColumn]}>
                        {this.props.selectedId === (this.props.isNomination ? pifData.id : pifData.postId) ?
                            <RoundedButton pressed={()=>{this.props.unselected()}} doOutline={true} bgColor={'#3EB489'} textStyles={[{color:'#3EB489',fontSize:10}]} text={'Unselect'} style={[{height:'80%',width:'90%',borderWidth:2,borderColor:'#3EB489'}]}/>
                            :
                            <RoundedButton pressed={()=>{this.props.selected()}} doOutline={false} bgColor={'#3EB489'} textStyles={[{color:'white',fontSize:12}]} text={'Select'} style={[{height:'80%',width:'90%'}]}/>

                        }

                    </TouchableOpacity>
                </View>

                <Text style={[{width:'95%',marginLeft:'2.5%',marginTop:'5%'}]}>
                    {pifData.post}
                </Text>
                <Spacer  spacing={.025}/>

                {pifData.imgProvided

                    ?
                    <View style={[flexing.centerColumn,{width:'100%'}]}>
                        <FastImage
                            style={[{width:'100%',height:250}]}
                            source={{
                                uri: pifData.img,
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
                    <View style={[flexing.rowStart,{width:'30%'}]}>
                        <Ionicons name={'ios-heart-circle'} color={'red'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>{pifData.likedList.length}</Text>
                    </View>

                </View>
                <Spacer  spacing={.025}/>
                {this.props.isNomination ?
                    <View style={[flexing.startColumn,{width:'50%',marginLeft:'5%'}]}>
                        <Text style={{color:'black',fontWeight:'500',fontSize:17}}>Nomination Message:</Text>
                        <Spacer  spacing={.0125}/>

                        <Text style={{color:'black',fontSize:15}}>"...{this.props.nominationMsg}..."</Text>
                    </View>
                    :
                <></>
                }
                <Spacer  spacing={.0325}/>

            </Animated.View>
        )
    }


}
