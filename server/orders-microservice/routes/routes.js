const { Router } = require("express");
const controller = require("../controllers/controller");
const authenticationMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const adminOrOwnerMiddleware = require("../middlewares/adminOrOwner");

const router = new Router();

router.get('/test123/', (req, res) => { return res.json({'msg': 'ok reload'}) });
router.get('/', authenticationMiddleware, adminMiddleware, controller.getAllOrders);
router.get('/mine/', authenticationMiddleware, controller.getMyOrders);
router.get('/mine/confirmation/', authenticationMiddleware, controller.getOrdersForMyConfirmation);
router.get('/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.getOrder);
// router.get('/:id/confirm/', authenticationMiddleware, adminOrOwnerMiddleware, controller.confirmOrder);
router.get('/:id/confirm/', controller.confirmOrder);

router.post('/', authenticationMiddleware, controller.createOrder);
router.delete('/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.deleteOrder);

module.exports = router;