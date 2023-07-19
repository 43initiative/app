import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {flexing, dimensions} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import {notifWatcher} from "../../firebase/fireStarter";
import {connect} from "react-redux";


 class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
        this.startNotificationWatcher()
    }

    startNotificationWatcher = async () => {
            notifWatcher();

    }

    render() {
        return (
            <Animated.View style={[{width:'100%',marginLeft:'0%',paddingLeft:'5%',paddingRight:'5%',height:dimensions.returnHeight(.08),backgroundColor:'white'},flexing.rowBetween]}>
            <View style={[flexing.rowStart,{width:'50%',borderColor:'green',borderWidth:0,height:'80%'}]}>
                <View style={[{width:'30%',borderWidth:0,borderColor:'red',height:'100%'},flexing.centerColumn]}>
                    <Image resizeMode={'contain'} style={{width:'100%',height:'100%',position:'absolute',borderWidth:0,borderColor:'blue'}} source={require('../../assets/img/logo43only.png')}/>
                    <Image resizeMode={'contain'} style={{width:'100%',height:'100%',borderWidth:0,borderColor:'blue'}} source={require('../../assets/img/logoringonly.png')}/>
                </View>
                {/*<Ionicons name={'ios-heart-half'} size={30} color={'firebrick'}/>*/}
                <Spacer spacing={.01} xAxis/>
                <Text style={[{color:'#101010',fontStyle:'normal',fontWeight:'bold',fontSize:18,fontFamily:'marker'}]}>Initiative</Text>
            </View>
                <View style={[flexing.rowAround,{width:'40%',borderColor:'red',borderWidth:0}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateNewPost',{
                        isNomination:false,
                        isInspired:false
                    })}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-add'} size={20} color={'black'}/>
                    </View>
                    </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Notifications')}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-notifications'} size={20} color={this.props.newNotifications ? 'firebrick' :'black'}/>
                    </View>
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchUsers')}}>
                    <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                        <Ionicons style={[{fontWeight:'bold'}]} name={'ios-search'} size={20} color={'black'}/>
                    </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        savedList:state.notifications.notificationList,
        newNotifications:state.notifications.newNotifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header)
