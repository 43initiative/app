import {
    SET_ORG_PUBLIC, SET_ORG_PRIVATE, SET_ORG_ID, UPDATE_ORG_BIO, UPDATE_ORG_IMG
} from "./actionTypes";

const INITIAL_STATE = {
    publicData:null,
    privateData:null,
    activeOrgId:null

};

const OrgData  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case SET_ORG_PUBLIC : {
            return {
                ...state,
                publicData: action.payload
            }
        }

        case SET_ORG_PRIVATE : {
            return {
                ...state,
                privateData: action.payload
            }
        }

        case SET_ORG_ID : {
            let data = action.payload
            return {
                ...state,
                activeOrgId: data
            }
        }

        case UPDATE_ORG_BIO : {
            let data = state.publicData;
            data.aboutMe = action.payload
            return {
                ...state,
                publicData: data
            }
        }

        case UPDATE_ORG_IMG : {
            let data = state.publicData;
            data.imgProvided = action.payload.imgProvided
            data.img = action.payload.img
            return {
                ...state,
                publicData: data
            }
        }





    }

}

export default OrgData;
