import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    RefreshControl, SafeAreaView
} from 'react-native';
import {getAllPifs, initialize, addPif,getSpecificPif,getAllUsers} from '../../firebase/fireInit'
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare} from '../../styles/globals/shapes'
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import Pif from "../../components/listings/pif";
import Header from "../../components/headers/header";
import FilterButton from "../../components/buttons/filterButton";
import {getInspiration, updateSavedList, returnUserSavedList,returnUserLikedList, updateLikedList, getAllDeeds} from "../../firebase/fireStarter";
import UserTruncated from "../../components/listings/userTruncated";
import {connect} from "react-redux";
import {waitACertainTime} from "../../helperFuncs/timers/wait";
import {CollapsibleHeaderFlatList} from "react-native-collapsible-header-views";

export default class Inspo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {deeds:[],likedList:[],savedList:[],refreshing:true}

    }

    componentDidMount() {
        this.getAllDeeds()
    }





    getAllDeeds = async () => {
        let response = await getInspiration();
        let likedList = await returnUserLikedList();
        let savedList = await returnUserSavedList();

        if(response.passed) {
            console.log(response.data,'this is data')
            this.setState({deeds:response.data,savedList,likedList,refreshing:false})
        }
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
        let DATA = this.state.deeds;
        return (
            <SafeAreaView>
                <Animated.View style={[{marginTop:35,height:'100%',width:'100%',background:'white'}]}>
                    <Spacer spacing={.05}/>

                    {/*<TouchableOpacity onPress={()=>{this.props.navigation.navigate('RefineFeed')}} style={[{width:'90%',marginLeft:'5%',height:'6.25%',backgroundColor:'#e3e3e3',paddingLeft:'5%',borderRadius:30},flexing.centerColumn,{alignItems:'flex-start'}]}>*/}
                    {/*   <View style={[flexing.rowStart]}>*/}
                    {/*       <Ionicons name={'ios-list'} color={'darkslategray'} size={20}/>*/}
                    {/*       <Spacer xAxis spacing={.025}/>*/}
                    {/*       <Text style={[{color:'darkslategray'}]}>Refine Your Feed</Text>*/}
                    {/*   </View>*/}

                    {/*</TouchableOpacity>*/}
                    {/*<Spacer spacing={.025}/>*/}

                    {/*<View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%'}]}>*/}
                    {/*    <FilterButton active text={'Near Me'} icon={'ios-navigate'}/>*/}
                    {/*    <FilterButton text={'Newest'} icon={'ios-timer'}/>*/}
                    {/*    <FilterButton text={'Popular'} icon={'ios-bar-chart'}/>*/}
                    {/*    <FilterButton text={'Viral'} icon={'ios-git-branch'}/>*/}
                    {/*</View>*/}

                    <FlatList
                        refreshControl={<RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={this.state.refreshing}
                            onRefresh={()=>{
                                this.getAllDeeds();
                            }} />}
                        contentContainerStyle={{width:'100%',marginLeft:'0%',paddingBottom:'25%'}}
                        data={DATA}
                        renderItem={({item,index}) => (
                            <Pif
                                ableToLoadComments={true}
                                like={()=>{this.likePost(item.postId,index)}} unlike={()=>{this.unlikePost(item.postId,index)}}
                                 save={()=>{this.savePost(item.postId,index)}} unsave={()=>{this.unsavePost(item.postId,index)}}
                                 isSaved={this.state.savedList.indexOf(item.postId) !== -1}  isLiked={this.state.likedList.indexOf(item.postId) !== -1}  route={this.props.route} navigation={this.props.navigation} data={item} userUid={item.userUid}/>
                        )}
                        keyExtractor={item => item.id}
                    />






                </Animated.View>
            </SafeAreaView>
        )
    }


}
//
// const mapStateToProps = (state) => {
//     return {
//         savedList:state.userData.publicData.savedList,
//         likedList:state.userData.publicData.likedList,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     }
// }
//
//
// export default connect(mapStateToProps,mapDispatchToProps)(Feed)


