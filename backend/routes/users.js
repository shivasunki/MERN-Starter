var express = require('express');
const { saveUser, fetchUsers, updateUser, deleteUser } = require('../controllers/userController');
var router = express.Router();




/* GET users listing. */
router.post('/user/create/', saveUser);
router.get('/users/', fetchUsers);
router.post('/users/update/:id', updateUser);
router.post('/users/delete/:id', deleteUser);

module.exports = router;
