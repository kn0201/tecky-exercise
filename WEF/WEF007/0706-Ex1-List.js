// ADT: Abstract Data Type

function newArray(size) {
  let array = Array(size);
  function getElement(index) {
    if (index >= 0 && index < size) {
      return array[index];
    } else {
      throw new Error(
        `Invalid index, should be 0 to ${size - 1}, but got: ${index}`
      );
    }
  }
  function setElement(index, value) {
    if (index >= 0 && index < size) {
      array[index] = value;
    } else {
      throw new Error(
        `Invalid index, should be 0 to ${size - 1}, but got: ${index}`
      );
    }
  }
  function getSize() {
    return size;
  }
  return {
    getElement,
    setElement,
    getSize,
  };
}

function newArrayList(size) {
  let array = newArray(size);
  let i = 0;
  function add(value) {
    if (i <= size) {
      array[i] = value;
    }
  }
  function deleteByIndex(index) {
    array.splice(index, 1);
    for (let i in array) {
      if (i === index) {
        let value = array[i];
        array.pop(value);
        console.log(array);
      }
    }
  }
  return {
    ...array,
    add,
    deleteByIndex,
  };
}

function newLinkedList() {
  let obj = new Object();
  function cons(value, next) {
    return {
      value,
      next,
    };
  }
  function getValue(index) {
    if (!obj) {
      throw new Error("List is null");
    }
    let element = obj;
    let currentIndex = 0;
    while (currentIndex !== index) {
      if (element.next) {
        element = elem.next;
      }else{
        throw new Error("Index out of bound")
      }
      currentIndex++;
    }
    return element.value;
  }
  function setValue(index, value) {
    if (!obj) {
      throw new Error("List is null");
    }
    let element = obj;
    let currentIndex = 0
    while (currentIndex !== index) {
      currentIndex++
    }

  }

  function add(value) {
    add(value) = cons(value, next);
  }
  function deleteByIndex(index) {
    // TODO
  }
  function getSize() {
    // TODO
  }
  return {
    getValue,
    setValue,
    add,
    deleteByIndex,
    getSize,
  };
}

function newStack(capacity) {
  let array = Array();
  function pushToTop(value) {
    if (array.length <= capacity) {
      array.push(value);
    }
  }
  function popFromTop() {
    array.pop();
    console.log(array);
  }
  function getSize() {
    console.log(array.length);
  }
  return {
    pushToTop,
    popFromTop,
    getSize,
  };
}

function newQueue(capacity) {
  let array = Array();
  function enqueue(value) {
    if (array.length <= capacity) {
      array.push(value);
    }else {
      throw new Error(
        `Invalid index, should be 0 to ${size - 1}, but got: ${index}`
      );
    }
  }
  function dequeue(value) {
    value = array.shift();
    console.log(array);
  }
  function getSize() {
    console.log(array.length);
  }
  return {
    enqueue,
    dequeue,
    getSize,
  };
}
