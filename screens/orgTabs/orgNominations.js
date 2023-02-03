import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Dimensions, SafeAreaView, ScrollView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import RoundedButton from "../../components/buttons/roundedButton";
import Spacer from "../../design/spacer";
import {rejectOrgNominations, getDeed, loadCommentSection} from "../../firebase/fireStarter";
import {getOrgSentNominations} from "../../firebase/fireStarter";
import RecNom from "../../components/listings/recNom";
import SentNom from "../../components/listings/sentNom";
import {getOrgRecNominations,withdrawOrgNominations,getPifPost} from '../../firebase/fireStarter'
import pif from "../../styles/listings/pif";

export default class OrgNominations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            segment:'received',
            recNoms:[],
            sentNoms:[],
            completedRec:[],
            completedSent:[],
            pendingRec:[],
            pendingSent:[]
        }

    }

    componentDidMount() {
        this.getSegments();
    }

    loadSinglePost = async (postId) => {
        console.log(postId)
        return getDeed(postId,this.props.navigation,this.props.route)
    }

    loadComments = async (data) => {
        console.log(data,'data')
        if(this.props.ableToLoadComments) {
            loadCommentSection(this.props.navigation,this.props.route,data.postId,data)
        }
    }

    postNow = async (nomData) => {
        console.log(nomData.postId)
        let pifData = await getPifPost(nomData.postId);
        console.log(pifData)
        if(pifData.passed) {
            this.props.navigation.push('CreateDeedPost',{
                isNomination:true,
                nomData,
                pifData:pifData.data
            })
        }

    }

    getSegments = async () => {
        let recCall = await getOrgRecNominations();
        let sent = await getOrgRecNominations();
        let rec = recCall.data;
        let completedRec = rec.filter((val)=>{
            return !val.pending
        })
        let pendingRec = rec.filter((val)=>{
            return val.pending
        })

        let completedSent = sent.filter((val)=>{
            return !val.pending
        })
        let pendingSent = sent.filter((val)=>{
            return val.pending
        })
        this.setState({pendingRec,pendingSent,completedSent,completedRec});
        console.log(this.state)
    }

    returnSegments = () => {
        if(this.state.segment === 'sent') {
            return(
                <View style={{width:'100%'}}>
                    <Text style={[{color:'black',fontWeight:'bold',fontSize:18,marginLeft:'5%',marginTop:'10%'}]}>Pending Nominations</Text>
                    {this.state.pendingSent.map((val)=>(
                        <SentNom withdraw={()=>{this.withdrawNom(val.id)}} route={this.props.route} navigation={this.props.navigation} data={val}/>
                    ))}

                    <Text style={[{color:'black',fontWeight:'bold',fontSize:18,marginLeft:'5%',marginTop:'10%'}]}>Completed Nominations</Text>
                    {this.state.completedSent.map((val)=>(
                        <SentNom route={this.props.route} navigation={this.props.navigation} data={val}/>
                    ))}
                </View>
            )
        } else {
        return(
            <View style={{width:'100%'}}>
                <Text style={[{color:'black',fontWeight:'bold',fontSize:18,marginLeft:'5%',marginTop:'10%'}]}>Pending Nominations</Text>
                {this.state.pendingRec.map((val)=>(
                    <RecNom postNow={()=>{this.postNow(val)}} viewPost={()=>{this.loadSinglePost(val.postId)}} reject={()=>{this.rejectNom(val.id)}} route={this.props.route} navigation={this.props.navigation} data={val}/>
                ))}

                <Text style={[{color:'black',fontWeight:'bold',fontSize:18,marginLeft:'5%',marginTop:'10%'}]}>Completed Nominations</Text>
                {this.state.completedRec.map((val)=>(
                    <RecNom postNow={()=>{this.postNow(val)}}  viewPost={()=>{this.loadSinglePost(val.postId)}} route={this.props.route} navigation={this.props.navigation} data={val}/>
                ))}
            </View>
        )
        }
    }

    withdrawNom = async (id) => {
        await withdrawOrgNominations(id)
        this.getSegments()
    }

    rejectNom = async (id) => {
        await rejectOrgNominations(id)
        this.getSegments()
    }

    render() {
        return (
            <SafeAreaView style={{width:'100%',height:'100%'}}>
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <Spacer spacing={.08}/>


               <ScrollView style={{width:'100%'}}>
                   <View style={[flexing.rowAround,{width:'50%',marginLeft:'5%',height:Dimensions.get('window').height * .05}]}>
                       <RoundedButton pressed={()=>{this.setState({segment:'received'})}} doOutline={this.state.segment !== 'received'} bgColor={'firebrick'} textStyles={[{color:'white'}]} text={'Received'} style={[{height:'80%',width:'45%'}]}/>
                       <RoundedButton pressed={()=>{this.setState({segment:'sent'})}}  doOutline={this.state.segment !== 'sent'} bgColor={'firebrick'} textStyles={[{color:'white'}]} text={'Sent'} style={[{height:'80%',width:'40%'}]}/>
                   </View>
                   {this.returnSegments()}
               </ScrollView>

            </Animated.View>
            </SafeAreaView>
        )
    }


}
