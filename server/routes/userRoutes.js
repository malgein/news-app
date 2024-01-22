const express = require("express");
const{authUser, allUsers} = require('../controllers/userController') 



const router = express.Router();

router.route('/').get(allUsers)

router.route('/login').post(authUser)


module.exports = router;



