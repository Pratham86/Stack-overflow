import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import userSchema from '../models/auth.js'

export const signup = async (req,res) =>{
    const {name , email , password} = req.body;
    try{
        const existinguser = await userSchema.findOne({email});
        if(existinguser){
            return res.status(404).json({
                message : "user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 12);
        const newUser = await userSchema.create({name , email , password : hashedPassword});

        const token = jwt.sign({email : newUser.email , id: newUser._id} , process.env.JWT_SECRET , {expiresIn: '1hr'});

        res.status(200).json({
            message : newUser , token
        })
    }
    catch(err){
        res.status(500);
        return res.json({
            message : "Something went wrong"
        }); 
    }
}

export const login = async (req,res) =>{
    const {email , password} = req.body;
    try{
        const existinguser = await userSchema.findOne({email});
        if(!existinguser){
            return res.status(404).json({
                message : "user doesn't exist"
            })
        }

        const isPassCrt = await bcrypt.compare(password , existinguser.password);

        if(!isPassCrt){
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        const token = jwt.sign({email : existinguser.email  , _id: existinguser._id} , process.env.JWT_SECRET);

        console.log(existinguser);
        res.status(200).json({
            message : existinguser , token
        })
    }
    catch(err){
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

