// import the express router
const router = require('express').Router();
// import the chore controller
const stepsCtrl = require('../controllers/steps');
const auth = require('../middleware/auth');
// GET /steps
router.get('/', auth, stepsCtrl.getSteps);

// GET /steps/:id
router.get('/:id', auth, stepsCtrl.getOneById);

// POST /steps
router.post('/', auth, stepsCtrl.createStep);

// PUT /steps/:id
router.put('/:id', auth, stepsCtrl.updateStep);

// DELETE /steps/:id
router.delete('/:id', auth, stepsCtrl.removeStep);

// export the route from this file
module.exports = router;
