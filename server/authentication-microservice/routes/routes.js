const { Router } = require("express");
const controller = require("../controllers/controller");
const authenticationMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const router = new Router();

router.get('/test', (req, res) => { return res.json({'msg': 'ok'}) });
router.get('/me', authenticationMiddleware, controller.me);
router.get('/users', authenticationMiddleware, adminMiddleware, controller.users);

router.post('/login', controller.logIn);
router.post('/register', controller.register);

module.exports = router;