const router = require('express').Router();
// import controller
const childrenCtrl = require('../controllers/children');
const auth = require('../middleware/auth');
// GET /children
router.get('/', childrenCtrl.getChildren);

// GET /children/:id
router.get('/:id', childrenCtrl.getOneById);

// POST /children
router.post('/', auth, childrenCtrl.createChild);

// PUT /children
router.put('/:id', auth, childrenCtrl.updateChild);

// DELETE /children
router.delete('/:id', auth, childrenCtrl.removeChild);

module.exports = router;
