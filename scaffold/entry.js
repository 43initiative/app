import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, SafeAreaView
} from 'react-native';
import {MainNavigator} from "../navigators/foundation/main";
import {connect} from "react-redux";
import Loading from "../components/supplementary/loading";
import ToastMessenger from "../components/supplementary/toastMessenger";
import {PermanentMarker_400Regular, useFonts} from "@expo-google-fonts/permanent-marker";
import * as Font from 'expo-font'
 class Entry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoading:true,
            fontsLoaded:false
        }

    }

   async  componentDidMount() {
     // this.loadFonts()
     // this.loadFonts()
       await Font.loadAsync({
           'marker': require('../assets/fonts/marker.ttf'),
           'sigmar': require('../assets/fonts/sigmar.ttf'),
       });
       this.setState({ fontsLoaded: true });

   }

    loadFonts = async () => {
        try {

            console.log(x,'llokie')
        } catch (e) {
            console.log(e)
        }

    }

     componentDidUpdate(prevProps, prevState, snapshot) {
         if(!prevProps.showToast && this.props.showToast) {
             this.activateToast();
         }
     }

     activateToast = async () => {
         let {headline,subline,icon} = this.props;
         return  this.toast.revealToast(headline,subline,icon)
     }

    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                <SafeAreaView style={{width:'100%',height:'100%'}}>
                    {this.state.fontsLoaded && <MainNavigator/>}
                    <Loading showLoading={this.props.showLoading}/>
                    {this.props.showToast && <ToastMessenger ref={(ref) => {
                        this.toast = ref;
                    }}/>
                    }
                </SafeAreaView>
            </Animated.View>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        showLoading:state.navigation.showLoading,
        showToast:state.navigation.showToast,
        headline:state.navigation.headline,
        subline:state.navigation.subline,
        icon:state.navigation.icon
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Entry)
