const knightMoves = [
  //X,Y changes
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

const length = knightMoves.length;

const Node = function (x, y) {
  this.x = x;
  this.y = y;
  this.explored = false;
  this.previous = undefined;
};

const buildGraph = function () {
  const graph = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const square = new Node(x, y);
      graph.push(square);
    }
  }

  return graph;
};

//Return node with matching X, Y from graph array
const findNode = function (graph, x, y) {
  const l = graph.length;
  for (let i = 0; i < l; i++) {
    const node = graph[i];
    if (node.x === x && node.y === y) {
      return node;
    }
  }
  return null;
};

const getNodeArray = function (node) {
  return [node.x, node.y];
};

const getNextMoves = function (graph, start) {
  const x = start.x;
  const y = start.y;
  const moves = [];

  for (let i = 0; i < length; i++) {
    const newX = x + knightMoves[i][0];
    const newY = y + knightMoves[i][1];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const newNode = findNode(graph, newX, newY);
      moves.push(newNode);
    }
  }
  return moves;
};

const knightTravails = function (graph, start, goal) {
  const queue = [];
  start.explored = true;
  queue.push(start);

  while (queue.length > 0) {
    const root = queue.shift();
    if (root.x === goal.x && root.y === goal.y) return root;
    const nextMoves = getNextMoves(graph, root);

    nextMoves.forEach((move) => {
      if (!move.explored) {
        move.explored = true;
        move.previous = root;
        queue.push(move);
      }
    });
  }
};

const extractPathArray = function (endNode) {
    const pathArray = [[endNode.x, endNode.y]]
    while(endNode.previous){
        pathArray.unshift([endNode.previous.x, endNode.previous.y])
        endNode = endNode.previous;
    }
    return pathArray;
}

const graph = buildGraph();

const start = findNode(graph, 0, 0);
console.log(start);
const goal = findNode(graph, 7, 7);
console.log(goal);

const path = knightTravails(graph, start, goal);

console.log(extractPathArray(path));
