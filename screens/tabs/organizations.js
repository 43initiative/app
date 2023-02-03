import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, ScrollView, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
import {connect} from "react-redux";
import OrgApplication from "../../components/listings/orgApplication";


 class Organizations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            segment:'applications',
            showOrgs:false,
            privateData:null,
            hasOrgs:false
        }

    }

    componentDidMount() {
       this.setData()
    }

    setData = async () => {
        console.log('called')
        let data = {...this.props.privateData};
        console.log(data.isOrganizationAdmin,data.applicationList !== null)

        let hasOrgs = data.isOrganizationAdmin || data.applicationList !== undefined
        this.setState({privateData: data,hasOrgs},()=>{
            console.log(this.state)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

     openCreateOrg = async () => {
         this.props.navigation.push('CreateOrg')
     }


     returnSegments = () => {
        if(this.state.segment === 'applications') {
            let list = this.props.privateData.applicationList;
            let pending = list.filter((val)=>{
                return val.pending
            })
            let accepted = list.filter((val)=>{
                return val.accepted
            })
            let rejected = list.filter((val)=>{
                return !val.accepted && !val.pending
            })
            return(
                <View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                    <ScrollView contentContainerStyle={{width:'90%',marginLeft:'5%',height:'100%',paddingBottom:'10%'}}>
                        <Spacer spacing={.025}/>

                        <Text style={[{fontWeight:'bold',fontSize:16,color:'black'}]}>Pending Applications</Text>
                        <Spacer spacing={.025}/>
                        {pending.map((val)=>(
                            <OrgApplication data={val}/>
                        ))}
                        <Spacer spacing={.025}/>

                        <Text style={[{fontWeight:'bold',fontSize:16,color:'black'}]}>Accepted Applications</Text>
                        <Spacer spacing={.025}/>

                        {accepted.map((val)=>(
                            <OrgApplication data={val}/>
                        ))}
                        <Spacer spacing={.025}/>

                        <Text style={[{fontWeight:'bold',fontSize:16,color:'black'}]}>Rejected Applications</Text>
                        <Spacer spacing={.025}/>

                        {rejected.map((val)=>(
                            <OrgApplication data={val}/>
                        ))}
                    </ScrollView>
                </View>
            )
        } else {
            return(
                <View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                    <ScrollView contentContainerStyle={{width:'90%',marginLeft:'5%',height:'100%',paddingBottom:'10%'}}>
                        <Text>Orgs</Text>
                    </ScrollView>
                </View>
            )
        }
     }

     returnHasOrgs = () => {
        if(this.props.privateData.isOrganizationAdmin || (this.props.privateData.applicationList && this.props.privateData.applicationList.length > 0)) {
            return(<Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white',marginTop:'20%'}]}>


                <ScrollView style={{width:'100%'}}>
                    <View style={[flexing.rowAround,{width:'80%',marginLeft:'5%',height:Dimensions.get('window').height * .05}]}>
                        <RoundedButton pressed={()=>{this.setState({segment:'applications'})}} doOutline={this.state.segment !== 'applications'} bgColor={'#3EB489'} textStyles={[{color:'white'}]} text={'Applications'} style={[{height:'80%',width:'45%'}]}/>
                        <RoundedButton pressed={()=>{this.setState({segment:'orgs'})}}  doOutline={this.state.segment !== 'orgs'} bgColor={'#3EB489'} textStyles={[{color:'white'}]} text={'Active Orgs'} style={[{height:'80%',width:'40%'}]}/>
                    </View>
                    {this.returnSegments()}
                </ScrollView>




<View style={[{position:'absolute',top:'70%',height:'15%',width:'100%',backgroundColor:'whtie'},flexing.centerColumn]}>
    <RoundedButton doOutline pressed={()=>{this.openCreateOrg()}}  bgColor={'#3EB489'} textStyles={[{color:'white'}]} text={'Add Organization'} style={[{height:'50%',width:'80%'}]}/>

</View>

            </Animated.View>)
        } else {
            return(<Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <ScrollView contentContainerStyle={{width:'100%',height:'100%',paddingBottom:'10%'}}>
                <View style={[{width:'100%',height:'75%',marginTop:'25%'}]}>
                    <View style={[{width:'80%',marginLeft:'10%',height:'50%',borderWidth:0,borderColor:'red'},flexing.centerColumn]}>
                        <Image style={{width:'100%'}} resizeMode={'contain'} source={require('../../assets/img/org.png')}/>
                    </View>

                    <View style={[flexing.centerColumn,{width:'80%',marginLeft:'10%',height:'50%'}]}>
                        <Text style={[{fontWeight:'bold',color:'black',textAlign:'center',fontSize:18}]}>
                            Your Organization and The 43Initiative
                        </Text>
                        <Spacer spacing={.025}/>
                        <Text style={[{fontWeight:'400',color:'black',fontSize:15,textAlign:'center'}]}>
                            If you own a business, run a non-profit, or are a part of a government institution, you should consider creating an organization account with the 43Initiative.

                        </Text>
                        <Spacer spacing={.0125}/>

                        <Text style={[{fontWeight:'400',color:'black',fontSize:15,textAlign:'center'}]}>

                            Paying it forward is not just
                            for the individual, it's for your organization as well.
                        </Text>
                    </View>
                </View>
                <RoundedButton  pressed={()=>{this.openCreateOrg()}} style={[{width:'90%',marginLeft:'5%',height:'8%'}]} text={'Create Organization Account'} bgColor={'firebrick'}/>
               <Spacer spacing={.25}/>
                </ScrollView>
            </Animated.View>)
        }
     }


    render() {
        return (
            <View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                {this.returnHasOrgs()}
            </View>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        privateData:state.userData.privateData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Organizations)
