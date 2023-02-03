import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Keyboard, Image, SafeAreaView
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import FormInput from "../../components/inputs/formInput";
import Hstack from "../../designComps/hstack";
import Spacer from "../../design/spacer";
import FauxButtonInput from "../../components/inputs/fauxButtonInput";
import {Picker} from "@react-native-picker/picker";
import {Ionicons} from "@expo/vector-icons";
import {flexing} from "../../styles/dimensions/dims";
import {storeControllers} from "../../reducers/controllers";
import {SET_ORG_BASIC_DETAILS, SET_USER_BASIC_DETAILS} from "../../reducers/actionTypes";
import axios from "axios";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Circle from "../../designComps/circle";


export default class OrganizationSignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            businessName:'',
            phone:null,
            city:'',
            state:'',
            organizationSelection:null,
            isOrganization:true
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
        this.setState({organizationSelection})

    }


    saveAndContinue = async () => {
        try {
            let store = storeControllers.store;
            let saving = this.state.organizationSelection;
        console.log(saving['formatted_phone_number'])
            store.dispatch({type:SET_ORG_BASIC_DETAILS,payload:{
                    displayName:saving.name,
                    isOrganization: true,
                    placeId:saving.placeId,
                    city:saving.city,
                    state:saving.state,
                    website:saving.website,
                    phone:saving['formatted_phone_number'] !== undefined ? saving['formatted_phone_number'] : null,
                }});
            this.props.navigation.navigate('AddBioScreen')
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        let org= this.state.organizationSelection;
        return (
            <SafeAreaView>
            <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                <View style={[{width:'90%',marginLeft:'5%',height:'100%'}]}>
                    <Spacer spacing={.05}/>

                    <Text style={[{fontSize:22,fontWeight:'bold',width:'100%'}]}>Searcn for your organization</Text>
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

                    <View style={{width:'100%',height:'20%',borderWidth:0,borderColor:'red'}}>
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
                    <Spacer spacing={.025}/>

                    <RoundedButton disabled={this.state.organizationSelection === null} pressed={()=>{this.saveAndContinue()}} style={[{width:'90%',marginLeft:'5%',height:'8%'}]} text={'This is my organization'} bgColor={'firebrick'}/>


                </View>
            </View>
            </SafeAreaView>
        )
    }


}
