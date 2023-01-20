import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, SafeAreaView, ScrollView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import {dimensions} from '../../styles/dimensions/dims'
import NotificationListing from "../../components/listings/notification";
import Spacer from "../../design/spacer";

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <SafeAreaView style={[{backgroundColor:'white'}]}>
<Spacer spacing={.1}/>
                <ScrollView>
                    <Text style={[{fontWeight:'bold',marginBottom:'5%',marginLeft:'2.5%',fontSize:17}]}>New Notifications</Text>
                    <View style={[{width:dimensions.returnWidth(1),height:dimensions.returnHeight(1),backgroundColor:'white'}]}>
                       <NotificationListing/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }


}
