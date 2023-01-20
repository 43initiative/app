import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

class TermsOfService extends Component {
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
                        Welcome to The 43 Initiative! We are a non-profit organization that provides a platform for individuals and organizations to come together to make a positive impact on the world. By using our app, you agree to the following terms of service:

                        1. Use of the app is subject to all applicable laws and regulations.

                        2. You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password.

                        3. You agree to provide accurate and complete information when creating your account, and to update that information as necessary to keep it accurate and complete.

                        4. You agree to not use the app for any illegal or unauthorized purpose, or to violate any laws in your jurisdiction (including but not limited to copyright laws).

                        5. You agree to not use the app to upload, post, transmit, or otherwise make available any content that is harmful,threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.

                        6. You agree to not use the app to upload, post, transmit, or otherwise make available any unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other form of solicitation.

                        7. You agree to not use the app to harm minors in any way.

                        8. You agree to not use the app to impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.

                        9. You agree to not use the app to upload, post, transmit, or otherwise make available any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment.

                        10. The 43 Initiative reserves the right to terminate your access to the app at any time and for any reason, including but not limited to violation of these terms of service.

                        11. The 43 Initiative reserves the right to modify these terms of service at any time without prior notice. Your continued use of the app following any such modifications shall constitute your acceptance of the new terms.

                        By using our app, you acknowledge that you have read and understood these terms of service, and that you agree to be bound by them. If you do not agree to these terms, please do not use the app.
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

export default TermsOfService;
