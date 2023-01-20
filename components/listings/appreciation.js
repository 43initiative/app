import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare, fixedShape} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import {Ionicons} from "@expo/vector-icons";
import LiveButton from "../buttons/liveButton";


export default class Appreciation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        let data = this.props.data
        return (
            <Animated.View style={[flexing.startColumn,{width:'90%',marginLeft:'5%',backgroundColor:'ghostwhite',borderRadius:20,marginTop:'5%'}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>

                    <View style={[flexing.rowStart,{width:'80%'}]}>
                        <TouchableOpacity style={[createCircle(.05,1,'black')]}>
                            <Image source={{uri:'https://scontent.fewr1-6.fna.fbcdn.net/v/t39.30808-6/308583490_10221158791344323_5099317024454302786_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g6kei8gL3ZUAX9_PRoQ&_nc_ht=scontent.fewr1-6.fna&oh=00_AfAk0hhGa3biiDEjEEozwyTVSrGI3t2ojRnKuYE9oVxscA&oe=63C62FC2'}} resizeMode={'contain'} style={[createCircle(.05,0,'black')]}/>

                        </TouchableOpacity>
                        <Spacer xAxis={true} spacing={.025}/>

                        <TouchableOpacity style={[flexing.startColumn]}>
                            <Text style={[{fontSize:15,fontWeight:'500'}]}>{data.userName}</Text>
                            <View style={[flexing.rowStart]}>
                                <Text style={[{fontSize:11,color:'gray'}]}>{data.timestamp}</Text>
                                <Spacer xAxis={true} spacing={.0125}/>
                                <Ionicons name={'ios-lock-closed'} size={15} color={'gray'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Spacer xAxis={true} spacing={.095}/>

                    <TouchableOpacity style={[]}>
                        <Ionicons name={'ios-trash'} size={22.5} color={'firebrick'}/>

                    </TouchableOpacity>
                </View>

                <Text style={[{width:'95%',marginLeft:'2.5%',marginTop:'5%'}]}>
                    {data.post}
                </Text>
                <Spacer spacing={.025}/>


                {data.imgIncluded ?  <View style={[flexing.centerColumn,{width:'100%'}]}>
                                        <Image source={{uri:data.img}} resizeMode={'cover'} style={[{width:'100%',height:250}]}/>

                </View> : <></>}
                <Spacer spacing={.025}/>
            </Animated.View>
        )
    }


}
