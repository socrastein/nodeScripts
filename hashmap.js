import { LinkedList } from "./linkedList";

const CreateHashMap = () => {

  let bucketTotal = 16;

  const hash = (key) => {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }
  
    return hashCode;
  } 

  const bucketArray = new Array(bucketTotal)
  for (let i = 0; i < bucketTotal; i++){
    bucketArray[i] = LinkedList();
  }

  const set = (key, value) => {
    const hashCode = hash(key);
    const list = bucketArray[hashCode];
    if(list.findKey(key)){

    }
  }

  const get = (key) => {
    
  }

  const has = (key) => {

  }

  const remove = (key) => {
    
  }

  const length = () => {
    
  }

  const clear = () => {
    
  }

  const keys = () => {
    
  }

  const values = () => {
    
  }

  const entries = () => {
    
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries
  }
}



