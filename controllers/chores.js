const { Chores } = require('../models');

// get all chores
exports.getChores = async (req, res) => {
  // run find all function
  const chores = await Chores.findAll();

  res.json(chores);
};

// get all the chores that belong to one child
exports.getChildChores = async (req, res) => {
  // get the child id from the query
  const { childId } = req.query;

  const childChores = await Chores.findAll({ where: { childId } });
  // respond with json of the child's chore array
  res.json(childChores);
};

// find one chore by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our chore model for the chore
  const chore = await Chores.findByPk(id);
  // if no chore is found
  if (!chore) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }
  // if the chore is found send it back.
  res.json(chore);
};

// add a new chore
exports.createChore = async (req, res) => {
  // get the title and type values from the request body
  const { description, points, day, childId } = req.body;

  try {
    const newChore = await Chores.create({
      description,
      points,
      day,
      childId
    });
    res.json({ id: newChore.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing chore
exports.updateChore = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    const [, [updatedChore]] = await Chores.update(req.body, {
      where: { id },
      returning: true
    });

    res.json(updatedChore);
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete a chore
exports.removeChore = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the chore
  await Chores.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
