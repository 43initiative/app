import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import VStack from "../../designComps/vstack";
import Spacer from "../../design/spacer";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";


export default class RefineFeedModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected:0,
            options : [
                {designation:0,icon:'ios-navigate',title:'Closest To Me',blurb:'We will show you content ordered by proximity to your location'},
                {designation:1,icon:'ios-timer',title:'Newest Content',blurb:'We will show you the newest content first, regardless of engagement and popularity.'},
                {designation:2,icon:'ios-bar-chart',title:'Most Popular',blurb:'We will show you the most popular content according to the number of likes and comments.'},
                {designation:3,icon:'ios-git-branch',title:'Most Viral',blurb:'We will show you content that has the longest PIF chains, representing the greatest impact and spread.'},
            ]
        }

    }



    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                {/*<View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%'}]}>*/}
                {/*    <FilterButton active text={'Near Me'} icon={'ios-navigate'}/>*/}
                {/*    <FilterButton text={'Newest'} icon={'ios-timer'}/>*/}
                {/*    <FilterButton text={'Popular'} icon={'ios-bar-chart'}/>*/}
                {/*    <FilterButton text={'Viral'} icon={'ios-git-branch'}/>*/}
                {/*</View>*/}
                <VStack al={'flex-start'} jc={'space-around'} top={.025} width={.9} left={.05} height={.7} style={[{backgroundColor:'white',opacity:1}]}>
                    <Text style={[{fontWeight:'bold',fontSize:15}]}></Text>
                    <Spacer spacing={.0125}/>

                    {this.state.options.map((val)=>{
                        return(<TouchableOpacity onPress={()=>{this.setState({selected:val.designation})}} style={[{width:'100%',opacity:val.designation === this.state.selected ? 1 : .6,height:'30%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                            <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={.9}>
                                <Ionicons name={val.icon} color={'red'} size={30}/>
                                <VStack al={'flex-start'} height={.9} width={.8}>
                                    <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>{val.title}</Text>
                                    <Text style={[{fontSize:12,color:'#101010'}]}>{val.blurb}</Text>
                                </VStack>
                            </Hstack>
                        </TouchableOpacity>)
                    })}




                </VStack>
                <Spacer spacing={.05}/>

                <RoundedButton pressed={()=>{this.props.navigation.goBack()}} style={[{width:'90%',marginLeft:'5%',height:'8%'}]} text={'Apply To Feed'} bgColor={'firebrick'}/>

            </Animated.View>
        )
    }


}
