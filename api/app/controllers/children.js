const { Children } = require('../models');

// get all children
exports.getChildren = (req, res) => {
  // run find all function
  const children = Children.findAll();

  res.json(children);
};

// get all children that belong to one user
exports.getUserChild = (req, res) => {
  // get the decision id from the query
  const { parentId } = req.query;
  // run the find all function on the model
  const children = Children.findAll();
  // filter the chores to only chores for this child
  const parentChildren = children.filter(child => child.parentId === parentId);
  // respond with json of the decision's chore array
  res.json(parentChildren);
};

// find one child
exports.getOneById = (req, res) => {
  // get id from params
  const { id } = req.params;
  // search children for id
  const children = Children.findByPk(id);
  // if no id is found
  if (!children) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if id is found return data
  res.json(children);
};

// create a new child
exports.createChild = (req, res) => {
  const { name, avatar } = req.body;

  const id = Children.create({ name, avatar });

  res.json({ id });
};

// update existing child
exports.updateChild = (req, res) => {
  const { id } = req.params;
  const updatedChild = Children.update(req.body, id);
  res.json(updatedChild);
};

// delete child
exports.removeChild = (req, res) => {
  // get id
  const { id } = req.params;
  // remove child
  Children.destroy(id);
  res.sendStatus(200);
};
