const router = require('express').Router();

// import controller
const rewardCtrl = require('../controllers/claimedRewards');
const auth = require('../middleware/auth');
// GET /reward
router.get('/', rewardCtrl.getClaimedRewards);

// GET /rewards/:id
router.get('/:id', auth, rewardCtrl.getClaimedById);

// POST /reward
router.post('/', auth, rewardCtrl.createClaimedRewards);

// PUT /reward
router.put('/:id', auth, rewardCtrl.updateClaimedReward);

// DELETE /reward
router.delete('/:id', auth, rewardCtrl.removeClaimedReward);

module.exports = router;
