import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    Image,
    TextInput,
    Dimensions, Keyboard
} from 'react-native';

import {flexing} from '../../styles/dimensions/dims'
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import axios from "axios";
import Circle from "../../designComps/circle";
import {orgCreateRequest, checkForOrganization} from "../../firebase/fireStarter";
import {activateLoading, deactivateLoading, showToastMessage} from "../../reducers/controllers";
export default class OrgCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stage:0,
            organizationSelection:null,
            orgExistsInDb:false,
            appMsg:'',
            applicantName:''
        }

    }


    getExtraDetails = async (placeId,apiKey) => {
        let config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`,
            headers: { }
        };

       let response = await  axios(config)

                let {formatted_address,geometry,formatted_phone_number,website,name,photos,editorial_summary,icon,address_components} = response.data.result;
                //  console.log(formatted_phone_number,formatted_address,geometry,website,name,editorial_summary,icon)
                // console.log(response.data.result['editorial_summary'])
                //console.log(response.data.result.formatted_address);
                let photo = `https://maps.googleapis.com/maps/api/place/photo
                ?maxwidth=400
                &photo_reference=${photos[1].photo_reference}
                &key=${apiKey}`
        for (let i = 0; i < address_components.length; i++) {
            console.log(i,address_components[i])
        }
                let organizationSelection = {

                    formatted_phone_number,
                    formatted_address,
                    lat:geometry.location.lat,
                    long:geometry.location.lng,
                    website,
                    city:address_components[2]['long_name'],
                    state:address_components[5]['short_name'],
                    name,
                    placeId,
                    photoRefs: photos.map((val)=>{
                        return val['photo_reference']
                    }),
                    apiKey:apiKey,
                    img:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photos[0]['photo_reference']}&key=${apiKey}`
                }
