import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView
} from 'react-native';
import dimensions, {flexing} from "../../styles/dimensions/dims";
import {getFollowing} from "../../firebase/fireStarter";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import InitialOrPic from "../buttons/initialOrPic";


export default class FollowingList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            followingList:[]
        }

    }

    componentDidMount() {
        this.retrieveFollowing()
    }

    retrieveFollowing = async () => {
        let fetchFollowers = await getFollowing(this.props.isSelf,this.props.userUid)
        if(fetchFollowers.passed) {

            this.setState({followingList:fetchFollowers.data},()=>{
                console.log(this.state.followingList,'list here')
            })
        }
    }

    returnHasFollowers = () => {
        let sentence = this.props.isSelf ? 'You' : 'They'
        if(this.state.followingList.length === 0) {
            return this.returnEmptyList(`${sentence} are not following anyone.`)

        } else {
            return this.returnFollowingList()

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

    returnFollowingList = () => {
        return(<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={[{width:'100%',paddingLeft:'5%',marginTop:'5%'}]}>
            {this.state.followingList.map((val)=>{
                return(
                    <View style={[{width:dimensions.dimensions.returnWidth(.2),marginTop:'5%'},flexing.centerColumn]}>
                    <InitialOrPic circleRadius={.0625} navigation={this.props.navigation} route={this.props.route} initials={val.initials} imgProvided={val.imgProvided} img={val.img} userUid={val.id}/>
                        <Spacer spacing={.0125}/>
                        <Text style={{width:'90%',textAlign:'center'}} numberOfLines={1}>{val.displayName}</Text>
                    </View>
                )
                        })}

            <Spacer spacing={.05} xAxis/>
        </ScrollView>)
    }

    render() {
        return (
            <View style={[flexing.startColumn,{width:'100%',marginTop:'5%',marginLeft:'0%'}]}>
                <View style={[flexing.rowBetween,{width:'90%'}]}>
                    <Text style={[{fontSize:15,fontWeight:'500',paddingLeft:'5%'}]}>Following ({this.state.followingList.length})</Text>
                    <TouchableOpacity>
                        <Text  style={[{textDecorationLine:'underline'}]}>See All</Text>
                    </TouchableOpacity>
                </View>
                {this.returnHasFollowers()}
            </View>
        )
    }


}
