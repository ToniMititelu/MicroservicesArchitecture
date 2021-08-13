const { Router } = require("express");
const controller = require("../controllers/controller");
const authenticationMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const adminOrOwnerMiddleware = require("../middlewares/adminOrOwner");

const router = new Router();

router.get('/test123/', (req, res) => { return res.json({'msg': 'ok reload'}) });

router.get('/', authenticationMiddleware, adminMiddleware, controller.getShipments);
router.get('/mine', authenticationMiddleware, controller.getMyShipments);
router.get('/:id', authenticationMiddleware, adminOrOwnerMiddleware, controller.getShipment);

router.get('/addresses/', authenticationMiddleware, adminMiddleware, controller.getAllAddresses);
router.get('/addresses/mine/', authenticationMiddleware, controller.mine);
router.get('/addresses/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.getAddress);

router.post('/', authenticationMiddleware, controller.createShipment);
router.post('/addresses/', authenticationMiddleware, controller.createAddress);

router.put('/addresses/:id/', authenticationMiddleware, adminOrOwnerMiddleware, controller.updateAddress);

router.delete('/addresses/:id/',  authenticationMiddleware, adminOrOwnerMiddleware, controller.deleteAddres);

module.exports = router;