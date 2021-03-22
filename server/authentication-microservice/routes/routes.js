const { Router } = require("express");
const controller = require("../controllers/controller");

const router = new Router();

router.get('/api/test', (req, res) => { return res.json({'msg': 'ok'}) });
router.get('/api/me');
router.get('/api/users');

router.post('/api/log-in');
router.post('/api/register', controller.register);

module.exports = router;