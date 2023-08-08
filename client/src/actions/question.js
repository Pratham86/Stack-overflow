import * as api from '../api';

export const askQuestion = (questionData , navigate) => async (dispatch) => {
    try{
        const {data} = await api.postQuestion(questionData);
        dispatch({type : "POST_QUESTION" , payload : data});
        dispatch(fetchAllQuestions())
        navigate('/');
    }
    catch(err){
        console.log(err);
    }
}

export const fetchAllQuestions = () => async (dispatch) =>{
    try{
        const {data} = await api.getAllQuestions();

        dispatch({type : "FETCH_ALL_QUESTIONS", payload : data})
    }
    catch(err){
        console.log(err);
    }
}
export const deleteQuestion = (_id , navigate) => async (dispatch) =>{
    try{
        const {data} = await api.deleteQuestion(_id);
        
        dispatch(fetchAllQuestions());
        navigate('/')
    }
    catch(err){
        console.log(err);
    }
}
export const voteQuestion = (_id , value , userId) => async (dispatch) =>{
    try{
        const {data} = await api.voteQuestion(_id,value , userId);
        dispatch(fetchAllQuestions());
    }
    catch(err){
        console.log(err);
    }
}


export const postAnswer = (answerData) => async (dispatch) =>{
    try{
        const {_id , noOfAnswers , answerBody , userAnswered , userId} = answerData;
        
        const {data} = await api.postAnswer(_id , noOfAnswers , answerBody , userAnswered,userId);
        console.log("Answer Posted");

        dispatch({type : "POST_ANSWER", payload : data})
        dispatch(fetchAllQuestions())
    }
    catch(err){
        console.log(err);
    }
}
export const deleteAnswer = (_id , answerId , noOfAnswers) => async (dispatch) =>{
    try{
        const {data} = await api.deleteAnswer(_id , answerId , noOfAnswers);

        dispatch(fetchAllQuestions())
    }
    catch(err){
        console.log(err);
    }
}
