import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ActivityIndicator
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createSquare} from "../../styles/globals/shapes";




export default class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: new Animated.Value(0)
        }

    }

    componentDidMount() {
        this.startAnimation()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!prevProps.showLoading && this.props.showLoading) {
            this.setState({animation: new Animated.Value(0)},()=>{
                this.startAnimation()

            })
        }

        if(prevProps.showLoading && !this.props.showLoading) {
            console.log('here')
        }
    }

    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 6000,
            useNativeDriver:true
        }).start(() => {
            //this.state.animation.setValue(0);
        });
    }

    render() {
        const xInterpolate = this.state.animation.interpolate({
            inputRange: [0,.25,.5,1],
            outputRange: ["0deg", "-720deg","-1080deg","-1440deg"],
        });
        return (
            this.props.showLoading &&
            <Animated.View style={[{width:'100%',height:'100%',position:'absolute',top:0,left:0},flexing.centerColumn]}>
                {/*<ActivityIndicator size={'large'}/>*/}
<View style={[{position:'absolute',height:'100%',width:'100%',backgroundColor:'black',opacity:.1}]}>

</View>
                <View style={[createSquare(.125,0,null,null),{borderRadius:10,backgroundColor:'ghostwhite'},flexing.centerColumn]}>
                    <Animated.Image  resizeMode={'contain'} source={require('../../assets/img/logoringonly.png')} style={[
                        {top:'10%',width:'80%',height:'80%',position:'absolute',
                            transform:[{ rotate: xInterpolate }]}]}/>
                    <Animated.Image  resizeMode={'cover'} source={require('../../assets/img/logo43only.png')} style={[{top:'10%',height:'80%',width:'80%',position:'absolute'}]}/>

                </View>

            </Animated.View>
        )
    }


}

