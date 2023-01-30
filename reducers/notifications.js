import {SHOW_TOAST, SET_LOADING, SET_NOTIF} from "./actionTypes";

const INITIAL_STATE = {
    newNotifications:false,
    notificationList:[]
};

const Notifications  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case SET_NOTIF : {
            return {
                ...state,
                newNotifications: action.payload.newNotifications,
                notificationList: action.payload.notificationList
            }
        }



    }

}

export default Notifications;
