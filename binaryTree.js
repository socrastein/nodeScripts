import { sortingAlgs } from "./sortingAlgs.js";

const Node = function (value) {
  if (!value) return;
  this.value = value;
  this.left = null;
  this.right = null;
};

const BSTree = function (array) {
  //Sort array and remove all duplicate values
  const sortedArray = sortingAlgs.merge(array);
  const sortedSetArray = [...new Set(sortedArray)];
  const end = sortedSetArray.length - 1;
  this.root = buildTree(sortedSetArray, 0, end);
};

BSTree.prototype.insert = function (value) {
  if (!value) return;
  let node = this.root;
  while (node) {
    if (value === node.value) return;
    if (value <= node.value) {
      if (node.left) {
        node = node.left;
        continue;
      } else {
        node.left = new Node(value);
        return;
      }
    }
    if (value > node.value) {
      if (node.right) {
        node = node.right;
        continue;
      } else {
        node.right = new Node(value);
        return;
      }
    }
  }
};

BSTree.prototype.delete = function (value) {
  if (!value) return;

  let parent;
  let node = this.root;
  while (node) {
    if (value === node.value) break;
    if (value <= node.value) {
      if (node.left) {
        parent = node;
        node = node.left;
        continue;
      } else return null;
    }
    if (value > node.value) {
      if (node.right) {
        parent = node;
        node = node.right;
        continue;
      } else return null;
    }
  }

  //If node has no children, delete its reference from parent node
  if (!node.left && !node.right) {
    if (parent.left === node) {
      parent.left = null;
    } else parent.right = null;
    return;
  }

  //If node has one left child, switch parent reference to node's left child
  if (node.left && !node.right) {
    if (parent.left === node) {
      parent.left = node.left;
    } else parent.right = node.left;
    return;
  }

  //If node has one right child, switch parent reference to node's right child
  if (!node.left && node.right) {
    if (parent.left === node) {
      parent.left = node.right;
    } else parent.right = node.right;
    return;
  }

  //If node has two children, find smallest right child and replace node with it
  if (node.left && node.right) {
    let smallestParent;
    let smallest = node.right;
    while (true) {
      if (smallest.left) {
        smallestParent = smallest;
        smallest = smallest.left;
      } else break;
    }
    node.value = smallest.value;
    if (smallestParent && smallest.right) {
      smallestParent.left = smallest.right;
    } else node.right = smallest.right;
  }
};

BSTree.prototype.find = function (value) {
  if (!value) return;
  let node = this.root;
  while (node) {
    if (value === node.value) return node;
    if (value <= node.value) {
      if (node.left) {
        node = node.left;
        continue;
      } else return null;
    }
    if (value > node.value) {
      if (node.right) {
        node = node.right;
        continue;
      }
    } else return null;
  }
};

let root = null;

const buildTree = function (array, start, end) {
  //Base case
  if (start > end) {
    return null;
  }

  //Get middle element and make it root
  const mid = parseInt((start + end) / 2);
  const node = new Node(array[mid]);

  //Recursively construct the left subtree and make it left child of root
  node.left = buildTree(array, start, mid - 1);
  //Recursively construct the right subtree and make it right child of root
  node.right = buildTree(array, mid + 1, end);

  return node;
};

const levelOrder = function (node, callback = null, queue = []) {
  const arr = [];

  if (!callback) {
    callback = (node) => {
      arr.push(node.value);
    };
  }
  if (node === null) {
    return;
  }

  callback(node);

  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
  if (queue.length === 0) return;

  levelOrder(queue.shift(), callback, queue);

  return arr;
};

const inOrder = function (node, callback = null) {
  const arr = [];
  if (!callback) {
    callback = (node) => {
      arr.push(node.value);
    };
  }
  if (node === null) {
    return;
  }
  inOrder(node.left, callback);
  callback(node);
  inOrder(node.right, callback);

  return arr;
};

const preOrder = function (node, callback = null) {
  const arr = [];
  if (!callback) {
    callback = (node) => {
      arr.push(node.value);
    };
  }
  if (node === null) {
    return;
  }

  callback(node);
  preOrder(node.left, callback);
  preOrder(node.right, callback);

  return arr;
};

const postOrder = function (node, callback = null) {
  const arr = [];
  if (!callback) {
    callback = (node) => {
      arr.push(node.value);
    };
  }
  if (node === null) {
    return;
  }

  postOrder(node.left, callback);
  postOrder(node.right, callback);
  callback(node);

  return arr;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testTree = new BSTree(testArray);

prettyPrint(testTree.root);

console.log("In Order:");
console.log(inOrder(testTree.root));

console.log("Pre Order:");
console.log(preOrder(testTree.root));

console.log("Post Order:");
console.log(postOrder(testTree.root));

console.log("Level Order:");
console.log(levelOrder(testTree.root));

testTree.delete(8);

prettyPrint(testTree.root);
