import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView, TextInput, SafeAreaView
} from 'react-native';
import PifListSection from "../../components/listings/pifListSection";
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";


export default class AllPifs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <SafeAreaView>
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <View style={[{top:0,left:0,width:'90%',marginLeft:'5%',backgroundColor:'white'},flexing.rowBetween]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name={'ios-arrow-back-outline'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{width:'100%',marginTop:'0%'}}>
                <PifListSection data={this.props.route.params.data} route={this.props.route} navigation={this.props.navigation}/>
                </ScrollView>
            </Animated.View>
            </SafeAreaView>
        )
    }


}
