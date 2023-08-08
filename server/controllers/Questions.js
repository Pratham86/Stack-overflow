import Questions from "../models/Questions.js";
import mongoose from "mongoose";

export const AskQuestion = async (req,res) =>{
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);

    try{
        
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    }
    catch(err){
        console.log(err);
        res.status(400).json({message : "Couldn't post "});
    }

}

export const getAllQuestions = async(req,res) => {
    try{
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

export const deleteQuestion = async(req , res) =>{
    const {_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }

    try{
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({
            message: "Successfully Deleted..."
        });
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            message: err.message
        });
    }
}
export const voteQuestion = async(req , res) =>{
    const {_id} = req.params;
    const {value , userId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }

    try{
        const question = await Questions.findById(_id);
        const upIndex = question.upVote.findIndex((_id) => _id === String(userId));
        const downIndex = question.downVote.findIndex((_id) => _id === String(userId));

        if(value === 'upvote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId));
            } 
            if(upIndex === -1){
                question.upVote.push(userId);
            }
            else{
                question.upVote = question.upVote.filter((_id) => _id !== String(userId))
            } 
        }
        else if(value === 'downvote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            } 
            if(downIndex === -1){
                question.downVote.push(userId);
            }
            else{
                question.downVote = question.downVote.filter((_id) => _id !== String(userId))
            } 
        }

        await Questions.findByIdAndUpdate(_id , question);
        
        res.status(200).json({
            message: "Successfully Voted..."
        });
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            message: err.message
        });
    }
}