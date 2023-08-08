import { useState } from 'react';
import { useParams , Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import copy from 'copy-to-clipboard';

import upVote from "../../assets/sort-up.svg";
import downVote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from './DisplayAnswer';
import {deleteQuestion, postAnswer , voteQuestion} from '../../actions/question';

const QuestionDetails = () => {
    
    
    const questionsList = useSelector(state => state.questionReducer);
    const {_id} = useParams();
    const location = useLocation();

    // var questionsList = [{
    //     id: '1' ,
    //     upVotes:3 ,
    //     downVotes : 2,
    //     noOfAnswers : 2,
    //     questionTitle: "What is a function?",
    //     questBody : "It meant to be",
    //     questionTags : ["java" , 'node js' , "react js" , "mongodb"],
    //     userPosted : "mano",
    //     userId : '1',
    //     askedOn : 'jan 1',
    //     answer : [{
    //       answerBody : "Answer",
    //       userAnswered : "kumar",
    //       answeredOn : "jan 2",
    //       userId : '2',
    //     }]
    //   },
    //   {
    //     id:'2',
    //     upVotes:3 ,
    //     downVotes : 2,
    //     noOfAnswers : 0,
    //     questionTitle: "What is a function?",
    //     questBody : "It meant to be",
    //     questionTags : ["javacript" , "A" , "python"],
    //     userPosted : "mano",
    //     userId : '1',
    //     askedOn : 'jan 1',
    //     answer : [{
    //       answerBody : "Answer",
    //       userAnswered : "kumar",
    //       answeredOn : "jan 2",
    //       userId : '2',
    //     }]
    //   },
    //  {
    //     id: '3',
    //     upVotes:3 ,
    //     downVotes : 2,
    //     noOfAnswers : 0,
    //     questionTitle: "What is a function?",
    //     questBody : "It meant to be",
    //     questionTags : ["javascript" , "A" , "python"],
    //     userPosted : "mano",
    //     userId : '1',
    //     askedOn : 'jan 1',
    //     answer : [{
    //       answerBody : "Answer",
    //       userAnswered : "kumar",
    //       answeredOn : "jan 2",
    //       userId : '2',
    //     }]
    //   },
  
    
    // ]
    const [Answer , setAnswer] = useState('');
    const User = useSelector(state => state.currentUserReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = 'http/localhost:3000/';

    const handlePosAnswer = (e , answerLength) =>{
        e.preventDefault();
        if(User === null){
            alert("Please login or signup to answer the question");
            navigate('/Auth');
        }
        else{
            if(Answer === ''){
                alert("Enter an answer before submitting");
            }
            else{
                console.log({_id,answerLength , user:  User.message.name});
                dispatch(postAnswer({_id , noOfAnswers:answerLength+1 , answerBody : Answer , userAnswered : User.message.name , userId : User.message._id}));
            }
        }
    }

    const handleShare = () =>{
        copy(url + location.pathname);
        alert('Copied url : '+url+location.pathname);
    }
    const handleDelete = () =>{
        dispatch(deleteQuestion(_id , navigate));
    }
    const handleUpVote = () =>{
        console.log('Upvoting');
        dispatch(voteQuestion(_id,'upvote', User.message._id));
    }
    const handleDownVote = () =>{
        dispatch(voteQuestion(_id,'downvote', User.message._id));
    }

  return (
    <div className='question-details-page'>
        {
            questionsList.data === null ? (<h1>Loading...</h1>) 
            : 
            (<>
                {
                    questionsList.data.filter(question => question._id === _id)
                    .map(question => (<div key = {question._id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className='question-votes'>
                                    <img type = 'button' src={upVote} alt='' width = "18" onClick={handleUpVote}/>

                                    <p>{question.upVote.length - question.downVote.length}</p>

                                    <img type = 'button' src={downVote} alt="" width = "18" onClick={handleDownVote}/>
                                </div>

                                <div style = {{width : "100%"}}>
                                    <p>{question.questBody}</p>
                                    <div className="question-details-tags">
                                        {
                                            question.questionTags.map((tag) => (
                                                <p key = {tag}>{tag}</p>
                                            ))
                                        }
                                    </div>

                                    <div className="question-action-user">
                                        <div>
                                            <button type = "button" onClick={handleShare}>Share</button>
                                            {
                                                User?.message?._id === question?.userId && (
                                                    <button type = "button" onClick={handleDelete}>Delete</button>
                                                )
                                            }
                                        </div>
                                       <div>
                                            <p>Asked { moment(question.askedOn).fromNow()}</p>
                                            <Link to = {`/Users/${question.userId}`} className='user-link' style = {{color : "#0086d8"}}>
                                                <Avatar backgroundColor= "orange" px = "8px" py = "5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                <div>
                                                    {question.userPosted}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {
                            question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{question.noOfAnswers} answers</h3>
                                    <DisplayAnswer key = {question._id} question = {question} handleShare = {handleShare}/>
                                </section>
                            )
                        }

                        <section className='post-ans-container'>
                            <h3>Your Answer</h3>

                            <form onSubmit={(e) => handlePosAnswer(e , question.answer.length)}>
                                <textarea name="" id="" cols="30" rows="10" onChange = {e => setAnswer(e.target.value)}></textarea> <br/>
                                <input type = "submit" className='post-ans-btn' value = 'Post Your Answer' />
                            </form>

                            <p>Browse other Question tagged
                                {
                                    question.questionTags.map((tag) => (
                                        <Link to = "/Tags" key = {tag} className='ans-tags'> {tag} </Link>
                                    ))
                                } or 
                                <Link to = "/AskQuestion" style = {{textDecoration : "none" , color : "#009dff" }}> ask your own question.</Link>
                            </p>
                        </section>
                    </div>))
                }
            </>)
        }
    </div>
  )
}

export default QuestionDetails