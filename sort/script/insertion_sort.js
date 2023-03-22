export default function insertion(newArr, timer) {
  if(timer) { performance.mark('start') }

  for (let i = 1, l = newArr.length; i < l; i++) {
    const current = newArr[i];
    let j = i;
    while (j > 0 && newArr[j - 1] > current) {
      newArr[j] = newArr[j - 1];
      j--;
    }
    newArr[j] = current;
  }

  if(timer) { performance.mark('end') }
  const time = timer ? performance.measure('start', 'end').duration : false;

  return { arr: newArr, time: time };
}