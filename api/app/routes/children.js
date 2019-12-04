const router = require('express').Router();

// import controller
const childrenCtrl = require('../controllers/children');

// GET /children
router.get('/', childrenCtrl.getChildren);

// GET /children?parentId=___
router.get('/', childrenCtrl.getUserChild);

// GET /children/:id
router.get('/:id', childrenCtrl.getOneById);

// POST /children
router.post('/', childrenCtrl.createChild);

// PUT /children
router.put('/:id', childrenCtrl.updateChild);

// DELETE /children
router.delete('/:id', childrenCtrl.removeChild);

module.exports = router;
