// load in the chore model
const { Chores } = require('../models');
// get all the chores that belong to one child
exports.getChildChores = (req, res) => {
  // get the child id from the query
  const { childId } = req.query;
  // run the find all function on the model
  const chores = Chores.findAll();
  // filter the chores to only chores for this child
  const childChores = chores.filter(chore => chore.childId === childId);
  // respond with json of the child's chore array
  res.json(childChores);
};

// find one chore by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our chore model for the chore
  const chore = Chores.findByPk(id);
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
exports.createChore = (req, res) => {
  // get the title and type values from the request body
  const { value, childId } = req.body;
  // create the item and save the new id
  const id = Chores.create({ value, childId });
  // send the new id back to the request
  res.json({ id });
};

// update an existing chore
exports.updateChore = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // update the chore with any data from the req.body and the id
  const updateChore = Chores.update(req.body, id);
  // respond with the updated chore
  res.json(updateChore);
};

// delete a chore
exports.removeChore = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the chore
  Chores.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
