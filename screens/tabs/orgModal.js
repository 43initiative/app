import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import VStack from "../../designComps/vstack";
import Spacer from "../../design/spacer";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";
import {flexing} from "../../styles/dimensions/dims";


export default class OrgModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentDidMount() {

    }



    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
               <View style={[{width:'100%',height:'75%',marginTop:'10%'}]}>
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
                <RoundedButton  pressed={()=>{this.props.route.params.openCreation()}} style={[{width:'90%',marginLeft:'5%',height:'8%'}]} text={'Create Organization Account'} bgColor={'firebrick'}/>

            </Animated.View>
        )
    }


}
