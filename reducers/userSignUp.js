import {
    SHOW_TOAST,
    SET_LOADING,
    SET_USER_BASIC_DETAILS,
    SET_USER_ABOUT_ME,
    SET_USER_IMAGING,
    SET_LOCATION,
    SET_ORG_BASIC_DETAILS
} from "./actionTypes";

const INITIAL_STATE = {
    firstName:'',
    lastName:'',
    displayName:'',
    birthMonth:'',
    aboutMe:'',
    birthYear:0,
    img:'',
    imgProvided:false,
    initials:'',
    city:'',
    state:'',
    website:'',
        lat:0,
        long:0,
    hasCompletedSignUp:true,
    isOrganization:false
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
                isOrganization:false,
                state:data.selectedState,
                initials:`${data.firstName.charAt(0)}.${data.lastName.charAt(0)}.`,
                displayName: `${data.firstName} ${data.lastName}`
            }
        }

        case SET_ORG_BASIC_DETAILS : {
            let data = action.payload;
            console.log(data,'in reducer')
            return {
                ...state,
                displayName:data.displayName,
                isOrganization: true,
                placeId:data.placeId,
                city:data.city,
                state:data.state,
                website:data.website,
                phone:data.phone,
                initials:`${data.displayName.charAt(0)}.${data.displayName.charAt(1)}.`,
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

        case 'RESET_SIGN_UP' : {
            let data = action.payload;
            return {
                ...state,
                firstName:'',
                lastName:'',
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
                hasCompletedSignUp:true,
                isOrganization:false
            }
        }

    }

}

export default UserSignUp;
