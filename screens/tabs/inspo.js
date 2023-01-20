import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    ScrollView,
    RefreshControl,

} from 'react-native';
import Spacer from "../../design/spacer";
import {getMyAppreciations} from "../../firebase/fireInit";
import Appreciation from "../../components/listings/appreciation";
import {flexing} from "../../styles/dimensions/dims";
import Pif from "../../components/listings/pif";


export default class Inspo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing:false,
            appreciations:[],
            index:0
        }

    }

    componentDidMount() {
        this.getMyAppreciations();
    }

    getMyAppreciations = async () => {
        let appreciations = await getMyAppreciations('KH5vtjQg6HPOTHEFTfln');
        this.setState({appreciations})
    }

    getMyInspirations = async () => {
        let inspirations = await getMyAppreciations('KH5vtjQg6HPOTHEFTfln');
        this.setState({inspirations})
    }

    doRefresh =   () => {
        this.setState({refreshing:true},async()=>{
            await this.getMyAppreciations();
            await this.getMyInspirations()
            return this.setState({refreshing:false})
        })

    }

    returnSection = () => {
        if(this.state.index === 0) {
            return this.state.appreciations.map((val)=>(
                <Appreciation data={val}/>
            ))
        }

        return this.state.appreciations.map((val)=>(
            <Pif data={val}/>
        ))
    }

    render() {
        return (

            <SafeAreaView style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
                <Spacer spacing={.1}/>

                <View style={[flexing.rowAround,{width:'80%',marginLeft:'10%'}]}>
                    <TouchableOpacity style={[{borderBottomWidth:this.state.index === 1 ? 1 : 0,borderColor:'red'}]} onPress={()=>{this.setState({index:1})}}>
                        <Text style={[{fontSize:15,fontWeight:this.state.index === 1? 'bold' : '300',color:this.state.index === 1? 'firebrick' : 'gray'}]}>Saved Inspirations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[{borderBottomWidth:this.state.index === 0 ? 1 : 0,borderColor:'red'}]} onPress={()=>{this.setState({index:0})}}>
                        <Text style={[{fontSize:15,fontWeight:this.state.index === 0? 'bold' : '300',color:this.state.index === 0 ? 'firebrick' : 'gray'}]}>My Appreciations</Text>
                    </TouchableOpacity>
                </View>

                <Spacer spacing={.025}/>

                <ScrollView
                            contentContainerStyle={{}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.doRefresh}
                                />
                            }
                        >
                            {this.returnSection()}

                        </ScrollView>



</SafeAreaView>

        );
    }




}
