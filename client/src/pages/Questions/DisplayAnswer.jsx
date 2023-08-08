import React from 'react';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { useParams , Link } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import { deleteAnswer } from '../../actions/question';
import "./Questions.css";

const DisplayAnswer = ({question , handleShare}) => {

  const dispatch = useDispatch();
  const {_id} = useParams();
  const User = useSelector(state => state.currentUserReducer);
  const handleDelete = (answerId ,noOfAnswers) =>{
    dispatch(deleteAnswer(_id , answerId ,noOfAnswers-1));
  }
  
  return (
    <div>
        {  
          question.answer.map((ans) => (
              <div className="display-ans" >
                  <p>{ans.answerBody}</p>
                  <div className="question-action-user">
                    <div>
                      <button type = "button" onClick={handleShare}>Share</button>
                      {
                        User?.message?._id === ans?.userId && (
                            <button type = "button" onClick={() => handleDelete(ans._id , question.noOfAnswers)}>Delete</button>
                        )
                      }  
                      </div>              
                  </div>
                  <div>
                    <p>answer on {moment(ans.answeredOn).fromNow()}</p>
                    <Link to = {`/Users/${ans.userId}`} className='user-link' style = {{color : "#0086d8" , textDecoration: "none"}}>
                      <Avatar backgroundColor= "green" px = "8px" py = "5px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                      <div>
                          {ans.userAnswered}
                      </div>
                    </Link>
                  </div>
              </div>
          ))
        }
    </div>
  )
}

export default DisplayAnswer;