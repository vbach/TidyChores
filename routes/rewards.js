const router = require('express').Router();

// import controller
const rewardCtrl = require('../controllers/rewards');
const auth = require('../middleware/auth');
// GET /reward
router.get('/', auth, rewardCtrl.getRewards);

// GET /rewards/:id
router.get('/:id', auth, rewardCtrl.getOneById);

// POST /reward
router.post('/', auth, rewardCtrl.createRewards);

// PUT /reward
router.put('/:id', auth, rewardCtrl.updateReward);

// DELETE /reward
router.delete('/:id', auth, rewardCtrl.removeReward);

module.exports = router;
