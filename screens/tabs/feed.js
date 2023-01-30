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
import {returnUserFollowingList,returnFollowerList, updateSavedList, returnUserSavedList,returnUserLikedList, updateLikedList, getAllDeeds} from "../../firebase/fireStarter";
import UserTruncated from "../../components/listings/userTruncated";
import {connect} from "react-redux";
import {waitACertainTime} from "../../helperFuncs/timers/wait";
import {CollapsibleHeaderFlatList} from "react-native-collapsible-header-views";

  export default class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {deeds:[],likedList:[],savedList:[],refreshing:false,orderBy:'newest',filterBy:'inspired',following:[],followers:[]}

    }

    componentDidMount() {
        this.openOrgModal()
        this.setState({refreshing:true})
        this.getAllDeeds();
        this.getFollowStats();

    }


    openCreateOrg = async () => {
        this.props.navigation.goBack();
        console.log('s')
        this.props.navigation.push('CreateOrg')
    }

    openOrgCreationFlow = async () => {

    }


    openOrgModal = async () => {
        this.props.navigation.push('OrgModal',{
            openCreation:this.openCreateOrg
        })
    }

    getFollowStats = async () => {
        let followers = await returnFollowerList();
        let following = await returnUserFollowingList();
        this.setState({following,followers});
        console.log(this.state,'yo')
        this.setState({refreshing:false})

    }




    getAllDeeds = async () => {
        let response = await getAllDeeds();
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

      returnFilterBy =  (list) => {
        switch(this.state.filterBy) {
            case '': {
                return list
            }

            case 'inspired' : {
                return  this.state.deeds.filter((val)=>{
                    return val.isInspired
                })
            }

            case 'trending' : {
                return  this.state.deeds.filter((val)=>{
                    return val.inspirationList
                })
            }

            case 'following' : {
                return  this.state.deeds.filter((val)=>{
                    return this.state.following.indexOf(val.userUid) !== -1
                })
            }

            case 'followers' : {
                return  this.state.deeds.filter((val)=>{
                    return this.state.followers.indexOf(val.userUid) !== -1
                })
            }
        }
      }

      setFeed = (val) => {
        console.log(val)
        this.setState({orderBy:val},()=>{
            this.props.navigation.goBack()
        })
      }



      doFeedMenu = async () => {
        this.props.navigation.push('RefineFeed',{
            current:this.state.orderBy,
            setFeed:this.setFeed
        })
      }



      setFilter = (val) => {
          console.log(val)
          this.setState({filterBy:val},()=>{
              this.props.navigation.goBack()
          })
      }



      doFilterMenu = async () => {
          this.props.navigation.push('RefineFilter',{
              current:this.state.filterBy,
              setFilter:this.setFilter
          })
      }

    render() {
        let DATA;
        switch(this.state.orderBy) {
            case 'newest': {
                let arr  = this.state.deeds.sort((a,b)=>{
                    return b.timestamp - a.timestamp
                })

                DATA = this.returnFilterBy(arr);
                break;
            }

            case 'comments' : {
                let arr = this.state.deeds.sort((a,b)=>{
                    return b.commentList.length - a.commentList.length
                })

                DATA = this.returnFilterBy(arr)
                break;
            }

            case 'likes' : {
                let arr = this.state.deeds.sort((a,b)=>{
                    return b.likedList.length - a.likedList.length
                })
                DATA = this.returnFilterBy(arr)
                break;
            }


        }




        return (

            <View style={[{height:'100%',width:'100%',background:'white'}]}>
                <Spacer spacing={.1}/>

        <CollapsibleHeaderFlatList
            refreshControl={<RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.state.refreshing}
                enabled={true}
                progressViewOffset={Dimensions.get('window').height * .0}
                onRefresh={()=>{
                    this.getAllDeeds();
                }}/>}
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

            CollapsibleHeaderComponent={
                <View style={[flexing.rowBetween,{width:'95%'}]}>
                    <View style={[{width:'60%'},flexing.rowStart]}>
                        <TouchableOpacity onPress={()=>{this.doFeedMenu()}} style={[{width:'47.5%',marginLeft:'5%',borderWidth:1.5,borderColor:'#c7c7c7c',height:Dimensions.get('window').height * .05,backgroundColor:'white',paddingLeft:'5%',borderRadius:15},flexing.centerColumn,{alignItems:'flex-start'}]}>
                            <View style={[flexing.rowStart]}>
                                <Ionicons name={'ios-list'} color={'#c7c7c7c'} size={20}/>
                                <Spacer xAxis spacing={.0125}/>
                                <Text style={[{color:'#c7c7c7c'}]}>{this.state.orderBy}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{this.doFilterMenu()}} style={[{width:'47.5%',marginLeft:'5%',borderWidth:1.5,borderColor:'#c7c7c7c',height:Dimensions.get('window').height * .05,backgroundColor:'white',paddingLeft:'5%',borderRadius:15},flexing.centerColumn,{alignItems:'flex-start'}]}>
                            <View style={[flexing.rowStart]}>
                                <Ionicons name={'ios-filter'} color={'#c7c7c7c'} size={20}/>
                                <Spacer xAxis spacing={.0125}/>
                                <Text style={[{color:'#c7c7c7c'}]}>{this.state.filterBy === '' ? '-------' : this.state.filterBy}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity onPress={()=>{this.getAllDeeds()}} style={[{borderRadius:100,height:Dimensions.get('window').height * .05,width:Dimensions.get('window').height * .05,backgroundColor:'transparent'},flexing.centerColumn]}>
                       <Ionicons name={'ios-refresh-circle'} size={40} color={'#c7c7c7c'}/>

                    </TouchableOpacity>
                </View>
           } headerHeight={Dimensions.get('window').height * .125}/>
                {/*<FlatList*/}
                {/*    refreshControl={<RefreshControl*/}
                {/*        colors={["#9Bd35A", "#689F38"]}*/}
                {/*        refreshing={this.state.refreshing}*/}
                {/*        onRefresh={()=>{*/}
                {/*            this.getAllDeeds();*/}
                {/*        }} />}*/}
                {/*    contentContainerStyle={{width:'100%',marginLeft:'0%',paddingBottom:'25%'}}*/}
                {/*    data={DATA}*/}
                {/*    renderItem={({item,index}) => (*/}
                {/*        <Pif*/}
                {/*            ableToLoadComments={true}*/}
                {/*            like={()=>{this.likePost(item.postId,index)}} unlike={()=>{this.unlikePost(item.postId,index)}}*/}
                {/*             save={()=>{this.savePost(item.postId,index)}} unsave={()=>{this.unsavePost(item.postId,index)}}*/}
                {/*             isSaved={this.state.savedList.indexOf(item.postId) !== -1}  isLiked={this.state.likedList.indexOf(item.postId) !== -1}  route={this.props.route} navigation={this.props.navigation} data={item} userUid={item.userUid}/>*/}
                {/*    )}*/}
                {/*    keyExtractor={item => item.id}*/}
                {/*/>*/}






            </View>
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


