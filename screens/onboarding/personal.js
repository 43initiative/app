import React from 'react';
import {
    TouchableWithoutFeedback, View, Animated, Text, TouchableOpacity, Pressable, Keyboard
} from 'react-native';
import VStack from "../../designComps/vstack";
import RoundedButton from "../../components/buttons/roundedButton";
import FormInput from "../../components/inputs/formInput";
import Hstack from "../../designComps/hstack";
import Spacer from "../../design/spacer";
import FauxButtonInput from "../../components/inputs/fauxButtonInput";
import {Picker} from "@react-native-picker/picker";
import {Ionicons} from "@expo/vector-icons";
import {flexing} from "../../styles/dimensions/dims";
import {storeControllers} from "../../reducers/controllers";
import {SET_USER_BASIC_DETAILS} from "../../reducers/actionTypes";


export default class Personal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName:'',
            lastName:'',
            phone:null,
            birthdayMonth:'January',
            birthdayYear:'1989',
            city:'',
            state:'',
            showMonthPicker:false,
            showYearPicker:false,
            yearOptions:[1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],
            monthOptions:[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
            ],
            states :
                ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

        }

    }

    allFieldsMet = () => {
        return this.state.firstName !== '' && this.state.lastName !== '' && this.state.phone && this.state.birthdayMonth && this.state.birthdayYear
    }

    returnMonthPicker = () => {
        if(this.state.monthPicker) {
            return( <View style={[{position:'absolute',top:'75%',height:'15%',width:'100%'}]}>
                <View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%'}]}>
                    <TouchableOpacity onPress={()=>{this.setState({monthPicker:false})}}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({monthPicker:false})}}>
                    <Text>Select</Text>
                </TouchableOpacity>
                </View>
                <Picker
                    style={{backgroundColor:'white'}}
                    ref={(ref)=>{this.monthPicker = ref;}}
                    selectedValue={this.state.birthdayMonth}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({birthdayMonth:itemValue},()=>{
                            this.monthPicker.blur()
                        })
                    }>
                    {this.state.monthOptions.map((val)=>(
                        <Picker.Item label={val} value={val} />
                    ))}


                </Picker>
            </View>)
        }

    }

    allowContinue = () => {
        return this.state.firstName !== '' &&
            this.state.lastName !== ''
        && this.state.phone !== null &&
            this.state.birthdayMonth && this.state.birthdayYear
    }

    returnYearPicker = () => {
        if(this.state.yearPicker) {
            return( <View style={[{position:'absolute',top:'75%',height:'15%',width:'100%'}]}>
                <View style={[flexing.rowBetween,{width:'90%',marginLeft:'5%'}]}>
                    <TouchableOpacity onPress={()=>{this.setState({yearPicker:false})}}>
                        <Text style={[{color:'red'}]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({yearPicker:false})}}>
                        <Text style={[{color:'black'}]}>Select</Text>
                    </TouchableOpacity>
                </View>
                <Picker
                    style={{backgroundColor:'white'}}
                    ref={(ref)=>{this.yearPicker = ref;}}
                    selectedValue={this.state.birthdayYear}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({birthdayYear:itemValue})
                    }>
                    {this.state.yearOptions.reverse().map((val)=>(
                        <Picker.Item label={`${val}`} value={`${val}`} />
                    ))}


                </Picker>
            </View>)
        }

    }

    saveAndContinue = async () => {
        let store = storeControllers.store;
        store.dispatch({type:'SET_USER_BASIC_DETAILS',payload:this.state});
        this.props.navigation.navigate('AddBioScreen')
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <Animated.View style={[{backgroundColor:'white',width:'100%',height:'100%'}]}>
            <VStack jc={'space-around'} width={1} trueSize={false} height={.9}>
                <VStack al={'flex-start'} jc={'space-around'} height={.15} width={.9} trueSize={false} style={{}}>
                    <Text style={[{fontSize:25,fontWeight:'bold',color:'#101010',width:'100%'}]}>Let's Get Started</Text>
                    <Text style={[{fontSize:13.75,color:'gray',width:'85%'}]}>
                        We just need a few bits of information before you get to the good stuff.
                    </Text>
                </VStack>
                <VStack jc={'flex-start'} width={1} height={.6} style={{backgroundColor:'transparent'}}>

                    <Hstack jc={'space-between'} style={{borderBottomWidth:1,borderColor:'#e3e3e3'}} width={.9} height={.15}>
                        <FormInput
                            label={'First Name'}
                            width={.4}  value={this.state.firstName}
                                    changeDetection={(val)=>{this.setState({firstName:val})}}
                                    placeholder={'John'} />
                        <FormInput
                            label={'Last Name'}
                            width={.4}
                                   value={this.state.lastName}
                                    changeDetection={(val)=>{this.setState({lastName:val})}}
                                    placeholder={'Smith'} />
                    </Hstack>
<Spacer spacing={.025}/>
                    <Hstack jc={'space-between'} style={{borderBottomWidth:1,borderColor:'#e3e3e3'}} width={.9} height={.15}>
                        <FauxButtonInput
                            pressed={()=>{this.setState({monthPicker:true},()=>{
                                Keyboard.dismiss()
                            })}}
                            label={'Birth Month'}
                            autoComplete={'birth-month'}
                            width={.4}  value={this.state.birthdayMonth}
                            text={this.state.birthdayMonth} />
                        <FauxButtonInput
                            pressed={()=>{this.setState({yearPicker:true},()=>{
                                Keyboard.dismiss()
                            })}}
                            label={'Birth Year'}
                            autoComplete={'birth-year'}
                            width={.4}  value={this.state.birthdayYear}
                            text={this.state.birthdayYear} />
                    </Hstack>
                    <Spacer spacing={.025}/>

                    <Hstack jc={'space-between'} style={{borderBottomWidth:1,borderColor:'#e3e3e3'}} width={.9} height={.15}>
                        <FormInput
                            label={'Phone Number'}
                            isPhone
                            width={.9}  value={this.state.phone}
                            changeDetection={(val)=>{this.setState({phone:val})}}
                            placeholder={'555-555-5555'}
                            hasIcon
                            icon={'ios-call'}
                            size={20}
                            color={'#c6302c'}
                        />

                    </Hstack>

                                </VStack>
                <RoundedButton disabled={!this.allowContinue()} pressed={()=>{this.saveAndContinue()}} style={[{width:'80%',height:'7.5%'}]} bgColor={'#3EB489'} text={'Continue'}/>

            </VStack>
                {this.returnMonthPicker()}
                {this.returnYearPicker()}
            </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


}
