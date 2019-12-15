const router = require('express').Router();

// import controller
const usersCtrl = require('../controllers/users');
const passCtrl = require('../controllers/forgotPassword');
const auth = require('../middleware/auth');
// GET /users
router.get('/', auth, usersCtrl.getUser);

// POST /users
router.post('/signup', usersCtrl.registerUsers);

// POST /users/login
router.post('/login', usersCtrl.loginUsers);
router.post('/forgotPassword', passCtrl.forgotPassword);

module.exports = router;
