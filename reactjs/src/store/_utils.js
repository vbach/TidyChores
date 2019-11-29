// given an object and id remove the key of the id from the object
export function removeIdFromObject(id, object) {
  // if we destructure the item we want to remove into a variable
  // and then use the spread operator to get the rest of the object
  // we have the object with out that one key
  const { [id]: removedItem, ...objectWithoutId } = object;
  return objectWithoutId;
}

// given an array of ids and id to remove, filter the array to remove all instances of that id
export function removeIdFromArray(id, array) {
  // if the itemId is not the id return true (don't remove)
  // if the itemId is the id return false (remove from array)
  return array.filter(itemId => itemId !== id);
}
