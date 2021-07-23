const {Router} = require('express');
const catCtrl = require('../controllers/category.controller');
const protectRoute = require('../middlewares/protect-routes');

const router = Router();

router.get('/categorias', protectRoute, catCtrl.renderCategory);

module.exports = router;