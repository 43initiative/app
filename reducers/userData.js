import {SHOW_TOAST, SET_LOADING, STORE_PUBLIC_DATA, STORE_PRIVATE_DATA, UPDATE_BIO, UPDATE_IMG} from "./actionTypes";

const INITIAL_STATE = {
    publicData:null,
    privateData:null
};

const UserData  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case STORE_PUBLIC_DATA : {
            return {
                ...state,
                publicData: action.payload
            }
        }

        case STORE_PRIVATE_DATA : {
            return {
                ...state,
                privateData: action.payload
            }
        }

        case UPDATE_BIO : {
            let data = state.publicData;
            data.aboutMe = action.payload
            return {
                ...state,
                publicData: data
            }
        }

        case UPDATE_IMG : {
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

export default UserData;
