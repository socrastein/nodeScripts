/**
 * Bubble sorting algorithm with O(n**2) time complexity
 * O(n) if array is already sorted
 * @param {array} array Takes an array of numbers for sorting
 * @returns {array} Returns sorted array
 */
const bubbleSort = (array) => {
  let length = array.length;
  let sorting = true;

  while (sorting) {
    //End loop if entire array is iterated through without swapping any values,
    //i.e. it's already sorted
    sorting = false;

    for (let i = 0; i < length; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        //At least 1 value was out of place, so keep looping through until it's sorted
        sorting = true;
      }
    }
  }

  return array;
};

/**
 * Selection sorting algorithm with O(n**2) time complexity
 * @param {array} array Takes an array of numbers for sorting
 * @returns {array} Returns sorted array
 */
const selectionSort = (array) => {
  const sorted = [];

  while (array.length) {
    let min = array[0];
    let minDex = 0;

    for (let i = 1; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i];
        minDex = i;
      }
    }
    array[minDex] = array[0];
    array.shift();
    sorted.push(min);
  }

  return sorted;
};

/**
 * Merge sorting recursive algorithm with O(n log n) time complexity
 * @param {array} array Takes an array of numbers for sorting
 * @returns
 */
const mergeSort = (array) => {
  if (array.length === 1) {
    return array;
  }

  let mid = array.length / 2;
  let left = array.slice(0, mid);
  let right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (leftArray, rightArray) => {
  const sorted = [];

  while (leftArray.length && rightArray.length) {
    if (leftArray[0] < rightArray[0]) {
      sorted.push(leftArray.shift());
    } else {
      sorted.push(rightArray.shift());
    }
  }
  return [...sorted, ...leftArray, ...rightArray];
};

export const sortingAlgs = {
  bubble: bubbleSort,
  selection: selectionSort,
  merge: mergeSort,
};
