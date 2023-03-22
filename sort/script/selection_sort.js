const findSmallestPosition = (arr, startPos, arrLen) => {
  let smallPos = startPos;
  for(let i = startPos; i < arrLen; i++){
    if(arr[i] < arr[smallPos]){
      smallPos = i;
    }
  }
  return smallPos;
}

export default function selection(newArr, timer) {
  if(timer) { performance.mark('start') }

  for(let i = 0; i < newArr.length; i++){
    let smallPos = findSmallestPosition(newArr, i, newArr.length);
    const t = newArr[i];
    newArr[i] = newArr[smallPos];
    newArr[smallPos] = t;
  }

  if(timer) { performance.mark('end') }
  const time = timer ? performance.measure('start', 'end').duration : false;

  return { arr: newArr, time: time };
}