const { Children } = require('../../models');

// get all children
exports.getChildren = async (req, res) => {
  // run find all function
  const children = await Children.findAll();

  res.json(children);
};

// get all children that belong to one user
exports.getUserChild = async (req, res) => {
  // get the decision id from the query
  const { parentId } = req.query;
  // filter to retrieve child for parent
  const parentChildren = await Children.findAll({ where: { parentId } });
  // respond with json of the parents's children array
  res.json(parentChildren);
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
  res.json(children);
};

// create a new child
exports.createChild = async (req, res) => {
  const { name, avatar } = req.body;

  try {
    const newChild = await Children.create({ name, avatar });
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
