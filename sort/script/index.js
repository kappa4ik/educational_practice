import bubble from "./bubble_sort.js"
import insertion from "./insertion_sort.js"
import quick from "./quick_sort.js"
import selection from "./selection_sort.js"
import { form, conc, showContainer, array } from "./env.js"

showContainer.style.display = "none";
form.addEventListener('submit', handleFormSubmit);

const errorOutput = (text) => {
  conc.innerText = text;
  showContainer.style.display = "flex";
}

const errorOutputWithArr = (text, arr) => {
  errorOutput(text);
  array.innerText = arr.join(' ');
}

const checkingArrayDimension = (numb) => {
  if(numb instanceof Number) { numb = numb.valueOf(); }
  if(numb <= 0) { return false }
  return isFinite(numb) && numb === parseInt(numb, 10);
}

const checkHex = (numb) => {
  return parseInt(numb, 10) === Number(numb);
}

const checkingArrayText = (text) => {
  const newText = text.replace(/ {2,}/gi, ' ');
  return newText !== '' ? newText : false;
}

const getArrFromText = (text) => {
  const arr = text.split(' ');
  if(arr[0] === '') { arr.shift() }
  if(arr[arr.length - 1] === '') { arr.pop() }
  return arr;
}

const checkingArrayTextElements = (text) => {
  const arr = getArrFromText(text);

  let err = [];
  let flagErr = false;

  for(let el of arr) {
    const checkNumb = checkHex(el);
    if (!checkNumb) { err = [...err, el] }
  }

  return err.length === 0 ? { flagErr: !flagErr, arr: arr } : { flagErr: flagErr, arr: err };
}

const checkingSortType = (type) => {
  const sortType = ['1', '2', '3', '4'];
  return sortType.includes(type);
}

function validationForm(elements, flag) {
  const checkDim = checkingArrayDimension(Number(elements['array_dimension'].value));
  if(!checkDim){ return errorOutput("Проверьте правильность ввода размерности массива")}

  const checkText = checkingArrayText(elements['array_text'].value);
  if(!checkText) { return errorOutput("Массив чисел был введен не верно") }

  const { flagErr, arr } = checkingArrayTextElements(checkText);
  if(!flagErr) { return errorOutputWithArr("Массив чисел должен состоять только из десятичных значений", arr) }
  if(arr.length !== Number(elements['array_dimension'].value)) { return errorOutput("Количество элементов массива не совпадает с его размерностью") }

  const checkSortType = checkingSortType(elements['array_sort'].value);
  if(!checkSortType) { return errorOutput("Не пытайтесь изменить значение в выпадающем списке") }

  return !flag;
}

const getDataForm = (elements) => {
  const arr = getArrFromText(checkingArrayText(elements['array_text'].value));
  const flagTimer = elements['array_check'].checked;
  const sort = Number(elements['array_sort'].value);

  return { array: arr, timer: flagTimer, sort: sort };
}
const sortedArrayWithTime = ({ sort, array, timer }) => {
  let object;
  switch (sort) {
    case 1:
      object = bubble(array, timer);
      break;
    case 2:
      object = selection(array, timer)
      break;
    case 3:
      object = insertion(array, timer)
      break;
    case 4:
      object = quick(array, timer)
      break;
  }
  return object
}

function handleFormSubmit(e) {
  e.preventDefault();
  const { elements } = form;
  let flag = false;

  flag = validationForm(elements, flag);
  if(!flag) { return; }

  const data = getDataForm(elements);
  const { arr, time } = sortedArrayWithTime(data);
  const text = time ? `Сортировка выполнилась за ${time} секунд` : 'Сортировка прошла успешно';
  errorOutputWithArr(text, arr);
}

module.exports = { checkHex, checkingArrayText, checkingArrayDimension };