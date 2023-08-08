import React , {useState}from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {askQuestion} from "../../actions/question.js"
import "./AskQuestion.css";

const AskQuestion = () => {
    const [questionTitle , setQuestionTitle] = useState('');
    const [questionBody , setQuestionBody] = useState('');
    const [questionTags , setQuestionTags] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const User = useSelector((state) => (state.currentUserReducer));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(User);
        dispatch(askQuestion({questionTitle , questionBody , questionTags , userPosted : User.message.name, userId : User?.message._id} , navigate));

    }
    const handleEnter = (e) =>{
        if(e.key === 'Enter'){
            setQuestionBody((body) => (body + "/n"));
        }
    }

    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask public Questions</h1>

                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor='ask-ques-title'>
                            <h4>Title</h4>
                            <p>Be specific and imagine you are asking a question to another person</p>

                            <input type = "text"  id = "ask-ques-title" placeholder='e.g. Is therean R function in finding the index of an element in a vector' onChange={(e) => setQuestionTitle(e.target.value)}/>
                        </label>

                        <label htmlFor='ask-ques-body'>
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer the question</p>

                            <textarea cols = "38" rows = "10" id ="ask-ques-body" onChange={(e) => setQuestionBody(e.target.value)}  onKeyPress={handleEnter}></textarea>
                        </label>

                        <label htmlFor='ask-ques-tags'>
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>

                            <input type = "text"  id = "ask-ques-body" placeholder = "e.g. xml javascript Wordpress" onChange={(e) => setQuestionTags(e.target.value.split(" "))}/>
                            
                        </label>
                    </div>

                    <button type = "submit" className='review-btn' >Review your question </button>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion