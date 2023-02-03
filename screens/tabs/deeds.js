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
import {getUserDeeds} from "../../firebase/fireStarter";
import MyPif from "../../components/listings/myPif";

export default class Deeds extends React.Component {
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
         let response = await getUserDeeds(true);
         if(response.passed) {
             this.setState({deeds:response.data})
         }
    }



    // addAPif = async () => {
    //     if(!this.state.db) {
    //         await this.startInit()
    //     }
    //     let pif = {
    //         userName:'mangicode',
    //         userId:'KH5vtjQg6HPOTHEFTfln',
    //         userImg:'https://cdn.thehollywoodgossip.com/uploads/2020/04/kylie-jenner-sexy.png',
    //         timestamp:Date.now(),
    //         imgIncluded:true,
    //         img:'https://www.intouchweekly.com/wp-content/uploads/2019/08/kylie-jenner-sexiest-moments-02.jpg?fit=772%2C762&quality=86&strip=all',
    //         location:{
    //             lat:0,
    //             long:0
    //         },
    //         likes:0,
    //         inspos:0,
    //         inspoList:[],
    //         likeList:[],
    //         post:'Today I fingerbanged Kylie Jenner, she was horny and she needed it, I decided to pay it forward',
    //         inspired:false,
    //         public:true,
    //     }
    //
    //     return addPif(this.state.db,pif)
    //
    //
    // }
    //
    // getAPif = async () => {
    //     //eYjAI2Syuoz8wwM49wIW
    //     if(!this.state.db) {
    //         await this.startInit()
    //     }
    //
    //     return getSpecificPif(this.state.db,'eYjAI2Syuoz8wwM49wIW')
    //
    //
    // }
    //
    // getAllUsers = async () => {
    //     //eYjAI2Syuoz8wwM49wIW
    //     if(!this.state.db) {
    //         await this.startInit()
    //     }
    //
    //     let users =  await getAllUsers(this.state.db)
    //     console.log(users)
    //
    // }
    //
    // getAllDeeds = async () => {
    //     let response = await getAllDeeds();
    //     if(response.passed) {
    //         this.setState({deeds:response.data})
    //     }
    // }

    render() {
      // let DATA = [];
        let DATA = this.state.deeds;
        const EmptyListMessage = ({ item }) => {
            return (
                // Flat List Item
                <Text style={{padding: 10,
                    fontSize: 18,
                    textAlign: 'center'}}>
                    No Data Found
                </Text>
            );
        };
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
                    ListEmptyComponent={()=>{return(<View style={[{width:'100%',height:Dimensions.get('window').height * .8,backgroundColor:'transparent'},flexing.centerColumn]}>
                        <Text style={[{fontSize:18,color:'darkslategray',width:'75%',textAlign:'center'}]}>Seems like you haven't posted any good deeds yet, press the  <Ionicons name={'ios-add-circle'} size={20} color={'darkslategray'}/> icon above to make your first post!</Text>
                    </View>)}}
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
