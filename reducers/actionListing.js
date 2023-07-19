import {UPDATE_ACTIONS_LISTINGS} from "./actionTypes";

const INITIAL_STATE = {
    actionListing:null
};

const Actions  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case UPDATE_ACTIONS_LISTINGS : {

            return {
                ...state,
                actionListing: action.payload
            }
        }
    }
}

export default Actions;
