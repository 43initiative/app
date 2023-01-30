import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import InitialOrPic from "../buttons/initialOrPic";
import Circle from "../../designComps/circle";
import Spacer from "../../design/spacer";
import {convertTimeStamp} from "../../helperFuncs/dateTime";

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
        let data = this.props;
        console.log('d')
console.log(data,'x')
    }

    render() {
        let data = this.props
        return (
            <Animated.View style={[{width:'100%',backgroundColor:'white',padding:'2.5%',minHeight:Dimensions.get('window').height * .0,marginTop:'5%'},flexing.rowStart,{alignItems:'flex-start'}]}>
                <Spacer xAxis spacing={.025}/>
                    <InitialOrPic
                    userUid={data.userUid}
                    initials={data.initials}
                    imgProvided={data.imgProvided}
                    img={data.img}
                    circleRadius={.05}
                    navigation={this.props.navigation} route={this.props.route}/>
                <Spacer xAxis spacing={.025}/>
                <View style={[flexing.startColumn,{justifyContent:'space-between',width:'70%'}]}>

                    <View style={[flexing.startColumn,{width:'100%',backgroundColor:'#e3e3e3',borderRadius:15,padding:'5%'}]}>
                        <Text style={[{fontSize:15, fontWeight:'bold'}]}>{data.displayName}</Text>
                        <Spacer  spacing={.0125}/>

                        <Text style={[{fontSize:13.5, fontWeight:'300'}]}>{data.comment}
                        </Text>
                    </View>

                    <Spacer spacing={.0125}/>

                    <Text  style={{fontSize:12,color:'gray'}}>{convertTimeStamp(data.timestamp)}</Text>

                </View>
            </Animated.View>
        )
    }


}
