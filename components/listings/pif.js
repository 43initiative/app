import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare,fixedShape} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import {Ionicons} from "@expo/vector-icons";
import LiveButton from "../buttons/liveButton";


export default class Pif extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <Animated.View style={[flexing.startColumn,{width:'100%',backgroundColor:'ghostwhite',marginTop:'5%'}]}>
                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%',marginTop:'2.5%'}]}>

                    <View style={[flexing.rowStart,{width:'80%'}]}>
                        <TouchableOpacity style={[createCircle(.05,1,'black')]}>
                            <Image source={{uri:'https://scontent.fewr1-6.fna.fbcdn.net/v/t39.30808-6/308583490_10221158791344323_5099317024454302786_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g6kei8gL3ZUAX9_PRoQ&_nc_ht=scontent.fewr1-6.fna&oh=00_AfAk0hhGa3biiDEjEEozwyTVSrGI3t2ojRnKuYE9oVxscA&oe=63C62FC2'}} resizeMode={'contain'} style={[createCircle(.05,0,'black')]}/>

                        </TouchableOpacity>
                        <Spacer xAxis={true} spacing={.025}/>

                        <TouchableOpacity style={[flexing.startColumn]}>
                            <Text style={[{fontSize:15,fontWeight:'500'}]}>Joseph Mangi</Text>
                            <View style={[flexing.rowStart]}>
                                <Text style={[{fontSize:11,color:'gray'}]}>Dec 26 2022</Text>
                                <Spacer xAxis={true} spacing={.0125}/>
                                <Ionicons name={'ios-globe'} size={15} color={'gray'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Spacer xAxis={true} spacing={.095}/>

                    <View style={[createSquare(.035,1,'purple'),{backgroundColor:'purple'}]}>
                        <TouchableOpacity>
                        <Ionicons name={'ios-git-branch-outline'} color={'white'} size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[{width:'95%',marginLeft:'2.5%',marginTop:'5%'}]}>
                    I recently helped to clear some beach garbage with a few fine people, truly rewarding experience.
                </Text>
                <Spacer  spacing={.05}/>

                <View style={[flexing.centerColumn,{width:'100%'}]}>

                    <Image source={{uri:'http://www.goodnet.org/photos/620x0/29940_hd.jpg'}} resizeMode={'cover'} style={[{width:'100%',height:250}]}/>

                </View>
                <Spacer  spacing={.025}/>

                <View style={[flexing.rowStart,{width:'95%',marginLeft:'2.5%'}]}>
                    <TouchableOpacity style={[flexing.rowStart,{width:'30%'}]}>
                        <Ionicons name={'ios-heart-circle'} color={'red'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>100</Text>
                    </TouchableOpacity>

                    <View style={[flexing.rowEnd,{width:'70%'}]}>
                        <TouchableOpacity style={[flexing.rowStart]}>
                            <Text>100</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Comments</Text>
                        </TouchableOpacity>
                        <Spacer xAxis spacing={.05125}/>

                        <TouchableOpacity style={[flexing.rowStart]}>
                            <Text>5</Text>
                            <Spacer xAxis spacing={.005125}/>

                            <Text>Inspos</Text>
                        </TouchableOpacity>


                    </View>

                </View>
                <Spacer  spacing={.0125}/>
                <View style={[fixedShape.line,{width:'90%',marginLeft:'5%'}]}></View>
                <Spacer  spacing={.0125}/>

                <View style={[flexing.rowAround,{width:'95%',marginLeft:'2.5%'}]}>
                    <LiveButton
                    activeIcon={'ios-heart'}
                    activeColor={'red'}
                    inactiveIcon={'ios-heart-outline'}
                   />

                    <TouchableOpacity style={[flexing.rowStart]}>
                        <Ionicons name={'ios-chatbubble-outline'} color={'gray'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>Comment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[flexing.rowStart]}>
                        <Ionicons name={'ios-bookmark-outline'} color={'gray'} size={20}/>
                        <Spacer xAxis spacing={.0125}/>

                        <Text>Add To Inspo</Text>
                    </TouchableOpacity>

                </View>
                <Spacer  spacing={.025}/>

            </Animated.View>
        )
    }


}
