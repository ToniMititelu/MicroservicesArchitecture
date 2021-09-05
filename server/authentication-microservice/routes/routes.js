const { Router } = require("express");
const controller = require("../controllers/controller");
const authenticationMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const router = new Router();

router.get('/test', (req, res) => { return res.json({'msg': 'ok reload'}) });
router.get('/me', authenticationMiddleware, controller.me);
router.get('/users', authenticationMiddleware, controller.users);
router.get('/users/:id', controller.getUser);

router.put('/users/:id', authenticationMiddleware, controller.updateUser);

router.post('/login', controller.logIn);
router.post('/register', controller.register);
router.post('/refresh-token', controller.refreshToken);
router.post('/change-password', authenticationMiddleware, controller.changePassword);

module.exports = router;