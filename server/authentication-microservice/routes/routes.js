const { Router } = require("express");
const controller = require("../controllers/controller");
const authenticationMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const router = new Router();

router.get('/api/test', (req, res) => { return res.json({'msg': 'ok'}) });
router.get('/api/me', authenticationMiddleware, controller.me);
router.get('/api/users', authenticationMiddleware, adminMiddleware, controller.users);

router.post('/api/login', controller.logIn);
router.post('/api/register', controller.register);

module.exports = router;