import express from 'express';
import { postAnswer  , deleteAnswer} from "../controllers/Answers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.patch("/post/:_id" , postAnswer);
router.patch("/delete/:_id" , deleteAnswer);


export default router;