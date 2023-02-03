import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Text,
    TouchableOpacity,
    Pressable,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    RefreshControl
} from 'react-native';
import {getAllPifs, initialize, addPif,getSpecificPif,getAllUsers} from '../../firebase/fireInit'
import {flexing} from "../../styles/dimensions/dims";
import {createCircle, createSquare} from '../../styles/globals/shapes'
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../../design/spacer";
import Pif from "../../components/listings/pif";
import Header from "../../components/headers/header";
import FilterButton from "../../components/buttons/filterButton";
import {getOrgDeeds} from "../../firebase/fireStarter";
import MyPif from "../../components/listings/myPif";

export default class OrgDeeds extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deeds:[],
            refreshing:false
        }

    }

    componentDidMount() {
        this.getMyDeeds()
    }

    getMyDeeds = async () => {
         let response = await getOrgDeeds(false);
         if(response.passed) {
             this.setState({deeds:response.data})
         }
    }


    render() {
        let DATA = this.state.deeds;

        return (
            <Animated.View style={[{height:'100%',width:'100%',background:'white'}]}>
                <Spacer spacing={.075}/>

                <FlatList
                    refreshControl={<RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.refreshing}
                        onRefresh={()=>{
                            this.getMyDeeds();
                        }} />}
                    contentContainerStyle={{width:'100%',marginLeft:'0%',paddingBottom:'25%'}}
                    data={DATA}
                    renderItem={({item,index}) => (
                        <MyPif
                            ableToLoadComments={true}

                              route={this.props.route} navigation={this.props.navigation} data={item} userUid={item.userUid}/>
                    )}
                    keyExtractor={item => item.id}
                />



            </Animated.View>
        )
    }


}
