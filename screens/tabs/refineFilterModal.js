import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import VStack from "../../designComps/vstack";
import Spacer from "../../design/spacer";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";


export default class RefineFilterModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected:'',
            lastSelection:'',
            options : [
                {designation:'inspired',icon:'ios-hand-right',title:'Inspired',blurb:'We will show you the newest content that has been inspired by previous good deeds.'},
                {designation:'trending',icon:'ios-pulse',title:'Trending',blurb:'We will show you the original content has inspired other deeds.'},
                {designation:'followers',icon:'ios-person',title:'Followers',blurb:'We will show you content from your followers.'},
                {designation:'following',icon:'ios-people',title:'Following',blurb:'We will show you content from those you follow.'},
                {designation:'',icon:'ios-globe',title:'Everything',blurb:'No filters applied'}
                // {designation:'comments',icon:'ios-git-branch',title:'Most Viral',blurb:'We will show you content that has the longest PIF chains, representing the greatest impact and spread.'},
            ]
        }

    }

    componentDidMount() {
        let selected = this.props.route.params.current;
        let lastSelection = this.props.route.params.current;
        this.setState({selected, lastSelection})
    }


    saveSetting = async () => {
        console.log(this.state.selected)
        this.props.route.params.setFilter(this.state.selected)
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
                        return(<TouchableOpacity onPress={()=>{this.setState({selected:val.designation})}} style={[{width:'100%',opacity:val.designation === this.state.selected ? 1 : .6,height:'20%',borderBottomWidth:1,borderColor:'#e3e3e3'}]}>
                            <Hstack jc={'space-between'} style={[{backgroundColor:'white'}]} trueSize={false} height={1} width={.9}>
                                <Ionicons name={val.icon} color={'#3EB489'} size={30}/>
                                <VStack al={'flex-start'} height={.9} width={.8}>
                                    <Text style={[{fontSize:15,color:'#101010',fontWeight:'bold'}]}>{val.title}</Text>
                                    <Text style={[{fontSize:12,color:'#101010'}]}>{val.blurb}</Text>
                                </VStack>
                            </Hstack>
                        </TouchableOpacity>)
                    })}




                </VStack>
                <Spacer spacing={.05}/>

                <RoundedButton disabled={this.state.selected === this.state.lastSelection} pressed={()=>{this.saveSetting()}} style={[{width:'90%',marginLeft:'5%',height:'8%'}]} text={'Apply To Feed'} bgColor={'#3EB489'}/>

            </Animated.View>
        )
    }


}
