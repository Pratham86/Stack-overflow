import express from "express";
import mongoose  from "mongoose";
import cors from 'cors';
import users from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/answerRoutes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json({limit : "30mb" , extended : true}))

app.use(express.urlencoded({limit : "30mb" , extended : true}))

app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API");
})

app.use('/user',users);
app.use('/questions',questionRoutes);
console.log("in the index file");
app.use('/answer', answerRoutes);

const PORT = process.env.PORT || 5000;

// mongodb+srv://dhimanpratham86:@Jaydhiman1@cluster0.fn9t0yv.mongodb.net/?retryWrites=true&w=majority

// mongodb+srv://dhimanpratham86:<password>@cluster0.fn9t0yv.mongodb.net/

// mongodb+srv://dhimanpratham86:<password>@stack-overflow-clone.dcq7n1c.mongodb.net/

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL , {useNewUrlParser : true , useUnifiedTopology : true})
    .then(() => app.listen(PORT , () =>{console.log(`Server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))