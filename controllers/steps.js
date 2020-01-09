const { Steps } = require('../models');

// get all chores
exports.getSteps = async (req, res) => {
  // run find all function
  const steps = await Steps.findAll();
  res.json(steps);
};

// find one step
exports.getOneById = async (req, res) => {
  // get id from params
  const { id } = req.params;
  // search step by id
  const step = await Steps.findByPk(id);
  // if no id is found
  if (!step) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if id is found return data
  res.json(step);
};

// get all the chores that belong to one child
exports.getStepsForChore = async (req, res) => {
  // get the child id from the query
  const { choreId } = req.query;

  const steps = await Steps.findAll({ where: { choreId } });
  // respond with json of the child's chore array
  res.json(steps);
};

// add a new chore
exports.createStep = async (req, res) => {
  // get the title and type values from the request body
  const { stepDescription, choreId } = req.body;

  try {
    const newStep = await Steps.create({
      stepDescription,
      choreId
    });
    res.json({ id: newStep.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing chore
exports.updateStep = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    const [, [updatedStep]] = await Steps.update(req.body, {
      where: { id },
      returning: true
    });

    res.json(updatedStep);
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete a chore
exports.removeStep = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the chore
  await Steps.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
