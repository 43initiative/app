import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {getUserProfile} from "../../firebase/fireStarter";
import {flexing} from "../../styles/dimensions/dims";
import {createCircle} from "../../styles/globals/shapes";
import Spacer from "../../design/spacer";
import FastImage from 'react-native-fast-image'


export default class InitialOrPic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }


    returnWhich = () => {
        if(this.props.imgProvided) {
            return(

                <FastImage
                    style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]}
                    source={{
                        uri: this.props.img,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                // <Image resizeMode={'cover'} style={[{width:'100%',height:'100%',borderRadius:100,overflow:'hidden'}]} source={{uri:this.props.img}}/>
            )
        } else {
            return(
                <Text style={[{color:'white',fontSize:15,opacity:.7}]}>{this.props.initials}</Text>
            )
        }
    }



    render() {
        return (
            <TouchableOpacity onPress={()=>{
              //  console.log(this.props.initials)
                console.log('tapped')
                if(this.props.noPress) {
console.log('no press')
                } else {
                    console.log('live',this.props.userUid)
                  return  getUserProfile(this.props.navigation,this.props.route,false,this.props.userUid)

                }

            }}
           style={[createCircle(this.props.circleRadius,0,'black'),flexing.centerColumn,{backgroundColor:'firebrick'}]}>
                {this.returnWhich()}
                </TouchableOpacity>


        )
    }


}
