export default function bubble(newArr, timer) {
  if(timer) { performance.mark('start') }

  while(newArr.length){
    let flagSwap = false;

    for(let i = 0; i < newArr.length; i++){
      if(Number(newArr[i]) > Number(newArr[i+1])){
        const t = Number(newArr[i]);
        newArr[i] = Number(newArr[i+1]);
        newArr[i+1] = t;
        flagSwap = true;
      }
    }
    if(!flagSwap) { break }
  }

  if(timer) { performance.mark('end') }
  const time = timer ? performance.measure('start', 'end').duration : false;
  
  return { arr: newArr, time: time };
}
