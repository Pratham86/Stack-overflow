import express from 'express';
import {login , signup} from '../controllers/auth.js';
import {getAllUsers , updateProfile} from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router
.route('/signup')
.post(signup)

router
.route('/login')
.post(login)

router
.route('/getAllUsers')
.get(getAllUsers)

router
.route('/update/:_id')
.patch(auth , updateProfile)

export default router;