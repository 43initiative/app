import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView, Image
} from 'react-native';
import {getUserActivity} from "../../firebase/fireStarter";
import {Ionicons} from "@expo/vector-icons";
import {flexing} from "../../styles/dimensions/dims";
import Spacer from "../../design/spacer";
import {createCircle} from "../../styles/globals/shapes";
import {convertTimeStamp} from "../../helperFuncs/dateTime";


export default class UserActivity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activity:[]
        }

    }

    componentDidMount() {
        this.getActivity()
    }

    getActivity = async () => {
        let data = await getUserActivity();
        console.log(data)
        this.setState({activity:data})

    }

    executeActivity = async (activity) => {
        console.log('execute activity')
    }

    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <View style={[{position:'absolute',width:'90%',marginTop:'2.5%',marginLeft:'5%'}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={[{width:'100%',marginTop:'7.5%'}]}>
                <View style={[{marginTop:'15%',width:'90%',marginLeft:'5%'}]}>
                    <View style={[flexing.rowStart]}>
                        <Ionicons name={'ios-list'} size={30} color={'#c6302c'}/>
                        <Spacer spacing={.025} xAxis/>
                        <Text style={[{fontWeight:'bold',color:'black',fontSize:25}]}>
                            Your Activity
                        </Text>
                    </View>
                </View>
                    <Spacer spacing={.025}/>
                    {this.state.activity.map((val)=>(
                        <TouchableOpacity
                            style={[{width:'90%',marginLeft:'5%',marginTop:'2.5%',borderBottomWidth:.5,borderColor:'#e3e3e3'},
                                flexing.rowStart
                            ]}
                            onPress={()=>{
                            if(val.type !== 'system') {
                                this.executeActivity(val)
                            }
                        }}>
                            <TouchableOpacity style={[createCircle(.05,0,'black')]}>
                                <Image source={require('../../assets/img/43v8.png')} resizeMode={'contain'} style={[createCircle(.05,0,'black')]}/>
                            </TouchableOpacity>
                            <Spacer spacing={.025} xAxis/>
                            <View style={[flexing.startColumn,{width:'75%'}]}>
                                <Text style={[{color:'black'}]}>
                                    {val.message}
                                </Text>
                                <Text style={[{color:'slategray'}]}>
                                    {convertTimeStamp(val.timestamp)}
                                </Text>
                            </View>
                            {val.type !== 'system' ?  <Ionicons name={'ios-chevron-forward-outline'} size={20} color={'black'}/> : <></>}

                            <Spacer spacing={.1}/>

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        )
    }


}
