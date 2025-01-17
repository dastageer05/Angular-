const {Router} = require('express');
const user = require('../controllers/user')
const router = Router();

router.get('/signin', user.Signin);
router.get('/signup', user.Signup);

router.post('/signin', user.signin);
router.post('/signup', user.signup);

router.get('/logout', user.logout);

module.exports = router;