import React from 'react'
import { Link , useLocation , useNavigate} from 'react-router-dom';
import './HomeMainbar.css';
import QuestionList from "./QuestionList"
import { useSelector } from 'react-redux';

const HomeMainbar = () => {

  const user = 1;
  const navigate = useNavigate();
  const questionsList = useSelector(state => state.questionReducer);

  // var questionsList = [{
  //     id: 1 ,
  //     upVotes:3 ,
  //     downVotes : 2,
  //     noOfAnswers : 2,
  //     questionTitle: "What is a function?",
  //     questBody : "It meant to be",
  //     questionTags : ["java" , 'node js' , "react js" , "mongodb"],
  //     userPosted : "mano",
  //     userId : 1,
  //     askedOn : 'jan 1',
  //     answer : {
  //       answerBody : "Answer",
  //       userAnswered : "kumar",
  //       answeredOn : "jan 2",
  //       userId : 2,
  //     }
  //   },
  //   {
  //     id: 2 ,
  //     upVotes:3 ,
  //     downVotes : 2,
  //     noOfAnswers : 0,
  //     questionTitle: "What is a function?",
  //     questBody : "It meant to be",
  //     questionTags : ["javacript" , "A" , "python"],
  //     userPosted : "mano",
  //     userId : 2,
  //     askedOn : 'jan 1',
  //     answer : {
  //       answerBody : "Answer",
  //       userAnswered : "kumar",
  //       answeredOn : "jan 2",
  //       userId : 2,
  //     }
  //   },
  //  {
  //     id: 3 ,
  //     upVotes:3 ,
  //     downVotes : 2,
  //     noOfAnswers : 0,
  //     questionTitle: "What is a function?",
  //     questBody : "It meant to be",
  //     questionTags : ["javascript" , "A" , "python"],
  //     userPosted : "mano",
  //     userId : 1,
  //     askedOn : 'jan 1',
  //     answer : {
  //       answerBody : "Answer",
  //       userAnswered : "kumar",
  //       answeredOn : "jan 2",
  //       userId : 2,
  //     }
  //   },

  
  // ]


  
  const checkAuth = () =>{
    if(user === null){
      navigate('/Auth');
      alert("Login to ask a question");
    }
    else{
      navigate('/AskQuestion');
    }
  }
  const location = useLocation();

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }


        <button onClick = {checkAuth} className='ask-btn'>Ask Question</button>

      </div>

      <div>
        {
          questionsList.data === null ?
          <h1>Loading...</h1> : 
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar