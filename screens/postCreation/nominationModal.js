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
            nomMsg:'',
            disableFeedback:true
        }

    }

    componentDidMount() {
        let data = this.props.route.params;
        if(data.length !== 0) {
            let selectionObject = {}
            for (let i = 0; i < data.list.length; i++) {
                let user = data.list[i].id
                selectionObject[user] = true;
            }
            this.setState({selectedNoms:data.list,selectionObject,nomMsg:data.nomMsg})
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
        let selectObj = this.state.selectionObject;
        if(action === 'select') {
            selectObj[item.id] = true
        } else {
            selectObj[item.id] = false
        }
let list =[]
        for (const selectObjKey in selectObj) {
            if(selectObj[selectObjKey]) {
                list.push(selectObj[selectObjKey])
            }
        }

        this.setState({selectionObject:selectObj,selectedNoms:list})
        // if(action === 'select') {
        //     console.log(item)
        //     selected.push(item)
        // } else {
        //     let index = selected.findIndex(x => x.userUid === item.userUid);
        //     selected.splice(index,1);
        // }
        //
        // this.setState({selectedNoms:selected})
    }

    checkForInclusion = (userUid) => {
        let index = this.state.selectedNoms.findIndex(x => x.id === userUid);
        return index > -1

    }


    render() {

        return (
            <TouchableWithoutFeedback disabled={this.state.disableFeedback}>
            <Animated.View style={[{width:'100%',height:'100%'}]}>

                <TextInput
                    onFocus={()=>{this.setState({disableFeedback:false})}}
                    onBlur={()=>{this.setState({disableFeedback:true});console.log('bur')}}
                    value={this.state.nomMsg}
                    placeholderTextColor={'black'}
                    placeholder={'Leave a nomination message to the nominees.'}
                    onChangeText={(val)=>{this.setState({nomMsg:val})}}
                    multiline={true}
                    style={{width:'90%',marginLeft:'5%',borderWidth:1,borderRadius:10,height:'25%',padding:'5%'}}

                />
                <View style={[{width:'90%',marginLeft:'5%',marginTop:'5%'},flexing.rowBetween]}>
                    <Text style={[{fontWeight:'bold'}]}> You can nominate 5 total users.</Text>
                    <Text> {this.state.selectedNoms.length}/5 selected</Text>
                </View>
            <ScrollView contentContainerStyle={{width:'90%',height:'60%',marginLeft:'5%'}}>
                {this.state.nominationList.map((item)=>(
                    <UserNomination pressed={(action)=>{this.doSelection(action,item)}} isSelected={this.state.selectionObject[item.id]} route={this.props.route} navigation={this.props.navigation} displayName={item.displayName} img={item.img} imgProvided={item.imgProvided} initials={item.initials}/>

                ))}


            </ScrollView>
                <View style={[{width:'80%',marginLeft:'10%',height:'15%',position:'absolute',top:'85%'}]}>
                    <RoundedButton pressed={()=>{this.depositNominations()}} disabled={false} style={[{backgroundColor:'#3EB489',height:'50%',width:'100%'}]} textStyles={{color:'white'}}  bgColor={'#3EB489'} text={'Save'}/>
                </View>
            </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
