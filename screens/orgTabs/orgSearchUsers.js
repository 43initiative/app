import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, TextInput, FlatList, SafeAreaView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import {updateOrgFollowingList, returnOrgFollowingList, getAllUsers} from "../../firebase/fireStarter";
import Spacer from "../../design/spacer";
import UserTruncated from "../../components/listings/userTruncated";


export default class OrgSearchUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list:[],
            searchField:'',
            followingList:[]
        }

    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        let users = await getAllUsers();
        //this is retreived from store
        let followingList = await returnOrgFollowingList();
        console.log(followingList,'followList')
        this.setState({list:users.data,followingList});

    }

    doFollowAction = async (action,userUid) => {
        console.log(action,userUid);
        let followingList
        if(action === 'follow') {
            followingList = this.state.followingList
            followingList.push(userUid);
        } else {
            followingList = this.state.followingList;
            let index = followingList.indexOf(userUid)
            followingList.splice(index,1)
        }

        this.setState({followingList},async()=>{
            let updateFollow = await updateOrgFollowingList(this.state.followingList)
            if(updateFollow.passed) {
                console.log('good')
            } else {
                console.log('bad')
            }

        })


    }

    render() {
        const DATA = this.state.list.filter((val)=>{
            return val.displayName && val.displayName.includes(this.state.searchField)
        });
        return (
            <SafeAreaView>
                <Animated.View style={[{backgroundColor:'white',height:'100%',width:'100%',position:'relative'}]}>
                    <View style={[{top:0,left:0,width:'90%',marginLeft:'5%',height:'10%',backgroundColor:'white'},flexing.rowBetween]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                            <Ionicons name={'ios-arrow-back-outline'} size={25} color={'black'}/>
                        </TouchableOpacity>
                        <TextInput
                            onChangeText={(val)=>{this.setState({searchField:val})}}
                            value={this.state.searchField}
                            placeholder={'Search Users and Organizations'}
                            style={[{width:'90%',paddingLeft:'5%',backgroundColor:'#e3e3e3',borderRadius:20,height:'60%'}]}
                        />
                    </View>
                    <Spacer spacing={.025}/>

                    <FlatList
                        contentContainerStyle={{width:'90%',marginLeft:'5%'}}
                        data={DATA}
                        renderItem={({item}) => (
                            <UserTruncated pressed={(action)=>{this.doFollowAction(action,item.userUid)}} isFollowing={this.state.followingList.indexOf(item.userUid) !== -1} route={this.props.route} navigation={this.props.navigation} displayName={item.displayName} userUid={item.userUid} img={item.img} imgProvided={item.imgProvided} initials={item.initials}/>


                        )}
                        keyExtractor={item => item.id}
                    />

                    {/*{this.state.list.map((val)=>(*/}
                    {/*    <View>*/}
                    {/*        <Text>{val.displayName}</Text>*/}
                    {/*    </View>*/}
                    {/*))}*/}
                </Animated.View>
            </SafeAreaView>
        )
    }


}
