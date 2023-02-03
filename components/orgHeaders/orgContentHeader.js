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


class OrgContentHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
    }



    render() {
        return (
            <Animated.View style={[{width:'100%',marginLeft:'0%',paddingLeft:'5%',paddingRight:'5%',height:dimensions.returnHeight(.08),backgroundColor:'white'},flexing.rowBetween]}>
                <View style={[flexing.rowStart,{width:'40%'}]}>
                    <Text style={[{color:'#101010',fontStyle:'normal',fontWeight:'bold',fontSize:25}]}>My Content</Text>

                    {/*<Ionicons name={'ios-heart-half'} size={30} color={'firebrick'}/>*/}

                </View>
                <View style={[flexing.rowAround,{width:'40%'}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AltPoster')}}>
                        <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                            <Ionicons style={[{fontWeight:'bold'}]} name={'ios-add'} size={20} color={'black'}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('OrgNotifications')}}>
                        <View style={[createCircle(.0425,0,'black'),{backgroundColor:'lightgray'}]}>
                            <Ionicons style={[{fontWeight:'bold'}]} name={'ios-notifications'} size={20} color={this.props.newNotifications ? 'firebrick' :'black'}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('OrgSearchUsers')}}>
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
        savedList:state.orgNotifications.notificationList,
        newNotifications:state.orgNotifications.newNotifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(OrgContentHeader)
