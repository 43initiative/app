import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, Dimensions
} from 'react-native';
import Hstack from "../../designComps/hstack";
import Circle from "../../designComps/circle";
import Spacer from "../../design/spacer";
import VStack from "../../designComps/vstack";
import {flexing} from "../../styles/dimensions/dims";


export default class TruncPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{this.props.pressed()}} style={[{borderColor:'#e3e3e3',borderBottomWidth:1,width:'90%',maxHeight:Dimensions.get('window').height * .15,padding:'2.5%',marginTop:'5%',marginLeft:'5%',borderRadius:20}]}>
                <View style={[{},flexing.rowStart]}>
                    <Circle borderWidth={0} borderColor={'transparent'} style={[{borderColor:'transparent'}]} size={.05}>
                        <Image  style={[{width:'100%',height:'100%',borderRadius:100}]} source={{uri:this.props.userImg}} resizeMode={'cover'} />

                    </Circle>
                    <Spacer spacing={.025} xAxis/>
                    <VStack al={'flex-start'} trueSize={false}  width={.8} height={.8} style={[{borderWidth:0,borderColor:'blue'}]}>
                        <Text style={[{fontWeight:'bold'}]}>{this.props.userName}</Text>
                        <Text style={[{fontWeight:'300',fontSize:10}]}>{this.props.timestamp}</Text>

                    </VStack>

                </View>


                <Text numberOfLines={3} style={[{fontSize:12,marginTop:'2.5%'}]}>{this.props.post}</Text>

            </TouchableOpacity>
        )
    }


}
