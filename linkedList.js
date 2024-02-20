export const LinkedList = () => {
  let headNode = null;

  //Get first node in list
  const head = () => {
    return headNode;
  };

  //Get last node in list
  const tail = () => {
    if (!headNode) return null;
    let next;
    if (headNode.nextNode) {
      next = headNode.nextNode;
    } else return headNode;

    while (true) {
      if (next.nextNode === null) break;
      next = next.nextNode;
    }
    return next;
  };

  //Add new node to beginning of list
  const prepend = (value) => {
    const newHeadNode = node(value, headNode);
    headNode = newHeadNode;
  };

  //Add new node to end of list
  const append = (value) => {
    let last = tail();
    if (last) {
      last.nextNode = node(value, null);
    } else {
      headNode = node(value, null);
    }
  };

  const size = () => {
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

  const at = (index) => {
    if (index === 0 && headNode) {
      return headNode;
    } else {
      let next = headNode;
      for (let i = 0; i < index; i++) {
        if (next.nextNode) {
          next = next.nextNode;
        } else break;
      }
      return next;
    }
  };

  const pop = () => {
    if (!headNode) return;
    let next;
    if (headNode.nextNode) {
      next = headNode.nextNode;
    } else {
      headNode = null;
      return;
    }

    //While there's another node after the next one
    while (next.nextNode.nextNode !== null) {
      next = next.nextNode;
    }
    next.nextNode = null;
  };

  const contains = (value) => {
    if (headNode.value === value) {
      return true;
    } else {
      let next = headNode;
      while (next) {
        if (next.value === value) {
          return true;
        }
        next = next.nextNode;
      }
      return false;
    }
  };

  const containsKey = (key) => {
    if (headNode.value[0] === key) {
      return true;
    } else {
      let next = headNode;
      while (next) {
        if (next.value[0] === key) {
          return true;
        }
        next = next.nextNode;
      }
      return false;
    }
  };

  const findKey = (key) => {
    let index = 0;
    if (headNode.value[0] === key) {
      return index;
    } else {
      let next = headNode.nextNode;
      while (next) {
        index++;
        if (next.value[0] === key) {
          return index;
        }
        next = next.nextNode;
      }
      return null;
    }
  };

  const find = (value) => {
    let index = 0;
    if (headNode.value === value) {
      return index;
    } else {
      let next = headNode.nextNode;
      while (next !== null) {
        index++;
        if (next.value === value) {
          return index;
        }
        next = next.nextNode;
      }
      return null;
    }
  };

  const toString = () => {
    let next;
    if (headNode) {
      next = headNode.nextNode;
    } else return "List is empty!";
    let string = `(${headNode.value})`;

    if (next) {
      while (true) {
        string += ` -> (${next.value})`;
        next = next.nextNode;
        if (next === null) break;
      }
    }

    string += ` -> null`;
    return string;
  };

  const insertAt = (value, index) => {
    let previous = at(index - 1);
    if (previous === null) previous = tail();
    let newNode = node(value, previous.nextNode);
    previous.nextNode = newNode;
  };

  const removeAt = (index) => {
    let previous = at(index - 1);
    if (previous === null) return null;

    let node = previous.nextNode;
    if (node) {
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

const testList = () => {
  const testList = LinkedList();

  console.log(`Head: ${testList.head()}`);
  console.log(`Tail: ${testList.tail()}`);
  console.log(`Size: ${testList.size()}`);

  console.log("Appending 'First'");
  testList.append("First");
  console.log(`Head: ${testList.head().value}`);
  console.log(`Tail: ${testList.tail().value}`);
  console.log(`Size: ${testList.size()}`);

  console.log("Appending 'Second'");
  testList.append("Second");
  console.log(`Head: ${testList.head().value}`);
  console.log(`Tail: ${testList.tail().value}`);
  console.log(`Size: ${testList.size()}`);

  console.log("Appending 'Third'");
  testList.append("Third");
  console.log(`Head: ${testList.head().value}`);
  console.log(`Tail: ${testList.tail().value}`);
  console.log(`Size: ${testList.size()}`);

  console.log("List so far:");
  console.log(testList.toString());

  console.log("Prepending node 'Zeroth'");
  testList.prepend("Zeroth");
  console.log(`Head: ${testList.head().value}`);
  console.log(`Tail: ${testList.tail().value}`);

  console.log(`Size: ${testList.size()}`);
  console.log(`Node at Index 1:`);
  console.log(testList.at(1));
  console.log(`Node at Index 4:`);
  console.log(testList.at(4));
  console.log(`List contains 'Fourth': ${testList.contains("Fourth")}`);
  console.log(`List contains 'Third': ${testList.contains("Third")}`);

  console.log("Appending 'Fourth'");
  testList.append("Fourth");
  console.log(`List contains 'Fourth': ${testList.contains("Fourth")}`);
  console.log(`Size: ${testList.size()}`);

  console.log(`Find 'Second': ${testList.find("Second")}`);
  console.log(`Find 'Fifth': ${testList.find("Fifth")}`);

  console.log("List so far:");
  console.log(testList.toString());

  console.log("Inserting '2.5'");
  testList.insertAt("2.5", 3);

  console.log("List so far:");
  console.log(testList.toString());

  console.log(`Node at Index 20:`);
  console.log(testList.at(20));

  console.log("Inserting 'END'");
  testList.insertAt("END", 11);

  console.log("List so far:");
  console.log(testList.toString());

  console.log("Popping 2x nodes");
  testList.pop();
  testList.pop();
  console.log(`Tail: ${testList.tail().value}`);

  console.log(`Size: ${testList.size()}`);
  console.log("List so far:");
  console.log(testList.toString());

  console.log("Removing '2.5'");
  testList.removeAt(3);

  console.log(`Size: ${testList.size()}`);
  console.log("List so far:");
  console.log(testList.toString());

  console.log("Removing at Index 20");
  testList.removeAt(20);

  console.log(`Size: ${testList.size()}`);
  console.log("List so far:");
  console.log(testList.toString());
};
