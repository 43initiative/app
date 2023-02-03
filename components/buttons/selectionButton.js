import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable
} from 'react-native';
import dimensions, {flexing} from "../../styles/dimensions/dims";


export default class SelectionButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected:false
        }

    }

    componentDidMount() {

    }


    doFollowAction = async () => {
        if(this.state.selected) {
            this.setState({selected:false})
        } else {
            this.setState({selected:true})

        }
        console.log(this.props.userUid)
    }

    render() {
        let following = {backgroundColor:'#3EB489'};
        let notFollow= {backgroundColor: 'white'}
        let condition = this.props.isSelected;
        return (
            <TouchableOpacity
                onPress={()=>{this.props.pressed(this.props.isSelected ? 'deselect' : 'select')}}
                style={[flexing.centerColumn,
                    {borderColor:'#3EB489',borderWidth:1.5,borderRadius:10,width:dimensions.dimensions.returnWidth(.2),height:dimensions.dimensions.returnHeight(.0375)},condition ?
                        following:
                        notFollow]}>
                {condition ?
                    <Text style={[{color:'white'}]}>Deselect</Text>
                    :
                    <Text style={[{color:'#3EB489'}]}>Select</Text>

                }

            </TouchableOpacity>
        )
    }


}
