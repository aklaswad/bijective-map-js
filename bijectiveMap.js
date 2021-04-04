class BijectiveMap extends Map {
  constructor (iterable) {
    super(iterable)
    if ( !this.reverseMap ) {
      // As of current nodejs, set() was called before here,
      // from `super(iterable)`. So this block will not be executed
      this.reverseMap = new Map()
      for ( const [k,v] of this.entries() ) {
        if ( this.reverseMap.has(v) ) {
          // Throw exception if dupe was found
          throw new Error('BijectiveMap do not allow surjective seed at constructor. Value "' + v + '" is referenced from at least 2 keys')
        }
        this.reverseMap.set(v, k)
      }
    }
  }

  clear () {
    super.clear()
    this.reverseMap.clear()
  }

  delete (key) {
    const v = this.get(key)
    const res = super.delete(key)
    if (res) {
      this.reverseMap.delete(v)
    }
    return res
  }

  set (key, value) {
    // It seems some Map() implementation calls `set` while constuctor works
    if ( !this.reverseMap ) {
      this.reverseMap = new Map()
    }

    if ( this.has(key) ) {
      throw new Error('BijectiveMap does not allow set for existing key. The key "' + key + '" already exists.')
    }
    if ( this.reverseMap.has(value) ) {
      throw new Error('BijectiveMap does not allow set for existing value. The value "' + value + '" already exists.')
    }
    this.reverseMap.set(value, key)
    super.set(key, value)
    return this
  }

  rget (key) {
    return this.reverseMap.get(key)
  }

  getKeyOf (value) {
    return this.reverseMap.get(value)
  }

  exists (value) {
    return this.reverseMap.has(value)
  }
}

module.exports = BijectiveMap
