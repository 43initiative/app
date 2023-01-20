import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";


export default class Faq extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            faq:[
                {question:'Why must I post images with only 43 on them?', answer:'The 43 Initiative is a non-profit organization, focused on creating a movement, the 43 image must become ubiquitous in order to expedite the growth of this movement.'}
            ]
        }

    }

    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <View style={[{position:'absolute',width:'90%',marginTop:'2.5%',marginLeft:'5%'}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={[{width:'100%',marginTop:'15%'}]}>

                <View style={[{width:'90%',marginLeft:'5%'}]}>
                    <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                        FAQ
                    </Text>

                    <Text style={[{color:'black',marginTop:'2.5%',fontSize:15}]}>
                        Check out the answers to some of the most frequent questions we get.
                    </Text>
                </View>
                    {this.state.faq.map((val)=>(
                        <View style={[flexing.startColumn,{width:'90%',marginLeft:'5%',marginTop:'5%'}]}>
                            <Text style={[{fontSize:17,width:'75%',fontWeight:'bold',color:'black'}]}>{val.question}</Text>
                            <Text style={[{fontSize:15,color:'black',marginTop:'2.5%'}]}>{val.answer}</Text>
                        </View>
                    ))}

                </ScrollView>
            </Animated.View>
        )
    }


}
