import {
    SET_EVENT_BUDGET, SET_EVENT_CUISINES,
    SET_EVENT_DATES, SET_EVENT_DESCRIPTION, SET_EVENT_DETAILS,
    SET_EVENT_GUESTS,
    SET_EVENT_TYPE,
    SET_LOADING,
    SHOW_TOAST
} from "./actionTypes";


export let storeControllers = {
    store:null,
    set setStore (store) {
        this.store = store;
        console.log('done')
    },
    get getStore () {
        return this.store;
    },
    get storeStatus () {
        return this.store !== null;
    },

     storeData () {
        return this.store.getState();
}
}

export const setStore = (store) => {
    console.log('setting store')
    storeControllers.store = store;
    console.log(storeControllers.getStore,'this is the store')
}

export const activateLoading = async () => {
   storeControllers.store.dispatch({type:SET_LOADING,payload:true})
}

export const deactivateLoading = async () => {
    storeControllers.store.dispatch({type:SET_LOADING,payload:false})
}



export const showToastMessage = async (headline,subline,icon) => {
    storeControllers.store.dispatch({type:SHOW_TOAST,payload:{
        showToast:true,
            headline,subline,icon
        }})

}

export const hideToastMessage = async () => {
    storeControllers.store.dispatch({type:SHOW_TOAST,payload:{
            showToast:false,
            headline :'',
            subline :'',
            icon:'close-circle'
        }})

}

//event creation controllers

export const setEventType = async (data) => {
   return  storeControllers.store.dispatch({type:SET_EVENT_TYPE,payload:data})
}

export const setCuisineTypes = async (data) => {
    let arr = [];
    for (const [key,value] of Object.entries(data)) {
        arr.push(key.toLowerCase())
    }
    return  storeControllers.store.dispatch({type:SET_EVENT_CUISINES,payload:arr})
}

export const setEventGuests = async (min,max) => {
    return  storeControllers.store.dispatch({type:SET_EVENT_GUESTS,payload:{min,max}})
}

export const setEventBudget = async (budget) => {
    return  storeControllers.store.dispatch({type:SET_EVENT_BUDGET,payload:budget})
}


// export const setEventDates = async (data) => {
//     return  storeControllers.store.dispatch({type:SET_EVENT_DATES,payload:data.map((val)=>{
//         let splitDate = val.split('-')
//             let month = months[parseInt(splitDate[1]-1)];
//             let day = splitDate[2]
//         return {date:val,times:[],textDate:`${month} ${day}, ${splitDate[0]}`}
//         })})
// }

export const setEventTimes = async (data) => {
    return  storeControllers.store.dispatch({type:SET_EVENT_DATES,payload:data})
}

export const setEventDescription = async (data) => {
    return  storeControllers.store.dispatch({type:SET_EVENT_DESCRIPTION,payload:data})
}

export const setEventDetails = async (data) => {
    return  storeControllers.store.dispatch({type:SET_EVENT_DETAILS,payload:data})
}

