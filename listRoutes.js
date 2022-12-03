const express = require("express");
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./error')
const findItem = require('./middleware')

router.get('/', (req, res) => {
    res.json(items)
})

router.post('/', (req, res) => {
    const newItem = req.body // must add one item at a time
    items.push(newItem)
    res.status(201).json({added: newItem})
})

router.get('/:name', (req, res) => {
    const itemName = req.params.name
    const item = findItem(itemName)
    res.json(item)
})

router.patch('/:name', (req,res) => {
    const itemName = req.params.name
    const item = findItem(itemName)
    item.name = req.body.name || item.name
    item.price = req.body.price || item.price
    res.json({updated: item})
})

router.delete('/:name', (req, res) => {
    const itemName = req.params.name
    const item = items.findIndex(({ name }) => name === itemName);
    if (item === -1) {
        throw new ExpressError("Item not found", 400)
    }
    items.splice(item,1)
    res.json({message: "Deleted"})
})

module.exports = router;