const { Rewards } = require('../models');
// get all rewards
exports.getRewards = (req, res) => {
  // run find all function
  const rewards = Rewards.findAll();

  res.json(rewards);
};

// get one reward
exports.getOneById = (req, res) => {
  // get id from params
  const { id } = req.params;
  // search children for id
  const rewards = Rewards.findByPk(id);
  // if no id is found
  if (!rewards) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if id is found return data
  res.json(rewards);
};

// add a reward
exports.createRewards = (req, res) => {
  const { description, value } = req.body;

  const id = Rewards.create({ description, value });

  res.json({ id });
};

// update reward
exports.updateReward = (req, res) => {
  const { id } = req.params;
  const updatedReward = Rewards.update(req.body, id);
  res.json(updatedReward);
};

// delete reward
exports.removeReward = (req, res) => {
  // get id
  const { id } = req.params;
  // remove reward
  Rewards.destroy(id);
  res.sendStatus(200);
};
