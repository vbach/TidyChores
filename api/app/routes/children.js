const router = require('express').Router();
const protectedRoute = require('../utils/protectedRoute');
// import controller
const childrenCtrl = require('../controllers/children');

// GET /children
router.get('/', childrenCtrl.getChildren);

// GET /children?parentId=___
router.get('/', childrenCtrl.getUserChild);

// GET /children/:id
router.get('/:id', protectedRoute, childrenCtrl.getOneById);

// POST /children
router.post('/', protectedRoute, childrenCtrl.createChild);

// PUT /children
router.put('/:id', protectedRoute, childrenCtrl.updateChild);

// DELETE /children
router.delete('/:id', protectedRoute, childrenCtrl.removeChild);

module.exports = router;
