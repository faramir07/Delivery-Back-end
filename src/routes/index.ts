import { Router } from 'express';
require('dotenv').config()
import User from './User'
import Registration from './Registration'

const routes = Router();

// ejemplo
routes.use('/user', User)
routes.use('/registration', Registration)

export default routes;
