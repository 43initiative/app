import {SHOW_TOAST, SET_LOADING} from "./actionTypes";

const INITIAL_STATE = {
    showLoading:false,
    showToast:false,
    headline:'test',
    subline:'test',
    icon:'close-circle'
};

const Navigation  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case SET_LOADING : {
            return {
                ...state,
                showLoading: action.payload
            }
        }

        case SHOW_TOAST : {
            return {
                ...state,
                showToast: action.payload.showToast,
                headline:action.payload.headline,
                subline:action.payload.subline,
                icon:action.payload.icon
            }
        }

    }

}

export default Navigation;
