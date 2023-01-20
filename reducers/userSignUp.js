import {
    SHOW_TOAST,
    SET_LOADING,
    SET_USER_BASIC_DETAILS,
    SET_USER_ABOUT_ME,
    SET_USER_IMAGING,
    SET_LOCATION
} from "./actionTypes";

const INITIAL_STATE = {
    firstName:'joe',
    lastName:'mangi',
    displayName:'',
    birthMonth:'',
    aboutMe:'',
    birthYear:0,
    img:'',
    imgProvided:false,
    initials:'',
    // city:'',
    // state:'',
        lat:0,
        long:0,
    hasCompletedSignUp:true
};

const UserSignUp  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case SET_USER_BASIC_DETAILS : {
            let data = action.payload;
            return {
                ...state,
                firstName:data.firstName,
                lastName:data.lastName,
                birthMonth:data.birthdayMonth,
                birthYear:data.birthdayYear,
                initials:`${data.firstName.charAt(0)}.${data.lastName.charAt(0)}.`,
                displayName: `${data.firstName} ${data.lastName}.`
            }
        }

        case SET_USER_ABOUT_ME : {
            let data = action.payload;
            return {
                ...state,
                aboutMe: data.aboutMe
            }
        }

        case SET_USER_IMAGING : {
            let data = action.payload;
            return {
                ...state,
                img: data.img,
                imgProvided: data.imgProvided
            }
        }

        case SET_LOCATION : {
            let data = action.payload;
            return {
                ...state,
                lat:data.lat,
                long:data.long
            }
        }

    }

}

export default UserSignUp;
