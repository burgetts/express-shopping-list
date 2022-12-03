const items = require('./fakeDb')
const ExpressError = require('./error')

function findItem(itemName) {
    const item = items.find(({ name }) => name === itemName);
    if (item === undefined) {
        throw new ExpressError("Item not found", 400)
    }
    return item
}

module.exports = findItem;