import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, RefreshControl, FlatList, ScrollView
} from 'react-native';
import MyPif from "./myPif";
import {
    returnFollowerList,
    returnUserFollowingList,
    returnUserLikedList,
    returnUserSavedList, updateLikedList, updateSavedList
} from "../../firebase/fireStarter";
import Pif from "./pif";


export default class PifListSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {deeds:[],likedList:[],savedList:[],refreshing:false,orderBy:'newest',filterBy:'',following:[],followers:[]}

    }

    componentDidMount() {
            this.setState({deeds:this.props.data})
        console.log(this.props,'here look for deeds')
        this.getAllDeeds();
        this.getFollowStats();
    }








    getFollowStats = async () => {
        let followers = await returnFollowerList();
        let following = await returnUserFollowingList();
        this.setState({following,followers});
        console.log(this.state,'yo')
        this.setState({refreshing:false})

    }




    getAllDeeds = async () => {
        let likedList = await returnUserLikedList();
        let savedList = await returnUserSavedList();


            this.setState({savedList,likedList,refreshing:false})

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
    render() {
        let DATA = this.props.data;
        return (
            <View
                contentContainerStyle={{width:'100%',marginLeft:'0%',paddingBottom:'25%'}}>
                {this.state.deeds.map((item,index)=>(
                    <Pif
                        ableToLoadComments={true}
                        like={()=>{this.likePost(item.postId,index)}} unlike={()=>{this.unlikePost(item.postId,index)}}
                        save={()=>{this.savePost(item.postId,index)}} unsave={()=>{this.unsavePost(item.postId,index)}}
                        isSaved={this.state.savedList.indexOf(item.postId) !== -1}  isLiked={this.state.likedList.indexOf(item.postId) !== -1}  route={this.props.route} navigation={this.props.navigation} data={item} userUid={item.userUid}/>

                ))}
            </View>

        )
    }


}
