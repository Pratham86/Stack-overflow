import React from 'react'
import Questions from "./Questions";

const QuestionList = ({questionsList}) => {
  return (
    <>
        {
            questionsList.map((question) => (
                <Questions key = {question._id} question = {question}/>
            ))
        }
        
    </>
  )
}

export default QuestionList