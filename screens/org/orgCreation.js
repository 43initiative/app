import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, SafeAreaView, Image
} from 'react-native';

import {flexing} from '../../styles/dimensions/dims'
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import RoundedButton from "../../components/buttons/roundedButton";
export default class OrgCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stage:0
        }

    }

    returnStage = () => {
        switch (this.state.stage) {
            case 0 : {
                return(
                    <View style={[{width:'100%',height:'100%'}]}>
                        <View style={[{width:'80%',marginLeft:'10%',height:'50%',borderWidth:0,borderColor:'red'},flexing.centerColumn]}>
                            <Image style={{width:'100%'}} resizeMode={'contain'} source={require('../../assets/img/org.png')}/>
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
                            <RoundedButton  pressed={()=>{this.props.route.params.openCreation()}} style={[{width:'90%',marginLeft:'5%',height:'15%'}]} text={'Find My Organization'} bgColor={'firebrick'}/>

                        </View>
                    </View>
                )

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
