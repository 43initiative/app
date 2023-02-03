import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, SafeAreaView, ScrollView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import {dimensions} from '../../styles/dimensions/dims'
import NotificationListing from "../../components/listings/notification";
import Spacer from "../../design/spacer";
import {markOrgNotifRead, getOrgNotifications} from "../../firebase/fireStarter";

export default class OrgNotifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications:[]
        }

    }

    componentDidMount() {
        this.getNotifications()
    }

    getNotifications = async () =>{
        let data = await getOrgNotifications()
        if(data.passed) {

            this.setState({notifications:data.data})
        }
    }

    clearNotif = (id) => {
        markOrgNotifRead(id)
    }

    render() {
        return (
            <SafeAreaView style={[{backgroundColor:'white'}]}>

                <View style={{width:'100%',height:'100%'}}>
                    <View style={[{position:'absolute',zIndex:1,width:'90%',marginTop:'2.5%',marginLeft:'5%'},flexing.rowStart,{alignItems:'flex-start'}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                            <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                        </TouchableOpacity>
                        {/*<Text style={[{fontWeight:'bold',marginBottom:'5%',marginLeft:'2.5%',fontSize:17}]}>Notifications</Text>*/}

                    </View>

                    <Spacer spacing={.075}/>
                    <ScrollView styke={{width:'100%'}}>
                        <View style={[flexing.rowBetween,{width:'95%',alignItems:'flex-start'}]}>
                            <Text style={[{fontWeight:'bold',marginBottom:'5%',marginLeft:'2.5%',fontSize:17}]}>Notifications</Text>
                            {this.state.notifications.filter((val)=>{
                                return !val.read
                            }).length > 0 ?
                                <Text>Mark all as read</Text> : <></>
                            }
                        </View>
                        <View style={[{width:dimensions.returnWidth(1),height:dimensions.returnHeight(1),backgroundColor:'white'}]}>
                            {this.state.notifications.map((val)=>(
                                <NotificationListing clearNotification={(id)=>{this.clearNotif(id)}} navigation={this.props.navigation} route={this.props.route} data={val}/>

                            ))}
                        </View>
                        <Spacer spacing={.25}/>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }


}
