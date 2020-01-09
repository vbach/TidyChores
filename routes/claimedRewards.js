const router = require('express').Router();

// import controller
const rewardCtrl = require('../controllers/claimedRewards');
const auth = require('../middleware/auth');
// GET /reward
router.get('/', rewardCtrl.getRewards);

// GET /rewards/:id
router.get('/:id', rewardCtrl.getOneById);

// POST /reward
router.post('/', rewardCtrl.createRewards);

// PUT /reward
router.put('/:id', auth, rewardCtrl.updateReward);

// DELETE /reward
router.delete('/:id', auth, rewardCtrl.removeReward);

module.exports = router;
