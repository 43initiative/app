import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import Spacer from "../../design/spacer";
import InitialOrPic from "../buttons/initialOrPic";
import FollowButton from "../buttons/followButton";
import SelectionButton from "../buttons/selectionButton";


export default class UserNomination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
    }

    render() {
        return (
            <Animated.View style={[{width:'90%',marginLeft:'5%',marginTop:'5%'},flexing.rowBetween]}>
                <View style={[flexing.rowStart,{width:'50%'}]}>
                    <InitialOrPic circleRadius={.0625} route={this.props.route} navigation={this.props.navigation} imgProvided={this.props.imgProvided} img={this.props.img} initials={this.props.initials}/>
                    <Spacer xAxis spacing={.025}/>
                    <Text>{this.props.displayName}</Text>
                </View>

                <SelectionButton pressed={(action)=>{this.props.pressed(action)}} isSelected={this.props.isSelected}/>

            </Animated.View>
        )
    }


}
