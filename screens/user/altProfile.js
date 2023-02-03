import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Image,
    Dimensions,
    RefreshControl
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import dimensions, {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare, fixedShape} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import Circle from "../../designComps/circle";
import {storeControllers} from "../../reducers/controllers";
import {getUserProfile, signOutUser} from "../../firebase/fireStarter";
import FollowerList from "../../components/listings/followerList";
import FollowingList from "../../components/listings/followingList";


export default class AltProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName:'',
            userImg:'',
            followerist:[],
            followingList:[],
            organizations:[
                {type:'button',text:'Add an organization'}
            ],
            detailButtons: [
                {icon:'ios-image',text:'Change Profile Pic',nav:false,useFunction:this.changeProfilePic},
                {icon:'ios-document',text:'Change Your Bio',nav:false,useFunction:this.changeAboutMe},
                {icon:'ios-list',text:'View Your Activity',nav:'UserActivityScreen'},
                {icon:'ios-qr-code',text:'My QR Code',nav:'EditImg'},
                {icon:'ios-settings',text:'Settings',nav:'Settings'},
               // {icon:'ios-log-out',text:'Log Out',nav:this.signOut},
            ],
            aboutMe:'',
            img:'',
            imgProvided:false,
            initials:'',
            refreshing:false
        }

    }
    signOut = async () => {
        let response = await signOutUser();
        console.log(response)
        if(response.passed) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name:'SplashScreen'}],
            });
        } else {
            alert('sign out failed')
        }
    }


    componentDidMount() {
        this.populateUserData()
    }

    returnProfilePic = () => {
        return(
                <Image resizeMode={'cover'} style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]} source={{uri:this.state.img}}/>
        )
    }

    returnInitials = () => {
        return(
                <Text style={[{color:'black',fontSize:50,opacity:.7}]}>{this.state.initials}</Text>
        )
    }

    populateUserData = async () => {
        let data = storeControllers.storeData().userData.publicData;
        console.log(data.userUid,'look for uid')
        let {aboutMe,img,displayName,imgProvided,initials,userUid} = data;
        this.setState({aboutMe,img,displayName,imgProvided,initials,userUid,refreshing:false})
    }

    updateTheState =  (info) => {
        console.log('ran')
        this.populateUserData();
        this.followerList.retrieveFollowers();
        this.followingList.retrieveFollowing();
    }

    changeProfilePic = async () => {
        this.props.navigation.navigate('EditImg',{
            imgProvided:this.state.imgProvided,
            img:this.state.img,
            initials:this.state.initials,
            updateData:this.updateTheState
        })
    }

    changeAboutMe = async () => {
        this.props.navigation.navigate('EditBio',{
            bio:this.state.aboutMe,
            updateData:this.updateTheState
        })
    }


    returnHasFollowers = () => {
        if(this.state.followerist.length === 0) {
            return this.returnEmptyList('You currently have no followers.')

        } else {
            return this.returnEmptyList('You currently have no followers.')

        }
    }

    returnHasFollowing= () => {
        if(this.state.followingList.length === 0) {
            return this.returnEmptyList('You currently are not following anyone')

        } else {
        }
    }

    returnEmptyList = (sentence) => {
        return(
            <View style={[{width:'100%',marginTop:'5%'},flexing.centerColumn]}>
                <View style={[flexing.rowStart]}>
                    <Ionicons name={'ios-people'} size={25} color={'darkgray'}/>
                    <Spacer spacing={.025} xAxis/>
                    <Text style={[{fontSize:15,color:'darkgray'}]}>{sentence}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%',marginTop:'15%'}]}>

                <View style={[{marginTop:'15%',width:'100%',height:'100%'}]}>
                    <ScrollView
                        refreshControl={<RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={this.state.refreshing}
                            onRefresh={()=>{
                                this.updateTheState();
                            }}
                            />}
                        style={[{width:'100%'}]}>
                        <TouchableOpacity onPress={()=>{
                            console.log(this.state.userUid)
                            getUserProfile(this.props.navigation,this.props.route,true,this.state.userUid)
                        }} style={[flexing.rowStart,{width:'90%',marginLeft:'5%'}]}>
                            <View style={[createCircle(.05,0,'black')]}>
                                {this.state.imgProvided ? this.returnProfilePic() : this.returnInitials()}
                            </View>
                            <Spacer spacing={.025} xAxis/>
                            <View style={[flexing.startColumn]}>
                                <Text style={[{fontSize:18,fontWeight:'bold'}]}>{this.state.displayName}</Text>
                                <Text style={[{fontSize:12}]}>View Public Profile</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>

                        <View style={[flexing.startColumn,{width:'90%',marginTop:'5%',marginLeft:'5%'}]}>
                            <Text style={[{fontSize:15,fontWeight:'500'}]}>Your Bio</Text>
                            <Text style={[{fontSize:15,fontWeight:'300',marginTop:'2.5%'}]}>{this.state.aboutMe}</Text>

                        </View>

                        <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>

                        <FollowerList  ref={(ref)=>{this.followerList = ref;}} displayName={this.state.displayName} userUid={this.state.userUid}  navigation={this.props.navigation} route={this.props.route} isSelf={true}/>

                        <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>
                        <FollowingList  ref={(ref)=>{this.followingList = ref;}} refreshing={this.state.refreshing} displayName={this.state.displayName} userUid={this.state.userUid} navigation={this.props.navigation} route={this.props.route} isSelf={true}/>

                        <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>
                        {/*<View style={[flexing.startColumn,{width:'90%',marginTop:'5%',marginLeft:'5%'}]}>*/}
                        {/*    <Text style={[{fontSize:15,fontWeight:'500'}]}>Your Organizations</Text>*/}
                        {/*    <View style={[flexing.rowStart,{width:'100%',borderColor:'red',borderWidth:0}]}>*/}
                        {/*    {this.state.organizations.map((val)=>(*/}
                        {/*        <View style={[flexing.centerColumn,{marginTop:'5%',borderWidth:0,borderColor:'blue',width:'20%'}]}>*/}
                        {/*            <TouchableOpacity style={[createCircle(.0625,2,'black'),{backgroundColor:'black'}]}>*/}
                        {/*                {val.type === 'button' ?*/}
                        {/*                    <Ionicons name={'ios-add'} color={'white'} size={40}/> :*/}
                        {/*                    <Image source={require('../../assets/img/43v8.png')} resizeMode={'contain'} style={[createCircle(.05,0,'black')]}/>*/}

                        {/*                }*/}
                        {/*                    </TouchableOpacity>*/}
                        {/*            <Text numberOfLines={2} style={{width:'75%',marginTop:'5%',textAlign:'center'}}>{val.text}</Text>*/}
                        {/*        </View>*/}

                        {/*        ))}*/}
                        {/*    </View>*/}

                        {/*</View>*/}

                        <View style={[fixedShape.line,{marginTop:'5%',width:'90%',marginLeft:'5%'}]}></View>
                        <View style={[flexing.startColumn,{width:'90%',marginTop:'5%',marginLeft:'5%'}]}>
                            <Text style={[{fontSize:15,fontWeight:'500'}]}>Your Details</Text>

                            <View style={[flexing.rowAround,{flexWrap:'wrap',width:'100%'}]}>
                                {this.state.detailButtons.map((val)=>(
                                    <TouchableOpacity onPress={()=>{
                                        val.nav ? this.props.navigation.navigate(val.nav) : val.useFunction()
                                        }}
                                    style={[createSquare(.2,0,null,.5,1),{marginTop:'5%',padding:'2.5%',backgroundColor:'ghostwhite'},flexing.startColumn]}
                                    >
                                        <Ionicons name={val.icon} size={25} color={'gray'}/>
                                            <Text style={[{fontWeight:'bold',fontSize:13,marginTop:'5%'}]}>{val.text}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <Spacer spacing={.25}/>
                    </ScrollView>
                </View>
            </Animated.View>
        )
    }


}
