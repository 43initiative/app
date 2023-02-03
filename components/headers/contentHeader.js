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


class ContentHeader extends React.Component {
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
                    <Text style={[{color:'#3EB489',fontStyle:'normal',fontWeight:'bold',fontSize:25}]}>My Content</Text>

                    {/*<Ionicons name={'ios-heart-half'} size={30} color={'firebrick'}/>*/}

                </View>
                <View style={[flexing.rowAround,{width:'40%'}]}>
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


export default connect(mapStateToProps,mapDispatchToProps)(ContentHeader)
