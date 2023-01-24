import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView
} from 'react-native';
import dimensions, {flexing} from "../../styles/dimensions/dims";
import {getFollowers} from "../../firebase/fireStarter";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import InitialOrPic from "../buttons/initialOrPic";


export default class FollowerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            followerList:[]
        }

    }

    componentDidMount() {
        this.retrieveFollowers()
    }

    retrieveFollowers = async () => {
        let fetchFollowers = await getFollowers(this.props.isSelf,this.props.userUid)
        if(fetchFollowers.passed) {
            this.setState({followerList:fetchFollowers.data})
        }
    }

    returnHasFollowers = () => {
        let sentence = this.props.isSelf ? 'You' : 'They'
        if(this.state.followerList.length === 0) {
            return this.returnEmptyList(`${sentence} currently have no followers.`)

        } else {
            return this.returnFollowerList()

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

    returnFollowerList = () => {
        return(<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={[{width:'100%',paddingLeft:'5%',marginTop:'5%'}]}>
            {this.state.followerList.map((val)=>{
                return(
                    <View style={[{width:dimensions.dimensions.returnWidth(.2),marginTop:'5%'},flexing.centerColumn]}>
                        <InitialOrPic circleRadius={.0625} navigation={this.props.navigation} route={this.props.route} initials={val.initials} imgProvided={val.imgProvided} img={val.img} userUid={val.id}/>
                        <Spacer spacing={.0125}/>
                        <Text style={{width:'100%'}} numberOfLines={1}>{val.displayName}</Text>
                    </View>
                )
            })}
        </ScrollView>)
    }

    render() {
        return (
            <View style={[flexing.startColumn,{width:'100%',marginTop:'5%',marginLeft:'0%'}]}>
                <Text style={[{fontSize:15,fontWeight:'500',paddingLeft:'5%'}]}>Followers</Text>
                {this.returnHasFollowers()}
            </View>
        )
    }


}
