import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {getUserActivity} from "../../firebase/fireStarter";


export default class UserActivity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
        this.getActivity()
    }

    getActivity = async () => {
        let data = await getUserActivity();
        console.log(data)
    }

    render() {
        return (
            <Animated.View style={[]}>
<Text>Activity</Text>
            </Animated.View>
        )
    }


}
