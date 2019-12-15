const { Rewards } = require('../models');
// get all rewards
exports.getRewards = async (req, res) => {
  // run find all function
  const rewards = await Rewards.findAll({ where: { parentId: req.user } });

  res.json(rewards);
};

// get one reward
exports.getOneById = async (req, res) => {
  // get id from params
  const { id } = req.params;
  // search rewards for id
  const rewards = await Rewards.findByPk(id);
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
exports.createRewards = async (req, res) => {
  const { description, value, parentId } = req.body;

  try {
    const newReward = await Rewards.create({
      description,
      value,
      parentId
    });
    res.json({ id: newReward.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update reward
exports.updateReward = async (req, res) => {
  const { id } = req.params;

  try {
    const [, [updatedReward]] = await Rewards.update(req.body, {
      where: { id },

      returning: true
    });

    res.json(updatedReward);
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete reward
exports.removeReward = async (req, res) => {
  // get id
  const { id } = req.params;
  // remove reward
  await Rewards.destroy({ where: { id } });
  res.sendStatus(200);
};
