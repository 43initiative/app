import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";


export default class Privacy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    render() {
        return (
            <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>

                <View style={[{position:'absolute',width:'90%',marginLeft:'5%'}]}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name={'ios-arrow-back'} size={25} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={[{marginTop:'10%',width:'90%',marginLeft:'5%'}]}>

                    <Text style={[{color:'black',fontSize:25,fontWeight:'bold',marginTop:'10%'}]}>The 43Initiative Terms of Service</Text>
                    <Text style={[{marginTop:'5%'}]}>


                Privacy Policy
                </Text>

                    <Text style={[{marginTop:'2.5%'}]}>
                The 43 Initiative ("us", "we", or "our") operates the mobile application (the "Service").

                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
                </Text>

                    <Text style={[{marginTop:'2.5%'}]}>
                Information Collection and Use

                We collect several different types of information for various purposes to provide and improve our Service to you.

                Types of Data Collected

                Personal Data

                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:

                Email address

                Cookies and Usage Data

                Usage Data

                We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

                Tracking & Cookies Data

                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.

                Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.

                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.

                Examples of Cookies we use:

                Session Cookies. We use Session Cookies to operate our Service.
                Preference Cookies. We use Preference Cookies to remember your preferences and various settings.
                Security Cookies. We use Security Cookies for security purposes.
                </Text>

                    <Text style={[{marginTop:'2.5%'}]}>
                Use of Data

                The 43 Initiative uses the collected data for various purposes:

                To provide and maintain the Service
                To notify you about changes to our Service
                To allow you to participate in interactive features of our Service when you choose to do so
                To provide customer care and support
                To provide analysis or valuable information so that we can improve the Service
                To monitor the usage of the Service
                To detect, prevent and address technical issues
                </Text>

                    <Text style={[{marginTop:'2.5%'}]}>
                Transfer Of Data

                Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.

                If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.

                Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.

                The 43 Initiative will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                </Text>
                </ScrollView>
            </View>
        )
    }


}
