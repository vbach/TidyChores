// import the express router
const router = require('express').Router();
// import the chore controller
const choresCtrl = require('../controllers/chores');
// GET /chores?childId=___
router.get('/', choresCtrl.getChildChores);
// GET /chores/:id
router.get('/:id', choresCtrl.getOneById);
// POST /chores
router.post('/', choresCtrl.createChore);
// PUT /chores/:id
router.put('/:id', choresCtrl.updateChore);
// DELETE /chores/:id
router.delete('/:id', choresCtrl.removeChore);
// export the route from this file
module.exports = router;
