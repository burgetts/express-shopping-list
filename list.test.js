process.env.NODE_ENV = "test";

const request = require('supertest')
const app = require('./app')
let items = require('./fakeDb')

let newItem = {name: "bananas", price: .30}

beforeEach(function() {
    items.push(newItem);
  });
  
afterEach(function() {
    items.length = 0;
  });

describe('GET /items', () => {
    test('get all items', async () => {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([newItem])
    })
})

describe('GET /items/:name', () => {
  test('get specific item by name', async () => {
    const res = await request(app).get('/items/bananas')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(newItem)
  })
  test('error for invalid item', async () => {
    const res = await request(app).get('/items/pears')
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toEqual('Item not found')
  })
})

describe('POST /items', () => {
  test('create a new item', async () => {
    const res = await request(app).post('/items').send({name: 'apples', price: 1.00})
    expect(res.statusCode).toBe(201)
    expect(items.length).toEqual(2)
  })
})

describe('PATCH /items/:name', () => {
  test('change name of item', async () => {
    const res = await request(app).patch('/items/bananas').send({name:'greenBananas', price: .30})
    expect(res.body).toEqual({updated: {name: 'greenBananas', price: .30}})
  })
  test('error for invalid item', async () => {
    const res = await request(app).patch('/items/pears').send({name:'bananas', price: .45})
    expect(res.body.message).toEqual('Item not found')
  })
})

describe('DELETE /items/:name', () => {
  test('item is deleted', async () => {
    const res = await request(app).delete(`/items/${newItem.name}`)
    expect(res.body).toEqual({message: "Deleted"})
    expect(items.length).toEqual(0)
  })
  test('error for invalid item', async () => {
    const res = await request(app).delete(`/items/pears`)
    expect(res.body.message).toEqual('Item not found')
  })
})

test('returns 404 for invalid page', async () => {
  const res = await request(app).get('/tigers')
  expect(res.statusCode).toBe(404)
})