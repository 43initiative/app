import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, ScrollView
} from 'react-native';
import VStack from "../../designComps/vstack";
import Spacer from "../../design/spacer";
import Hstack from "../../designComps/hstack";
import {Ionicons} from "@expo/vector-icons";
import RoundedButton from "../../components/buttons/roundedButton";
import TruncPreview from "../../components/listings/truncPreview";
import {getMyAppreciations} from "../../firebase/fireInit";


export default class SelectInspirationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected:0,
            options:[]
        }

    }

    componentDidMount() {
        this.getMyAppreciations()
    }

    getMyAppreciations = async () => {
        let options = await getMyAppreciations('KH5vtjQg6HPOTHEFTfln');
        console.log(options)
        this.setState({options:[...options]})
    }

    sendInspirationBack = async (result) => {
        this.props.route.params.attachInspiration(result).then(()=>{
            this.props.navigation.goBack()
        })
    }


    render() {
        return (
            <Animated.View style={[{width:'100%',height:'100%',backgroundColor:'white'}]}>
                {/*<View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%'}]}>*/}
                {/*    <FilterButton active text={'Near Me'} icon={'ios-navigate'}/>*/}
                {/*    <FilterButton text={'Newest'} icon={'ios-timer'}/>*/}
                {/*    <FilterButton text={'Popular'} icon={'ios-bar-chart'}/>*/}
                {/*    <FilterButton text={'Viral'} icon={'ios-git-branch'}/>*/}
                {/*</View>*/}
<ScrollView>

                    {this.state.options.map((val)=>{
                        return(<TruncPreview pressed={()=>{return this.sendInspirationBack(val.id)}} post={val.post} timestamp={val.timestamp} userImg={val.userImg} userName={val.userName}/>)
                    })}




                <Spacer spacing={.05}/>
</ScrollView>

            </Animated.View>
        )
    }


}
