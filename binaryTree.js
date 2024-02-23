import { sortingAlgs } from "./sortingAlgs.js";

const Node = function (value) {
  if (!value && value !== 0) return;
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
  if (!value && value !== 0) return;
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
  if (!value && value !== 0) return;

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
  if (!value && value !== 0) return;
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

BSTree.prototype.height = function (node) {
  if (node === null) {
    return -1;
  }
  let leftHeight = this.height(node.left);
  let rightHeight = this.height(node.right);
  return Math.max(leftHeight, rightHeight) + 1;
};

BSTree.prototype.depth = function (node) {
  let depth = 0;
  let current = this.root;

  while (current) {
    if (current === node) return depth;
    depth++;
    if (node.value <= current.value) {
      if (current.left) {
        current = current.left;
        continue;
      } else return depth;
    }
    if (node.value > current.value) {
      if (current.right) {
        current = current.right;
        continue;
      }
    } else return depth;
  }
};

BSTree.prototype.size = function () {
  return inOrder(this.root).length;
};

BSTree.prototype.isBalanced = function () {
  let balanced = true;
  const compareSubTreeHeights = (node) => {
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      balanced = false;
    }
  };
  preOrder(this.root, compareSubTreeHeights);
  return balanced;
};

BSTree.prototype.rebalance = function () {
  const treeArray = inOrder(this.root);
  const end = treeArray.length - 1;
  this.root = buildTree(treeArray, 0, end);
};

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

const createRandomArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const randInt = Math.floor(Math.random() * 100) + 1;
    arr.push(randInt);
  }
  return arr;
};

const testBST = () => {
  const testArray = createRandomArray(25);
  const tree = new BSTree(testArray);

  prettyPrint(tree.root);

  console.log(`Tree is balanced: ${tree.isBalanced()}`);

  console.log("Level order:");
  console.log(levelOrder(tree.root));

  console.log("In order:");
  console.log(inOrder(tree.root));

  console.log("Pre order:");
  console.log(preOrder(tree.root));

  console.log("Post order:");
  console.log(postOrder(tree.root));

  tree.insert(105);
  tree.insert(306);
  tree.insert(400);
  tree.insert(0)

  prettyPrint(tree.root);

  console.log(`Tree is balanced: ${tree.isBalanced()}`);
  tree.rebalance();

  prettyPrint(tree.root);

  console.log(`Tree is balanced: ${tree.isBalanced()}`);

  console.log("Level order:");
  console.log(levelOrder(tree.root));

  console.log("In order:");
  console.log(inOrder(tree.root));

  console.log("Pre order:");
  console.log(preOrder(tree.root));

  console.log("Post order:");
  console.log(postOrder(tree.root));
};

testBST();
