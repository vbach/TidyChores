// import the express router
const router = require('express').Router();
// import the chore controller
const choresCtrl = require('../controllers/chores');
const auth = require('../middleware/auth');
// GET /chores
router.get('/', auth, choresCtrl.getChores);
// GET /chores?childId=___
router.get('/', auth, choresCtrl.getChildChores);
// GET /chores/:id
router.get('/:id', auth, choresCtrl.getOneById);
// POST /chores
router.post('/', auth, choresCtrl.createChore);
// PUT /chores/:id
router.put('/:id', auth, choresCtrl.updateChore);
// DELETE /chores/:id
router.delete('/:id', auth, choresCtrl.removeChore);
// export the route from this file
module.exports = router;
