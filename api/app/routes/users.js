const router = require('express').Router();

// import controller
const usersCtrl = require('../controllers/users');

// GET /users *TESTING ONLY
// router.get('/', usersCtrl.getUsers);

// POST /users
router.post('/signup', usersCtrl.registerUsers);

// POST /users/login
router.post('/login', usersCtrl.loginUsers);

// GET POST /users/forgotpassword
//forgot password
app.get('users/forgot_password', userHandlers.render_forgot_password_template);
app.post('/users/forgot_password', userHandlers.forgot_password);

module.exports = router;
