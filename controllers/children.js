const { Children } = require('../models');

// get all children
exports.getChildren = async (req, res) => {
  // get the parent id from the query
  // run find all function
  const children = await Children.findAll({ where: { parentId: req.user } });

  res.json(children).sendStatus(200);
};

// find one child
exports.getOneById = async (req, res) => {
  // get id from params
  const { id } = req.params;
  // search children by id
  const children = await Children.findByPk(id);
  // if no id is found
  if (!children) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if id is found return data
  res.json(children).sendStatus(200);
};

// create a new child
exports.createChild = async (req, res) => {
  const { name, avatar, parentId } = req.body;

  try {
    const newChild = await Children.create({ name, avatar, parentId });
    // return to add parentId from url once user is setup
    res.json({ id: newChild.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update existing child
exports.updateChild = async (req, res) => {
  const { id } = req.params;
  try {
    const [, [updatedChild]] = await Children.update(req.body, {
      where: { id },
      returning: true
    });

    res.json(updatedChild);
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete child
exports.removeChild = async (req, res) => {
  // get id
  const { id } = req.params;
  // remove child
  await Children.destroy({ where: { id } });
  res.sendStatus(200);
};
