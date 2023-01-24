import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, ScrollView, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, fixedShape} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import Pif from "../../components/listings/pif";
import FollowerList from "../../components/listings/followerList";
import FollowingList from "../../components/listings/followingList";


export default class PublicProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPif:true
        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        console.log(data)
    }

    returnHasPifs = () => {
        if(!this.state.hasPif) {
            return(
                <View style={[{width:'100%',backgroundColor:'transparent'},flexing.centerColumn,{height:'25%'}]}>
                    <Ionicons name={'ios-documents-outline'} size={40} color={'lightslategray'}/>
                    <Spacer spacing={.025}/>
                    <Text style={[{color:'lightslategray',fontSize:15}]}>This user has not posted any PIFS yet.</Text>
                </View>
            )
        } else {
            return(

                <View style={[flexing.startColumn, {width: '100%'}]}>
                    <Spacer spacing={.025}/>

                    <Pif/>

                </View>


            )
        }


    }

    returnProfilePic = (data) => {
        return(
            <Image resizeMode={'cover'} style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]} source={{uri:data.img}}/>
        )
    }

    returnInitials = (data) => {
        return(
            <Text style={[{color:'black',fontSize:50,opacity:.7}]}>{data.initials}</Text>
        )
    }

    render() {
        let data = this.props.route.params;
        return (
            <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={[{position:'absolute',width:'20%',zIndex:2,marginTop:'12.5%',marginLeft:'87.5%'},flexing.startColumn,{height:'25%'}]}>
                    <Ionicons name={'ios-close-circle'} size={30} color={'black'}/>
                </TouchableOpacity>
            <ScrollView style={{width:'100%'}}>

            <Animated.View style={[{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'#ffffff'}]}>


                <View style={[{position:'absolute',top:0,left:0,width:'100%',height:'17.5%',backgroundColor:'#e3e3e3'}]}>
                {/*<Image source={require('../../assets/img/welcomeimg.png')} style={{width:'100%',height:'75%',marginTop:'5%',position:'absolute'}} resizeMode={'contain'}/>*/}

            </View>

                <View style={[{width:'100%',marginLeft:'0%',marginTop:'25%',backgroundColor:'transparent'},flexing.centerColumn]}>

                    <View style={[createCircle(.1625,5,'white')]}>
                        {data.imgProvided ? this.returnProfilePic(data) : this.returnInitials(data)}
                    </View>
                    <Spacer spacing={.0125}/>

                    <Text style={[{fontSize:20}]}>@{data.displayName}</Text>
                    <Spacer spacing={.025}/>


                    <Text style={[{fontSize:13,color:'gray',width:'85%',textAlign:'center'}]}>
                        {data.aboutMe}
                    </Text>
                    <Spacer spacing={.025}/>
                    <View style={[flexing.rowAround,{width:'85%'}]}>
                        <View style={[flexing.centerColumn, {width: '30%'}]}>
                            <Text style={[{color:'slategrey',fontSize:13,fontWeight:'bold'}]}>Location</Text>
                            <Spacer spacing={.0125}/>
                            <Text style={[{fontSize:14,color:'gray'}]}>New York</Text>
                        </View>
                        <View style={[flexing.centerColumn, {width: '30%'}]}>
                            <Text style={[{color:'slategrey',fontSize:13,fontWeight:'bold'}]}>Pif Score</Text>
                            <Spacer spacing={.0125}/>

                            <Text style={[{fontSize:14,color:'gray'}]}>350</Text>
                        </View>
                        <View style={[flexing.centerColumn, {width: '30%'}]}>
                            <Text style={[{color:'slategrey',fontSize:13,fontWeight:'bold'}]}>Joined</Text>
                            <Spacer spacing={.0125}/>

                            <Text style={[{fontSize:14,color:'gray'}]}>Dec 2022</Text>
                        </View>
                    </View>
                    <Spacer spacing={.025}/>

                    <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>

                    <Spacer spacing={.025}/>

                    <FollowerList isSelf={data.isSelf} userUid={data.userUid} navigation={this.props.navigation} route={this.props.route}/>
                    <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>

                    <FollowingList isSelf={data.isSelf} userUid={data.userUid} navigation={this.props.navigation} route={this.props.route}/>

                    {/*<View style={[flexing.rowBetween,{width:'90%'}]}>*/}
                    {/*    <Text style={[{fontSize:13,color:'#101010',textAlign:'center'}]}>*/}
                    {/*        10 PIFS*/}
                    {/*    </Text>*/}

                    {/*    <Text style={[{fontSize:13,color:'#101010',textAlign:'center'}]}>*/}
                    {/*        10 Pifs*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                </View>
                <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>

                <View style={{width:'90%',marginLeft:'5%',marginTop:'5%'}}>
                    <Text style={[{fontSize:15,fontWeight:'500'}]}>
                        {data.isSelf ? 'Your Deeds' : 'Their Deeds'}
                    </Text>

                    {this.returnHasPifs()}

                </View>

            </Animated.View>
<Spacer spacing={.7}/>

            </ScrollView>
            </View>
        )
    }


}
