import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image, ScrollView, Dimensions
} from 'react-native';
import {flexing} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import Pif from "../../components/listings/pif";


export default class PublicProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPif:true
        }

    }

    returnHasPifs = () => {
        if(!this.state.hasPif) {
            return(
                <View style={[{width:'100%',backgroundColor:'transparent'},flexing.centerColumn,{height:'25%'}]}>
                    <Ionicons name={'ios-documents-outline'} size={40} color={'lightslategray'}/>
                    <Spacer spacing={.025}/>
                    <Text style={[{color:'lightslategray',fontSize:15}]}>This user has not posted any PIFS yet.</Text>
                </View>
            )
        } else {
            return(

                <View style={[flexing.startColumn, {width: '100%'}]}>
                    <Spacer spacing={.025}/>

                    <Pif/>

                </View>


            )
        }


    }

    render() {
        return (
            <ScrollView style={{width:'100%'}}>

            <Animated.View style={[{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'#ffffff'}]}>
            <View style={[{position:'absolute',top:0,left:0,width:'100%',height:'17.5%',backgroundColor:'black'}]}>
                <Image source={require('../../assets/img/welcomeimg.png')} style={{width:'100%',position:'absolute'}} resizeMode={'contain'}/>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={[{width:'20%',marginTop:'5%'},flexing.startColumn,{height:'25%'}]}>
                    <Ionicons name={'ios-chevron-back'} size={25} color={'white'}/>
                </TouchableOpacity>
            </View>

                <View style={[{width:'90%',marginLeft:'5%',marginTop:'20%',backgroundColor:'transparent'},flexing.centerColumn]}>
                    <Image  style={[createCircle(.1625,0,'firebrick'),{borderRadius:100,borderColor:'white',borderWidth:4}]} source={{uri:'https://scontent.fewr1-6.fna.fbcdn.net/v/t39.30808-6/308583490_10221158791344323_5099317024454302786_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g6kei8gL3ZUAX9_PRoQ&_nc_ht=scontent.fewr1-6.fna&oh=00_AfAk0hhGa3biiDEjEEozwyTVSrGI3t2ojRnKuYE9oVxscA&oe=63C62FC2'}} resizeMode={'cover'} />
                    <Spacer spacing={.0125}/>

                    <Text style={[{fontSize:20}]}>@Joe Mangi</Text>
                    <Spacer spacing={.025}/>


                    <Text style={[{fontSize:13,color:'gray',width:'85%',textAlign:'center'}]}>
                        This is a section where people can explain why they joined the 43initiative and decided to provide a daily dose of humanity.
                    </Text>
                    <Spacer spacing={.025}/>
                    <View style={[flexing.rowAround,{width:'85%'}]}>
                        <View style={[flexing.centerColumn, {width: '30%'}]}>
                            <Text style={[{color:'slategrey',fontSize:13,fontWeight:'bold'}]}>Location</Text>
                            <Spacer spacing={.0125}/>
                            <Text style={[{fontSize:14,color:'gray'}]}>New York</Text>
                        </View>
                        <View style={[flexing.centerColumn, {width: '30%'}]}>
                            <Text style={[{color:'slategrey',fontSize:13,fontWeight:'bold'}]}>Pif Score</Text>
                            <Spacer spacing={.0125}/>

                            <Text style={[{fontSize:14,color:'gray'}]}>350</Text>
                        </View>
                        <View style={[flexing.centerColumn, {width: '30%'}]}>
                            <Text style={[{color:'slategrey',fontSize:13,fontWeight:'bold'}]}>Joined</Text>
                            <Spacer spacing={.0125}/>

                            <Text style={[{fontSize:14,color:'gray'}]}>Dec 2022</Text>
                        </View>
                    </View>
                    <Spacer spacing={.025}/>

                    <View style={[{width:'100%',height:'.05%',backgroundColor:'#e3e3e3'}]}>

                    </View>
                    <Spacer spacing={.025}/>




                    {/*<View style={[flexing.rowBetween,{width:'90%'}]}>*/}
                    {/*    <Text style={[{fontSize:13,color:'#101010',textAlign:'center'}]}>*/}
                    {/*        10 PIFS*/}
                    {/*    </Text>*/}

                    {/*    <Text style={[{fontSize:13,color:'#101010',textAlign:'center'}]}>*/}
                    {/*        10 Pifs*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                </View>
                <View style={{width:'90%',marginLeft:'5%'}}>
                    {this.returnHasPifs()}

                </View>

            </Animated.View>
<Spacer spacing={.7}/>

            </ScrollView>
        )
    }


}
