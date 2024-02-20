export const HashMap = function (buckets = 16) {
  this.bucketTotal = buckets;
  this.bucketArray = new Array(buckets);
  for (let i = 0; i < buckets; i++) {
    this.bucketArray[i] = new LinkedList();
  }
};

HashMap.prototype.hash = (key) => {
  const primeNumber = 31;
  let hashCode = 0;
  let modulo = this.bucketTotal;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % modulo;
  }
};

HashMap.prototype.resize = function () {
  //Double the size of the current hashmap
  const bucketTotal = this.bucketTotal * 2;
  const newHash = new HashMap(bucketTotal);

  while (this.bucketArray.length > 0) {
    const list = this.bucketArray.pop();
    const nodes = list.getAllNodes();
    const length = nodes.length;

    for (let i = 0; i < length; i++) {
      const node = nodes[i];
      newHash.set(node[0], node[1]);
    }
  }

  this.bucketArray = newHash;
};

HashMap.prototype.getList = function (key) {
  const hashCode = this.hash(key);
  return this.bucketArray[hashCode];
};

HashMap.prototype.set = function (key, value) {
  const list = this.getList(key);
  list.set(key, value);
};

HashMap.prototype.get = function (key) {
  const list = this.getList(key);
  return list.getValue(key);
};

HashMap.prototype.has = function (key) {
  const list = this.getList(key);
  return list.contains(key);
};

HashMap.prototype.remove = function (key) {
  const list = this.getList(key);
  return list.remove(key);
};

HashMap.prototype.length = function () {
  let totalKeys = 0;
  const length = this.bucketArray.length;
  for (let i = 0; i < length; i++) {
    const list = this.bucketArray[i];
    totalKeys += list.size();
  }
  return totalKeys;
};

HashMap.prototype.clear = function () {
  this.bucketArray.forEach((list) => {
    list.clear();
  });
};

HashMap.prototype.keys = function () {
  let allKeys = [];
  this.bucketArray.forEach((list) => {
    const keys = list.getAllKeys();
    keys.forEach((key) => {
      allKeys.push(key);
    });
  });
  return allKeys;
};

HashMap.prototype.values = function () {
  let allValues = [];
  this.bucketArray.forEach((list) => {
    const values = list.getAllValues();
    values.forEach((value) => {
      allValues.push(value);
    });
  });
  return allValues;
};

HashMap.prototype.entries = function () {
  let allEntries = [];
  this.bucketArray.forEach((list) => {
    const nodes = list.getAllNodes();
    nodes.forEach((node) => {
      allEntries.push(node);
    });
  });
  return allEntries;
};

export const LinkedList = function () {
  this.headNode = null;
};

//Nullify all values in the list then disconnect the headNode so
//the list can be cleaned up by garbage collection
LinkedList.prototype.clear = function () {
  let current = this.headNode;
  while (current) {
    let temp = current.nextNode;
    current.nextNode = null;
    current = temp;
  }
  this.headNode = null;
};

//Update value if key exists or add new node to end of list
LinkedList.prototype.set = function (key, value) {
  if (!this.headNode) {
    this.headNode = node(key, value);
    return;
  }

  let current = this.headNode;
  while (current) {
    if (current.key === key) {
      current.value = value;
      return;
    }

    if (!current.nextNode) {
      current.nextNode = node(key, value);
      return;
    }
    current = current.nextNode;
  }
};

//Get total number of nodes in the list
LinkedList.prototype.size = function () {
  let length = 0;
  let current = this.headNode;

  while (current) {
    current = current.nextNode;
    length++;
  }

  return length;
};

//Return true if a node contains key, false if none is found
LinkedList.prototype.contains = function (key) {
  let next = this.headNode;
  while (next) {
    if (next.key === key) {
      return true;
    }
    next = next.nextNode;
  }
  return false;
};

//Return value of node with matching key, null if none is found
LinkedList.prototype.getValue = function (key) {
  let next = headNode;
  while (next) {
    if (next.key === key) {
      return next.value;
    }
    next = next.nextNode;
  }
  return null;
};

//Remove node matching provided key and return true, false if matching node not found
LinkedList.prototype.remove = function (key) {
  if (!this.headNode) {
    return false;
  }

  if (this.headNode.key === key) {
    this.headNode = this.headNode.nextNode;
    return true;
  }

  let current = this.headNode;
  let next = this.headNode.nextNode;

  while (next) {
    if (next.key === key) {
      current.nextNode = next.nextNode;
      next = null;
      return true;
    }
    current = next;
    next = next.nextNode;
  }

  return false;
};

//Retrieve every key from the nodes and return them in an array
LinkedList.prototype.getAllKeys = function () {
  const keys = [];
  let current = this.headNode;
  while (current) {
    keys.push(current.key);
    current = current.nextNode;
  }
  return keys;
};

//Retrieve every value from the nodes and return them in an array
LinkedList.prototype.getAllValues = function () {
  const values = [];
  let current = this.headNode;
  while (current) {
    values.push(current.value);
    current = current.nextNode;
  }
  return values;
};

//Retrieve every key-value pair from the nodes and return them in nested arrays
LinkedList.prototype.getAllNodes = function () {
  const nodes = [];
  let current = this.headNode;
  while (current) {
    nodes.push([current.key, current.value]);
    current = current.nextNode;
  }
  return nodes;
};

const node = (key = null, value = null, nextNode = null) => {
  const node = {
    key: key,
    value: value,
    nextNode: nextNode,
  };
  return node;
};
