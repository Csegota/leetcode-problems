/**
 * Initialize your data structure here.
 */
var MyHashSet = function(maxLength = 1000, set = []) {
    this.set = set;
};

//Prevents duplicates from being added.
//Index = bucket 'name'?
MyHashSet.prototype.getIndex = function(key) {
    return key % this.maxLength
};

//Position = the index location of the bucket.
MyHashSet.prototype.getPos = function(key, index) {
  bucket = this.set[index]
  if (bucket === undefined) return -1 //Bucket doesn't exist yet.
  return bucket.indexOf(key)           //return index where bucket is stored.
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    index = this.getIndex(key)      //Get bucket 'name' i.e. a number in this case.
    pos = this.getPos(key, index)   //Get the index of the bucket for the given key.
    
    if (pos < 0) { //Create bucket at index if none exists, else do nothing.
        if (this.set[index] === undefined) { 
          this.set[index] = []
        }
        this.set[index].push(key) //Add key into bucket located at index.
    }
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    index = this.getIndex(key) //Get bucket identifier.
    pos = this.getPos(key, index) //Get bucket location.
    
    if (pos > -1) { //if a bucket exists at this location...
        this.set[index].splice(pos, 1) //Remove item from bucket located at set[index]
    }
};

/**
 * Returns true if this set contains the specified element 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    index = this.getIndex(key)
    pos = this.getPos(key, index)
    
    return pos > -1
};

/** 
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */