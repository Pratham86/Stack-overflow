import axios from "axios";

const API = axios.create({ baseURL : 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login' , authData ,{headers:{"Content-Type" : "application/json"}});

export const signUp = (authData) => API.post('/user/signup' , authData , {headers:{"Content-Type" : "application/json"}});

export const postQuestion = (questionData) => API.post('/questions/Ask' , questionData , {headers:{"Content-Type" : "application/json"}});

export const getAllQuestions = () => API.get('/questions/get');

export const deleteQuestion = ( _id) => API.delete(`/questions/delete/${_id}`);
export const voteQuestion = ( _id , value, userId) => API.patch(`/questions/vote/${_id}`,{value , userId});

export const postAnswer = ( _id , noOfAnswers , answerBody , userAnswered,userId) => API.patch(`/answer/post/${_id}` ,  {noOfAnswers , answerBody , userAnswered , userId} );


export const deleteAnswer = ( _id , answerId , noOfAnswers) => API.patch(`/answer/delete/${_id}` ,  {answerId , noOfAnswers} );

export const fetchAllUsers = () => API.get('/user/getAllUsers')

export const updateProfile = ( _id , updateData) => API.patch(`/user/update/${_id}` , updateData)
