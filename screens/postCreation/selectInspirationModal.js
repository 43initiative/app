import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView, Dimensions
} from 'react-native';
import InspoSelection from "../../components/listings/inspoSelection";
import Spacer from "../../design/spacer";
import {flexing} from "../../styles/dimensions/dims";
import RoundedButton from "../../components/buttons/roundedButton";


export default class InspirationSelectionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inspirations:[],
            nominations:[],
            segment:'inspo',
            selectedId:null,
            selectedPif:null,
            isNomination:false,
            nominationMsg:null,
            nominationData:null
        }

    }

    componentDidMount() {
        let {inspirations,nominations} = this.props.route.params;
        console.log(inspirations,'inspo')
        this.setState({inspirations,nominations})
    }




    returnSegment = () => {
        if(this.state.segment === 'inspo') {
            return this.state.inspirations.map((val)=>(
                <InspoSelection unselected={()=>{this.setState({selectedId:null,selectedPif:null})}} selected={()=>{this.setState({selectedId:val.postId,selectedPif:val,isNomination:false})}} selectedId={this.state.selectedId} isNomination={false} pifData={val}/>
            ))
        } else {
            return this.state.nominations.map((val)=>(
                <InspoSelection unselected={()=>{this.setState({selectedId:null,selectedPif:null})}} selected={()=>{this.setState({selectedId:val.pifData.id,selectedPif:val.pifData,isNomination:true,nominationMsg:val.nominationMsg,nominationData:val})}}  selectedId={this.state.selectedId} isNomination={true} nominationMsg={val.nominationMsg} pifData={val.pifData}/>
            ))
        }
    }


    sendBackData = () => {
        //console.log(this.state.selectedPif)
        this.props.route.params.setInspiration(this.state.isNomination,this.state.selectedPif,this.state.isNomination ? this.state.nominationMsg : null,this.state.nominationData)
    }


    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>


                <Spacer spacing={.025}/>
                <ScrollView style={{width:'100%',height:'70%'}}>

                    <View style={[flexing.rowAround,{width:'75%',marginLeft:'5%',height:Dimensions.get('window').height * .05}]}>
                        <RoundedButton pressed={()=>{this.setState({segment:'inspo'})}} doOutline={this.state.segment !== 'inspo'} bgColor={'firebrick'} textStyles={[{color:'white'}]} text={'Saved Inspo'} style={[{height:'80%',width:'45%'}]}/>
                        <RoundedButton pressed={()=>{this.setState({segment:'nominations'})}}  doOutline={this.state.segment !== 'nominations'} bgColor={'firebrick'} textStyles={[{color:'white'}]} text={'Nominations'} style={[{height:'80%',width:'40%'}]}/>
                    </View>
                    {this.returnSegment()}
                    <Spacer spacing={.25}/>
                </ScrollView>
                <View style={[{width:'80%',marginLeft:'10%',height:'15%',backgroundColor:'white'},flexing.centerColumn]}>
                    <RoundedButton pressed={()=>{this.sendBackData()}} disabled={this.state.selectedId === null} style={[{backgroundColor:'firebrick',height:'50%',width:'100%'}]} textStyles={{color:'white'}}  bgColor={'firebrick'} text={'Use Selected'}/>
                </View>

            </Animated.View>
        )
    }


}
