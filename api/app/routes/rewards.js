const router = require('express').Router();

// import controller
const rewardCtrl = require('../controllers/rewards');

// GET /reward
router.get('/', rewardCtrl.getRewards);

// GET /rewards/:id
router.get('/:id', rewardCtrl.getOneById);

// POST /reward
router.post('/', rewardCtrl.createRewards);

// PUT /reward
router.put('/:id', rewardCtrl.updateReward);

// DELETE /reward
router.delete('/:id', rewardCtrl.removeReward);

module.exports = router;
