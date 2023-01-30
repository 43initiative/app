import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import InitialOrPic from "../buttons/initialOrPic";
import Spacer from "../../design/spacer";
import {getUserProfile} from "../../firebase/fireStarter";
import {convertTimeStamp} from "../../helperFuncs/dateTime";
import {Ionicons} from "@expo/vector-icons";
import {createSquare, fixedShape} from "../../styles/globals/shapes";
import LiveButton from "../buttons/liveButton";
import FastImage from "react-native-fast-image";

export default class CommentPif extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        let data = this.props.data;

        return (
            <Animated.View style={[flexing.startColumn,{width:'100%',backgroundColor:'ghostwhite',marginTop:'5%'}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>


                    <Spacer xAxis={true} spacing={.095}/>


                </View>

                <Text style={[{width:'95%',marginLeft:'2.5%',marginTop:'5%'}]}>
                    {data.post}
                </Text>
                <Spacer  spacing={.05}/>

                {data.imgProvided

                    ?
                    <View style={[flexing.centerColumn,{width:'100%'}]}>

                        <FastImage
                            style={[{width:'100%',height:250}]}
                            source={{
                                uri: data.img,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    : <></>
                }



            </Animated.View>)
    }


}
