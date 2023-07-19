import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, SafeAreaView, ScrollView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import {Ionicons} from "@expo/vector-icons";
import {storeControllers} from "../../reducers/controllers";
import Circle from "../../designComps/circle";


export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          aboutMe:'',
            img:'',
            displayName:'',
            imgProvided:false,
            initials:''
        }

    }

    componentDidMount() {
        this.populateUserData()
    }

    returnProfilePic = () => {
        return(
            <Circle backgroundColor={'#3EB489'} size={.2} borderRadius={100} borderColor={'lightgray'} borderWidth={8}>
                <Image resizeMode={'cover'} style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]} source={{uri:this.state.img}}/>
            </Circle>
        )
    }

    returnInitials = () => {
        return(
            <Circle backgroundColor={'#3EB489'} size={.2} borderRadius={100} borderColor={'lightgray'} borderWidth={8}>
                <Text style={[{color:'black',fontSize:50,opacity:.7}]}>{this.state.initials}</Text>
            </Circle>
        )
    }

    populateUserData = async () => {
        let data = storeControllers.storeData().userData.publicData;
        console.log(data.img)
        let {aboutMe,img,displayName,imgProvided,initials} = data;
        this.setState({aboutMe,img,displayName,imgProvided,initials})
    }

    updateTheState =  (info) => {
        this.populateUserData()
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

    render() {
        return (
            <SafeAreaView>
                <View style={[{width:'100%',marginLeft:'0%',paddingLeft:'5%',paddingRight:'5%',backgroundColor:'white'},flexing.rowBetween]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                    <View><Text style={[{fontSize:16,fontWeight:'bold'}]}>My Info</Text></View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-help-circle-outline'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>

            <Animated.View style={[flexing.startColumn, {backgroundColor:'white',width: '100%', height: '100%',alignItems:'center'}]}>
<Spacer spacing={.05}/>


                {this.state.imgProvided ? this.returnProfilePic() : this.returnInitials()}

                {/*<View  style={[createCircle(.2,0,'f'),{*/}
                {/*    backgroundColor:'transparent',shadowColor: "firebrick",*/}
                {/*    shadowOffset: {*/}
                {/*        width: 0,*/}
                {/*        height: 0,*/}
                {/*    },*/}
                {/*    position:'relative',*/}
                {/*    elevations:0,*/}
                {/*    shadowOpacity: 0.90,*/}
                {/*    shadowRadius: 9.35}]}>*/}
                {/*    <Image  style={[createCircle(.1625,0,'firebrick'),{position:'absolute',overflow:'hidden',borderRadius:100}]} source={{uri:this.state.img}} resizeMode={'cover'} />*/}
                {/*</View>*/}

                <Spacer spacing={.0125}/>


                <View style={[flexing.rowAround,{width:'90%'}]}>
                    <TouchableOpacity onPress={this.changeProfilePic} style={[flexing.centerColumn,{width:'30%'}]}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-image-outline'} size={25} color={'firebrick'}/>

                        <Text style={[{fontSize:12,color:'firebrick'}]}>Change  Pic</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.changeAboutMe} style={[flexing.centerColumn,{width:'30%'}]}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-create-outline'} size={25} color={'firebrick'}/>

                        <Text style={[{fontSize:12,color:'firebrick'}]}>Edit About Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PublicProfile')}} style={[flexing.centerColumn,{width:'30%'}]}>
                        <Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-eye-outline'} size={25} color={'firebrick'}/>

                        <Text style={[{fontSize:12,color:'firebrick'}]}>Public Profile</Text>
                    </TouchableOpacity>
                </View>
                <Spacer spacing={.025}/>


                <Text style={[{fontSize:25}]}>@{this.state.displayName}</Text>
                <Spacer spacing={.025}/>


                <Text style={[{fontSize:13,color:'gray',width:'85%',textAlign:'center'}]}>
                    {this.state.aboutMe}
                </Text>
                <Spacer spacing={.0375}/>


                <Image style={{width:'80%'}} resizeMode={'contain'} source={require('../../assets/img/redderqr.png')}/>
                <Spacer spacing={.0375}/>

                {/*<View style={[flexing.rowAround,{width:'85%'}]}>
                    <View style={[flexing.centerColumn, {width: '30%'}]}>
                        <Text style={[{color:'firebrick',fontSize:13,fontWeight:'bold'}]}>Location</Text>
                        <Spacer spacing={.0125}/>
                        <Text style={[{fontSize:14,color:'gray'}]}>New York</Text>
                    </View>
                    <View style={[flexing.centerColumn, {width: '30%'}]}>
                        <Text style={[{color:'firebrick',fontSize:13,fontWeight:'bold'}]}>Pif Score</Text>
                        <Spacer spacing={.0125}/>

                        <Text style={[{fontSize:14,color:'gray'}]}>350</Text>
                    </View>
                    <View style={[flexing.centerColumn, {width: '30%'}]}>
                        <Text style={[{color:'firebrick',fontSize:13,fontWeight:'bold'}]}>Joined</Text>
                        <Spacer spacing={.0125}/>

                        <Text style={[{fontSize:14,color:'gray'}]}>Dec 2022</Text>
                    </View>
                </View>*/}
                <Spacer spacing={.0375}/>

                {/*<View style={[{width:'90%',marginLeft:'5%'},createSquare(.1,2,'firebrick',1.1,4),{borderRadius:25},flexing.rowAround]}>*/}
                {/*<Ionicons style={[{borderColor:'black',borderWidth:0}]} name={'ios-pie-chart'} size={35} color={'firebrick'}/>*/}
                {/*    <View style={[flexing.startColumn,{width:'75%',height:'70%'}]}>*/}
                {/*        <View style={[flexing.rowBetween,{width:'100%'}]}>*/}
                {/*            <Text style={[{fontWeight:'500',fontSize:16.25,color:'#101010'}]}>Your Pif Score</Text>*/}
                {/*            <Text style={[{fontSize:12,textDecorationLine:'underline',color:'firebrick'}]}>Learn More</Text>*/}
                {/*        </View>*/}
                {/*        <Spacer spacing={.00525}/>*/}

                {/*        <Text style={[{color:'gray',fontSize:10}]}>*/}
                {/*            Your Pif score is calculated by how often you do good deeds, and how many subsequent good deeds they inspire.*/}
                {/*        </Text>*/}

                {/*    </View>*/}
                {/*</View>*/}

<Spacer spacing={.05}/>
                <View style={[flexing.startColumn,{width:'90%'}]}>
                {/*<View style={[flexing.rowStart,{marginTop:15,width:'100%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>*/}
                {/*    <Ionicons name={'ios-list-outline'} size={30} color={'black'}/>*/}
                {/*    <Spacer xAxis={true} spacing={.025}/>*/}
                {/*    <Text>User Activity</Text>*/}
                {/*</View>*/}

                {/*    <View style={[flexing.rowStart,{marginTop:15,width:'100%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>*/}
                {/*        <Ionicons name={'log-out-outline'} size={30} color={'black'}/>*/}
                {/*        <Spacer xAxis={true} spacing={.025}/>*/}
                {/*        <Text>Log Out</Text>*/}
                {/*    </View>*/}

                    {/*<View style={[flexing.rowStart,{marginTop:15,width:'100%',height:50,borderBottomWidth:.5,borderColor:'lightgray'}]}>*/}
                    {/*    <Ionicons name={'ios-trash-outline'} size={30} color={'black'}/>*/}
                    {/*    <Spacer xAxis={true} spacing={.025}/>*/}
                    {/*    <Text>Delete Account</Text>*/}
                    {/*</View>*/}
                </View>
                <Spacer spacing={.5}/>
                {/*{this.state.options.map((val)=>{*/}
                {/*    return (*/}
                {/*        <TouchableOpacity onPress={()=>{this.props.navigation.push(val)}}>*/}
                {/*            <Text>{val}</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    )*/}
                {/*})}*/}
            </Animated.View>
                </ScrollView>
            </SafeAreaView>
        )
    }


}
