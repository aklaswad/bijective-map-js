"use strict"
const BMap = require('BijectiveMap')
const assert = require('assert').strict;

assert.throws(
  () => {
    const bmap = new BMap([
      ['foo', 1],
      ['bar', 1]
    ])
    return true
  },
  Error,
  'BijectiveMap constructor thow errors'
)


assert.throws(
  () => {
    bmap.set('fuz', 1)
    return true
  },
  Error,
  'BijectiveMap constructor thow errors'
)

const bmap = new BMap([
  [ 'foo', 1 ],
  [ 'bar', 2 ]
])

assert.equal(bmap.get('foo'), 1)
assert.equal(bmap.rget(1), 'foo')

assert.throws(
  () => {
    bmap.set('foo', 1)
    return true
  },
  Error,
  'BijectiveMap will throw error for dupe entry'
)

assert.throws(
  () => {
    bmap.set('foo', 3)
    return true
  },
  Error,
  'BijectiveMap will throw error for dupe entry'
)

assert.throws(
  () => {
    bmap.set('buz', 1)
    return true
  },
  Error,
  'BijectiveMap will throw error for dupe entry'
)

assert.equal(bmap.size, 2)
bmap.set('buz', 3)
assert.equal(bmap.get('buz'), 3)
assert.equal(bmap.rget(3), 'buz')

assert.equal(bmap.size, 3)

bmap.delete('buz')

assert.equal(bmap.size, 2)

