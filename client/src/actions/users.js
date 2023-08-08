import * as api from '../api';

export const fetchAllUsers = () => async (dispatch) =>{
    try {
        const {data} = await api.fetchAllUsers();
        
        dispatch({type : "FETCH_USERS" , payload : data});

    } catch (error) {
       console.log(error); 
    }
}

export const updateProfile = (_id , updateData) => async (dispatch) =>{
    try {
        const {data} = await api.updateProfile(_id, updateData)
        console.log("API call made");
        dispatch({type: "UPDATE_CURRENT_USER" , payload : data})
    } catch (error) {
        console.log(error.message)
    }
}