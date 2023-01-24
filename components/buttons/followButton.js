import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import dimensions, {flexing} from "../../styles/dimensions/dims";


export default class FollowButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            following:false
        }

    }

    componentDidMount() {

    }


    doFollowAction = async () => {
        if(this.state.following) {
            this.setState({following:false})
        } else {
            this.setState({following:true})

        }
    console.log(this.props.userUid)
    }

    render() {
        let following = {backgroundColor:'firebrick'};
        let notFollow= {backgroundColor: 'white'}
        let condition = this.props.isFollowing;
        return (
            <TouchableOpacity
                onPress={()=>{this.props.pressed(this.props.isFollowing ? 'unfollow' : 'follow')}}
                style={[flexing.centerColumn,
                {borderColor:'firebrick',borderWidth:1.5,borderRadius:10,width:dimensions.dimensions.returnWidth(.2),height:dimensions.dimensions.returnHeight(.0375)},condition ?
                    following:
                    notFollow]}>
                {condition ?
                    <Text style={[{color:'white'}]}>Unfollow</Text>
 :
                    <Text style={[{color:'firebrick'}]}>Follow</Text>

                }

            </TouchableOpacity>
        )
    }


}
