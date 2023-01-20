import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Image
} from 'react-native';
import {getAllPifs, initialize, addPif,getSpecificPif,getAllUsers} from '../firebase/fireInit'
import {flexing} from "../styles/dimensions/dims";
import {createCircle, createSquare} from '../styles/globals/shapes'
import {Ionicons} from "@expo/vector-icons";
import Spacer from "../design/spacer";
import Pif from "../components/listings/pif";
import Header from "../components/headers/header";
import FilterButton from "../components/buttons/filterButton";

export default class TestFetches extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

    }

    componentDidMount() {
        this.startInit()
    }

    startInit = async () => {
        let {db,app} = await initialize()
        return this.setState({db})
    }

    addAPif = async () => {
        if(!this.state.db) {
            await this.startInit()
        }
        let pif = {
            userName:'mangicode',
            userId:'KH5vtjQg6HPOTHEFTfln',
            userImg:'https://cdn.thehollywoodgossip.com/uploads/2020/04/kylie-jenner-sexy.png',
            timestamp:Date.now(),
            imgIncluded:true,
            img:'https://www.intouchweekly.com/wp-content/uploads/2019/08/kylie-jenner-sexiest-moments-02.jpg?fit=772%2C762&quality=86&strip=all',
            location:{
                lat:0,
                long:0
            },
            likes:0,
            inspos:0,
            inspoList:[],
            likeList:[],
            post:'Today I fingerbanged Kylie Jenner, she was horny and she needed it, I decided to pay it forward',
            inspired:false,
            public:true,
        }

        return addPif(this.state.db,pif)


    }

    getAPif = async () => {
        //eYjAI2Syuoz8wwM49wIW
        if(!this.state.db) {
            await this.startInit()
        }

       return getSpecificPif(this.state.db,'eYjAI2Syuoz8wwM49wIW')


    }

    getAllUsers = async () => {
        //eYjAI2Syuoz8wwM49wIW
        if(!this.state.db) {
            await this.startInit()
        }

        let users =  await getAllUsers(this.state.db)
console.log(users)

    }

    getAllPifs = async () => {

        if(!this.state.db) {
            await this.startInit()
        }

        let pifs =  await getAllPifs(this.state.db)
        console.log(pifs)

    }

    render() {
        return (
            <Animated.View style={[{marginTop:35,height:'100%',width:'100%',background:'white'}]}>

            </Animated.View>
        )
    }


}
