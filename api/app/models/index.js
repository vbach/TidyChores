const uuid = require('uuid/v1');
const children = require('./children');
const chores = require('./chores');
const rewards = require('./rewards');
class Model {
  constructor(data) {
    this.values = data;
  }

  findAll() {
    return this.values;
  }

  findByPk(id) {
    return this.values.find(item => item.id === id);
  }

  create(item) {
    const id = uuid();
    this.values.push({ id, ...item });

    return id;
  }

  update(valueToChange, id) {
    // get index of item being changed
    const index = this.values.findIndex(item => item.id === id);
    // take current value and replace with any new
    const newValue = { ...this.values[index], ...valueToChange };
    // piece together array
    this.values = [
      ...this.values.slice(0, index),
      newValue,
      ...this.values.slice(index + 1)
    ];

    return newValue;
  }

  destroy(id) {
    this.values = this.values.filter(item => {
      if (item.id === id) return false;
      return true;
    });
  }
}

module.exports = {
  Children: new Model(children),
  Chores: new Model(chores),
  Rewards: new Model(rewards)
};
