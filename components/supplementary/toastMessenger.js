import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import {components} from '../../styles/dimensions/dims'
import {flexing} from '../../styles/dimensions/dims'
import {dimensions} from '../../styles/dimensions/dims'
import {clearTimerHandler, waitACertainTime} from "../../helperFuncs/timers/wait";
import {Ionicons} from "@expo/vector-icons";
import {hideToastMessage} from "../../reducers/controllers";
export default class ToastMessenger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity:new Animated.Value(1),
            translateY: new Animated.Value(dimensions.returnHeight(.2)),
            icon:'close-circle',
            headline:'',
            subline:''
        }

    }

    componentDidMount() {
        console.log('toast is live')
    }


    revealToast = async (headline,subline,icon) => {
        this.setState({
            headline,subline,icon
        },()=>{
            Animated.spring(this.state.translateY,{
                useNativeDriver:true,
                toValue:.05
            }).start(async()=>{
                await waitACertainTime(3000,this.timerHandler);
                this.removeToast()
            })
        })

    }

    removeToast = async () => {
        Animated.spring(this.state.translateY,{
            useNativeDriver:true,
            toValue:dimensions.returnHeight(.2)
        }).start(()=>{
            hideToastMessage();
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                clearTimerHandler(this.timerHandler);
                return this.removeToast()}
            } style={[components.toastMessenger,flexing.rowAround,{
                transform:[
                    {translateY: this.state.translateY}
                ]
            }]}>

                <Animated.View style={[{height:'90%'},flexing.centerColumn]}>
                    <Ionicons name={this.state.icon} size={45} color={'white'}/>
                </Animated.View>

                <Animated.View style={[{height:'90%',width:'70%'},flexing.startColumn,flexing.smallPadding]}>
                    <Text style={[components.toastHeadline]}>{this.state.headline}</Text>
                    <Text style={[components.toastText]}>{this.state.subline}</Text>
                </Animated.View>

            </TouchableOpacity>
        )
    }


}


