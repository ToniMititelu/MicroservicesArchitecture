const { Router } = require("express");
const controller = require("../controllers/controller");
const authenticationMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const adminOrOwnerMiddleware = require("../middlewares/adminOrOwner");

const router = new Router();

router.get('/test123/', (req, res) => { return res.json({'msg': 'ok reload'}) });
router.get('/', authenticationMiddleware, adminMiddleware, controller.getAllOrders);
router.get('/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.getOrder);

router.post('/', authenticationMiddleware, controller.createOrder);
router.post('/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.confirmOrder);
router.delete('/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.deleteOrder);

module.exports = router;