console.log(`https://maps.googleapis.com/maps/api/place/photo
                ?maxwidth=400
                &photo_reference=${photos[0]['photo_reference']}
                &key=${apiKey}`)
                this.setState({organizationSelection})

    }


    checkDbAndProceed = async  () => {
        console.log('tapped')
        let response = await checkForOrganization(this.state.organizationSelection.placeId);
        console.log(response)
        if(response.passed) {
            if(!response.exists) {
                this.setState({orgExistsInDb:response.exists,stage:2})
                console.log(response.exists)
            } else {
                this.setState({orgExistsInDb:response.exists,stage:3})
            }

        }
    }


    submitApplication = async () => {
        activateLoading();
        let placeInfo = this.state.organizationSelection;
            let submission = {
                name:placeInfo.name,
                imgProvided:placeInfo.photoRefs.length > 0,
                img:placeInfo.photoRefs.length > 0 ? placeInfo.img : null,
                city:placeInfo.city,
                state:placeInfo.state,
                formatted_address:placeInfo['formatted_address'],
                lat:placeInfo.lat,
                long:placeInfo.long,
                website:placeInfo.website,
                appMsg:this.state.appMsg,
                placeId:placeInfo.placeId,
                applicantName:this.state.applicantName
            }

            let response = await orgCreateRequest(placeInfo.placeId,submission)
        console.log(response)
        deactivateLoading();
            this.setState({stage:6})
            //showToastMessage('Application Submitted','Check your Org Tab for updates','ios-buildings-outline')
    }




    returnStage = () => {
        let org = this.state.organizationSelection;
        //stage 0 : Start
        //stage 1 : search for org
        //stage 2: no profile present
        //stage 3: profile is present + code
        //stage 4: create profile
        //stage 5: submit details for verificiation
        //stage 6 : completion check org tab

        switch (this.state.stage) {
            case 0 : {
                return(
                    <View style={[{width:'100%',height:'100%'}]}>
                        <View style={[{width:'80%',marginLeft:'10%',height:'50%',borderWidth:0,borderColor:'red'},flexing.centerColumn]}>
                            <Image style={{width:'100%'}} resizeMode={'contain'} source={require('../../assets/img/orgcreation.png')}/>
                        </View>

                        <View style={[flexing.centerColumn,{width:'90%',marginLeft:'5%',height:'50%'}]}>
                            <Text style={[{fontWeight:'bold',color:'black',textAlign:'center',fontSize:18}]}>
                                What You Need To Know
                            </Text>
                            <Spacer spacing={.025}/>
                            <Text style={[{fontWeight:'400',color:'black',fontSize:15,textAlign:'center'}]}>
                                Organizations will be verified before becoming active on the application. If you are not
                                an authorized representative of a business, government, or non profit then you should leave this screen.
                            </Text>
                            <Spacer spacing={.05}/>
                            <RoundedButton   pressed={()=>{this.setState({stage:1})}} style={[{width:'90%',marginLeft:'5%',height:'15%'}]} text={'Find My Organization'} bgColor={'firebrick'}/>

                        </View>
                    </View>
                )

            }

            case 1 : {
                return(
                    <View style={[{width:'90%',marginLeft:'5%',height:'100%'}]}>
                    <Text style={[{fontSize:20,fontWeight:'bold',width:'100%'}]}>Find your organization</Text>
                        <Spacer spacing={.025}/>
                        <View style={{width:'100%',height:'50%'}}>
                            <GooglePlacesAutocomplete

                                styles={{
                                    textInputContainer: {
                                        backgroundColor: 'white',
                                    },
                                    textInput: {
                                        height: 50,
                                        color: '#5d5d5d',
                                        fontSize: 14,
                                        borderWidth:1,
                                        borderColor:'gray'
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                                placeholder='Search your business, non-profit, or gov institution'
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(data.place_id);
                                    this.getExtraDetails(data.place_id,'AIzaSyBGpiPcqPZzDnxrBzGmYOaQIt_q-SX5fJQ')
                                }}
                                query={{
                                    key: 'AIzaSyBGpiPcqPZzDnxrBzGmYOaQIt_q-SX5fJQ',
                                    language: 'en',
                                }}


                            />
                        </View>

                        <View style={{width:'100%',height:'30%',borderWidth:0,borderColor:'red'}}>
                            {this.state.organizationSelection &&
                            <View style={[{width:'80%',height:'100%'},flexing.rowStart]}>

                                <Circle style={[flexing.centerColumn,{borderWidth:0}]} size={.0625}>
                                    <Image source={{uri:org.img}} resizeMode={'cover'} style={{width:'100%',height:'100%',borderRadius:100}}/>
                                </Circle>
                                <Spacer spacing={.05} xAxis/>

                                <View style={[flexing.startColumn]}>
                                    <Text style={[{fontSize:20,fontWeight:'bold'}]}>{org.name}</Text>
                                    <Text style={[{fontSize:15}]}>{org.formatted_address}</Text>
                                    <Text style={[{fontSize:15}]}>{org.formatted_phone_number}</Text>
                                    <Spacer spacing={.0125}/>
                                    <TouchableOpacity onPress={()=>{this.setState({organizationSelection:null})}}><Text style={[{color:'red',textDecorationLine:'underline'}]}>Remove</Text></TouchableOpacity>
                                </View>
                            </View>
                            }
                        </View>
                        <Spacer spacing={.05}/>

                        <RoundedButton disabled={this.state.organizationSelection === null} pressed={()=>{this.checkDbAndProceed()}} style={[{width:'90%',marginLeft:'5%',height:'10%'}]} text={'This is my organization'} bgColor={'firebrick'}/>


                    </View>
                )
            }

            case 2 : {
                return(
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[{width:'90%',marginLeft:'5%',height:'100%'}]}>
                    <Text style={[{fontSize:20,fontWeight:'bold',width:'100%'}]}>
                        We currently don't have a profile created for your organization.
                    </Text>
                    <Spacer spacing={.025}/>
                    <Text style={[{fontSize:16,fontWeight:'400',width:'100%'}]}>
                        We can create a profile for your listing now, then reach out to verify authenticity within 2 business days.
                    </Text>
                    <Spacer spacing={.025}/>
                    {/*<Text style={[{fontSize:16,fontWeight:'400',width:'100%'}]}>*/}
                    {/*    Check the Org tab for updates to your application.*/}
                    {/*</Text>*/}

                    <View style={[{width:'90%',height:'65%'},flexing.startColumn]}>
                        <Text style={[{color:'black',fontSize:16,fontWeight:'700'}]}>Your Info:</Text>
                        <View style={[flexing.rowStart]}>
                            <Text style={[{color:'black',fontSize:16,fontWeight:'700',width:'25%'}]}>Name</Text>
                            <Spacer spacing={.025} xAxis/>
                            <TextInput
                                value={this.state.applicantName}
                                onChangeText={(val)=>{this.setState({applicantName:val})}}
                                maxLength={25}
                                placeholder={'Your Name'}
                                style={[{width:'60%',paddingLeft:'5%',textAlign:'left',height:Dimensions.get('window').height * .05},{borderRadius:5,borderColor:'gray',borderWidth:1}]}
                            />

                        </View>
                        <Spacer spacing={.0125}/>

                        <View style={[flexing.rowStart]}>
                            <Text style={[{color:'black',fontSize:16,fontWeight:'700',width:'25%'}]}>Message</Text>
                            <Spacer spacing={.025} xAxis/>
                            <TextInput
                                value={this.state.appMsg}
                                onChangeText={(val)=>{this.setState({appMsg:val})}}
                                maxLength={120}
                                multiline={true}
                                placeholder={'Your can leave a small message, but it is not required'}
                                style={[{width:'60%',paddingLeft:'5%',textAlign:'left',height:Dimensions.get('window').height * .1},{borderRadius:5,borderColor:'gray',borderWidth:1}]}
                            />

                        </View>
                        <Spacer spacing={.05}/>

                        <Text style={[{color:'black',fontSize:16,fontWeight:'700'}]}>Org Details:</Text>

                        <View style={[flexing.rowStart]}>
                           <Text style={[{color:'black',fontSize:16,fontWeight:'700'}]}>Org Name:</Text>
                            <Spacer spacing={.025} xAxis/>
                           <Text style={[{color:'black',fontSize:14}]}>{org.name}</Text>
                        </View>
                        <View style={[flexing.rowStart]}>
                            <Text style={[{color:'black',fontSize:16,fontWeight:'700'}]}>Org Phone:</Text>
                            <Spacer spacing={.025} xAxis/>

                            <Text style={[{color:'black',fontSize:14}]}>{org.formatted_phone_number}</Text>
                        </View>
                        <View style={[flexing.rowStart,{flexWrap:'wrap'}]}>
                            <Text style={[{color:'black',fontSize:16,fontWeight:'700'}]}>Org Address:</Text>
                            <Spacer spacing={.025} xAxis/>

                            <Text style={[{color:'black',fontSize:14}]}>{org.formatted_address}</Text>
                        </View>
                    </View>
                    <View style={[{width:'100%',height:'10%'},flexing.centerColumn]}>
                        <RoundedButton disabled={this.state.applicantName === ''}  pressed={()=>{this.submitApplication()}} style={[{width:'90%',height:'100%'}]} text={'Submit Application'} bgColor={'firebrick'}/>
                        <Spacer spacing={.025}/>

                        {/*<TouchableOpacity style={[{width:'100%'},flexing.centerColumn]}>*/}

                        {/*    <Text style={{textDecorationLine:'underline',color:'black'}}>I do not have a code</Text>*/}
                        {/*</TouchableOpacity>*/}

                    </View>
                </View>
                    </TouchableWithoutFeedback>)
                }

            case 3 : {
                return(<View style={[{width:'90%',marginLeft:'5%',height:'100%'}]}>
                    <Text style={[{fontSize:20,fontWeight:'bold',width:'100%'}]}>
                        We have a profile created for {this.state.organizationSelection ? this.state.organizationSelection.name : 'business name'}.
                    </Text>
                    <Spacer spacing={.025}/>
                    <Text style={[{fontSize:16,fontWeight:'400',width:'100%'}]}>
                        If you have a code you can enter it below, and you will have full access to the profile and its features.
                    </Text>
                    <Spacer spacing={.0125}/>

                    <Text style={[{fontSize:16,fontWeight:'400',width:'100%'}]}>

                        If you do not have a code, simply Tap 'I do not have a code' and we will reach out to verify authenticity within 2 business days.
                    </Text>

                    <Spacer spacing={.1}/>

                    <TextInput
                    value={this.state.code}
                    onChangeText={(val)=>{this.setState({code:val})}}
                    maxLength={6}
                    placeholder={'Enter Code'}
                    style={[{width:'60%',marginLeft:'20%',textAlign:'center',height:Dimensions.get('window').height * .0625},{borderRadius:10,borderColor:'#101010',borderWidth:1}]}
                    />

                    <Spacer spacing={.225}/>
                    <View style={[{width:'100%',height:'10%'},flexing.centerColumn]}>
                        <RoundedButton   pressed={()=>{this.props.route.params.openCreation()}} style={[{width:'90%',height:'100%'}]} text={'Submit Code'} bgColor={'firebrick'}/>
                        <Spacer spacing={.025}/>

                        <TouchableOpacity style={[{width:'100%'},flexing.centerColumn]}>

                            <Text style={{textDecorationLine:'underline',color:'black'}}>I do not have a code</Text>
                        </TouchableOpacity>

                    </View>


                </View>)
            }

            case 6 : {
return(  <View style={[{width:'100%',height:'100%'}]}>
    <View style={[{width:'80%',marginLeft:'10%',height:'50%',borderWidth:0,borderColor:'red'},flexing.centerColumn]}>
        <Image style={{width:'100%'}} resizeMode={'contain'} source={require('../../assets/img/orgcreation.png')}/>
    </View>

    <View style={[flexing.centerColumn,{width:'90%',marginLeft:'5%',height:'50%'}]}>
        <Text style={[{fontWeight:'bold',color:'black',textAlign:'center',fontSize:18}]}>
            Your Application Was Submitted
        </Text>
        <Spacer spacing={.025}/>
        <Text style={[{fontWeight:'400',color:'black',fontSize:15,textAlign:'center'}]}>
            Check your org tab to see the status of your application, and remember we will be reaching out via telephone to verify
            your organization.
        </Text>
        <Spacer spacing={.05}/>
        <RoundedButton   pressed={()=>{this.props.navigation.goBack()}} style={[{width:'90%',marginLeft:'5%',height:'15%'}]} text={'Close'} bgColor={'firebrick'}/>

    </View>
</View>)
            }
        }
    }

    render() {
        return (
            <SafeAreaView>
                <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                    <View style={[{position:'absolute',width:'100%'},flexing.rowStart]}>
                        <View style={{width:'20%'}}>

                        </View>

                        <View style={[{width:'60%'},flexing.centerColumn]}>
                            <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Create Org Account</Text>
                        </View>

                        <View style={[{width:'10%',marginLeft:'5%'},flexing.centerColumn]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={[flexing.centerColumn,{width:'100%'}]}>
                            <Ionicons name={'ios-close-circle'} size={25} color={'black'}/>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[{width:'100%',marginTop:'15%',height:'85%',backgroundColor:'white'}]}>
                        {this.returnStage()}
                    </View>
                </Animated.View>
            </SafeAreaView>
        )
    }


}
