const INITIAL_STATE = {
    fireStoreDb:null
};

const Globe  = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        default:
            return state;

        case 'STORE_FIRESTORE_DB' : {
            console.log(action.payload,'pay')
            return {
                ...state,
                fireStoreDb: action.payload
            }
        }
    }
}

export default Globe;
