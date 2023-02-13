import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView, Dimensions
} from 'react-native';
import VStack from "../../designComps/vstack";
import Spacer from "../../design/spacer";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";
import {flexing} from "../../styles/dimensions/dims";


export default class RefineTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTags:[],
            originalTags:[],
            changed:false,
            tagOptions:['savethewhales','savetheenvironemt']
        }

    }

    componentDidMount() {
        let selectedTags = this.props.route.params.selectedTags;
        let originalTags = this.props.route.params.selectedTags;
        let tagOptions = this.props.route.params.tagOptions;
        this.setState({selectedTags,tagOptions,originalTags},(state)=>{
            console.log(this.state.tagOptions)
        })
    }



    changeTagList = (tag) => {
        let currentSelected = this.state.selectedTags;

        if(currentSelected.indexOf(tag) === -1) {
            currentSelected.push(tag)
        } else {

            let index = currentSelected.findIndex((val)=>{
                return val === tag
            })
             currentSelected.splice(index,1);
        }
        this.setState({selectedTags:currentSelected,changed:true})
    }

    saveSetting = async () => {

        this.props.route.params.setTags(this.state.selectedTags)
    }


    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <View style={[{marginTop:'10%',height:'65%',width:'100%'}]}>
                    <ScrollView contentContainerStyle={[{height:Dimensions.get('window').height * .5,width:'100%',borderWidth:0,borderColor:'red'}]}>

                        <View style={[{width:'100%',height:'100%',backgroundColor:'transparent'},flexing.rowStart,{alignContent:'flex-start',flexWrap:'wrap'}]}>
                            {this.state.tagOptions.map((val)=>{
                                return(<TouchableOpacity onPress={()=>{this.changeTagList(val)}} style={[{borderRadius:20,backgroundColor:this.state.selectedTags.indexOf(val) !== -1 ? '#e3e3e3' : 'white',padding:'2.5%',marginTop:'2.5%',marginLeft:'2.5%',borderWidth:1,borderColor:this.state.selectedTags.indexOf(val) !== -1 ? '#e3e3e3' : 'black'}]}>
                                    <Text style={[{fontWeight:'600',fontSize:14}]}>#{val}</Text>
                                </TouchableOpacity>)
                            })}
                        </View>







                    </ScrollView>
                </View>

                <Spacer spacing={.05}/>

                <RoundedButton disabled={!this.state.changed} pressed={()=>{this.saveSetting()}} style={[{width:'90%',marginLeft:'5%',height:'8%'}]} text={'Apply To Feed'} bgColor={'#3EB489'}/>

            </Animated.View>
        )
    }


}
