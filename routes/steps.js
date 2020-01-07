// import the express router
const router = require('express').Router();
// import the chore controller
const stepsCtrl = require('../controllers/steps');
const auth = require('../middleware/auth');
// GET /steps
router.get('/', stepsCtrl.getSteps);
// GET /steps/:id
router.get('/:id', stepsCtrl.getStepsForChore);
// POST /steps
router.post('/', stepsCtrl.createStep);
// PUT /steps/:id
router.put('/:id', stepsCtrl.updateStep);
// DELETE /steps/:id
router.delete('/:id', stepsCtrl.removeStep);
// export the route from this file
module.exports = router;
