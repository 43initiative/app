import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, SafeAreaView, ScrollView
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {Ionicons} from "@expo/vector-icons";
import {dimensions} from '../../styles/dimensions/dims'
import NotificationListing from "../../components/listings/notification";
import Spacer from "../../design/spacer";
import {markAllNotifsRead, markNotifRead, getNotifications} from "../../firebase/fireStarter";
import {waitACertainTime} from "../../helperFuncs/timers/wait";

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newNotifications:[],
            oldNotifications:[]
        }

    }

    componentDidMount() {
        this.getNotifications()
    }

    getNotifications = async () =>{
        let data = await getNotifications()
        if(data.passed) {
            console.log(data.unread,data.read,'read')

            this.setState({newNotifications:data.unread,oldNotifications:data.read})
        }
    }

    clearNotif = async (id) => {
      await  markNotifRead(id)
        this.getNotifications()
    }

    clearAllNotifications = async () => {
        let outstanding = this.state.newNotifications.map((val)=>{
            return val.id
        })
        await markAllNotifsRead(outstanding)
        await waitACertainTime(1000);
        this.getNotifications()
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
                        <Text style={[{fontWeight:'bold',marginBottom:'5%',marginLeft:'2.5%',fontSize:17}]}>New Notifications</Text>
                        {this.state.newNotifications.filter((val)=>{
                            return !val.read
                        }).length > 0 ?
                            <TouchableOpacity onPress={()=>{
                                return this.clearAllNotifications()
                            }
                            }>
                                <Text>Mark all as read</Text>
                            </TouchableOpacity>
                         : <></>
                        }
                    </View>
                    <View style={[{width:dimensions.returnWidth(1),backgroundColor:'white'}]}>
                        {this.state.newNotifications.sort((a,b)=>{
                            return b.timestamp - a.timestamp
                        }).map((val)=>(
                            <NotificationListing clearNotification={(id)=>{this.clearNotif(id)}} navigation={this.props.navigation} route={this.props.route} data={val}/>

                        ))}
                    </View>
              <Spacer spacing={.0125}/>
                    <Text style={[{fontWeight:'bold',marginBottom:'5%',marginLeft:'2.5%',fontSize:17}]}>Old Notifications</Text>
                    <View style={[{width:dimensions.returnWidth(1),height:dimensions.returnHeight(1),backgroundColor:'white'}]}>
                        {this.state.oldNotifications.sort((a,b)=>{
                            return b.timestamp - a.timestamp
                        }).map((val)=>(
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
