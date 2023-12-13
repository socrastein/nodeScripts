const LinkedList = () => {
  headNode = null;

  //Get first node in list
  head = () => {
    return headNode;
  };

  //Get last node in list
  tail = () => {
    let next;
    if (headNode.nextNode) {
      next = headNode.nextNode;
    } else return headNode;

    while (next !== null) {
      next = next.nextNode;
    }
    return next;
  };

  //Add new node to beginning of list
  prepend = (value) => {
    const newHeadNode = node(value, headNode);
    headNode = newHeadNode;
  };

  //Add new node to end of list
  append = (value) => {
    tail().nextNode = node(value, null);
  };

  size = () => {
    let next;
    let length = 0;

    if (headNode) {
      next = headNode.nextNode;
      length = 1;
    } else {
      return length;
    }

    while (next !== null) {
      next = next.nextNode;
      length++;
    }
    return length;
  };

  at = (index) => {
    if (index === 0 && headNode) {
      return headNode;
    } else {
      let next = headNode;
      for (let i = 0; i < index; i++) {
        next = next.nextNode;
      }
      return next;
    }
  };

  pop = () => {
    let next;
    if (headNode.nextNode) {
      next = headNode.nextNode;
    } else headNode = null;

    //While there's another node after the next one
    while (next.nextNode.nextNode !== null) {
      next = next.nextNode;
    }
    next.nextNode = null;
  };

  contains = (value) => {
    if (headNode.value === value) {
      return true;
    } else {
      let string;
      while (next) {
        if (next.value === value) {
          return true;
        }
        next = next.nextNode;
      }
      return false;
    }
  };

  find = (value) => {
    let index = 0;
    if (headNode.value === value) {
      return index;
    } else {
      let next = headNode.nextNode;
      while (next) {
        index++;
        if (next.value === value) {
          return index;
        }
      }
      return null;
    }
  };

  toString = () => {
    let next;
    if (headNode) {
      next = headNode.next;
    } else return "List is empty!";
    let string = `(${headNode.value})`;
    while (next) {
      string += ` -> (${next.value})`;
      next = next.nextNode;
    }
    string += ` -> null`;
    return string;
  };

  insertAt = (value, index) => {
    let previous = at(index - 1);
    if (!previous) previous = tail();
    if (previous.nextNode){
        let newNode = node(value, previous.nextNode);
        previous.nextNode = newNode;
    }
  };

  removeAt = (index) => {
    let previous = at(index - 1);
    if(!previous) return;

    let node = previous.nextNode;
    if(node){
        previous.nextNode = node.nextNode;
    } 
  };

  return {
    head,
    tail,
    prepend,
    append,
    size,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

const node = (value = null, nextNode = null) => {
  const node = {
    value: value,
    nextNode: nextNode,
  };

  return node;
};
