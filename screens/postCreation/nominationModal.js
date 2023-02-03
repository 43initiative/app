import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView, Alert, TextInput
} from 'react-native';
import {getFollowing, getFollowers} from "../../firebase/fireStarter";
import UserNomination from "../../components/listings/userNomination";
import UserTruncated from "../../components/listings/userTruncated";
import {flexing} from '../../styles/dimensions/dims'
import RoundedButton from "../../components/buttons/roundedButton";

export default class NominationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nominationList: [],
            selectedNoms:[],
            nomMsg:''
        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        if(data.length !== 0) {
            this.setState({selectedNoms:data.list,nomMsg:data.nomMsg})
        }
        this.getNominationOptions();
    }

    getNominationOptions= async () => {
        let response = await getFollowers(true);
        console.log(response)
        if(response.passed) {
            console.log(response.data)
            this.setState({nominationList:response.data})
        }
    }

    depositNominations = async () => {
        this.props.route.params.shareNominations(this.state.selectedNoms,this.state.nomMsg)

    }

    doSelection = (action,item) => {

        if(this.state.selectedNoms.length ===5) {
             return alert('Maxed out noms')
        }
        let selected = this.state.selectedNoms;
        if(action === 'select') {
            console.log(item)
            selected.push(item)
        } else {
            let index = selected.findIndex(x => x.userUid === item.id);
            selected.splice(index,1);
        }

        this.setState({selectedNoms:selected})
    }

    checkForInclusion = (userUid) => {
        let index = this.state.selectedNoms.findIndex(x => x.id === userUid);
        return index > -1

    }


    render() {

        return (
            <TouchableWithoutFeedback>
            <Animated.View style={[{width:'100%',height:'100%'}]}>

                <TextInput
                    value={this.state.nomMsg}
                    onChangeText={(val)=>{this.setState({nomMsg:val})}}
                    style={{width:'90%',marginLeft:'5%',borderWidth:1,borderRadius:10,height:'25%',padding:'5%'}}

                />
                <View style={[{width:'90%',marginLeft:'5%',marginTop:'10%'},flexing.rowBetween]}>
                    <Text style={[{fontWeight:'bold'}]}> You can nominate 5 total users.</Text>
                    <Text> {this.state.selectedNoms.length}/5 selected</Text>
                </View>
            <ScrollView contentContainerStyle={{width:'90%',height:'60%',marginLeft:'5%'}}>
                {this.state.nominationList.map((item)=>(
                    <UserNomination pressed={(action)=>{this.doSelection(action,item)}} isSelected={this.checkForInclusion(item.id)} route={this.props.route} navigation={this.props.navigation} displayName={item.displayName} img={item.img} imgProvided={item.imgProvided} initials={item.initials}/>

                ))}


            </ScrollView>
                <View style={[{width:'80%',marginLeft:'10%',height:'15%',position:'absolute',top:'85%'}]}>
                    <RoundedButton pressed={()=>{this.depositNominations()}} disabled={false} style={[{backgroundColor:'firebrick',height:'50%',width:'100%'}]} textStyles={{color:'white'}}  bgColor={'firebrick'} text={'Save'}/>
                </View>
            </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
