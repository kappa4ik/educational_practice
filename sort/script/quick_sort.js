function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

export default function quick(newArr, timer) {
  let left = 0;
  let right = newArr.length - 1;
  let index;
  if(timer) { performance.mark('start') }

  if (newArr.length > 1) {
    index = partition(newArr, left, right);
    if (left < index - 1) {
      quick(newArr, left, index - 1);
    }
    if (index < right) {
      quick(newArr, index, right);
    }
  }

  if(timer) { performance.mark('end') }
  const time = timer ? performance.measure('start', 'end').duration : false;

  return { arr: newArr, time: time };
}