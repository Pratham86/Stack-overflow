import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req,res) =>{
    const{ _id} = req.params;
    const {noOfAnswers , answerBody , userAnswered , userId} = req.body;
    
    console.log(noOfAnswers);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }

    updateNoOfQuestions(_id , noOfAnswers);

    try{
        const updateQuestion = await Questions.findByIdAndUpdate(_id , { $addToSet : {'answer' : [{answerBody , userAnswered , userId}]}});

        res.status(200).json(updateQuestion);

    }catch(err){
        console.log(err);
        res.status(404).json({message : err.message});
    }
}

const updateNoOfQuestions = async (_id , noOfAnswers) =>{
    try{
        await Questions.findByIdAndUpdate( _id , { $set : { noOfAnswers : noOfAnswers}});
    }
    catch(err){
        console.log(err);
    }
}

export const deleteAnswer = async (req,res) =>{
    const {_id} = req.params;
    const {answerId , noOfAnswers} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer unavailable');
    }

    updateNoOfQuestions(_id , noOfAnswers);

    try{
        await Questions.updateOne(
            {_id},
            {$pull : {'answer' : { _id : answerId}}}
        );
        res.status(200).json({
            message: 'Answer deleted successfully'
        })
    }
    catch(err){
        res.status(405).json(err)
    }
}