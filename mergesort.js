/**
 * algo: mergesort
 * input : arr
 * if len(arr) < 2 return arr
 * else {
 *      - mergesort left side
 *      - mergesort right side
 *      - merge the two sides
 * }
 */

function merge(arr1, arr2) {
  let temp = [];
  while (true) {
    if (!arr1 || !arr2) {
      break;
    }
    if (!arr1.length && !arr2.length) {
      break;
    } else if (arr1.length && !arr2.length) {
      temp = temp.concat(arr1);
      arr1 = [];
    } else if (!arr1.length && arr2.length) {
      temp = temp.concat(arr2);
      arr2 = [];
    } else {
      if (arr1[0] <= arr2[0]) {
        temp.push(arr1[0]);
        arr1.shift();
      } else {
        temp.push(arr2[0]);
        arr2.shift();
      }
    }
  }
  return temp;
}
function mergesort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    let left_arr = mergesort(arr.slice(0, parseInt(arr.length / 2)));
    let right_arr = mergesort(arr.slice(parseInt(arr.length / 2)));
    let result = merge(left_arr, right_arr);
    return result;
  }
}
const arr = [
  23, 54, 56, 47, 3, 2, 414, 5, 436, 36, 47, 34, 3421, 45, 68, 43, 7, 73, 2748,
  10, 29, 12, 929, 2, 92, 292, 9, 445, 3, 35, 8, 2, 384, 71, 21,
];
console.log("%coriginal array : ", "font-size: 1.3rem; color: black;");
console.log(arr);
console.log("%csorted : ", "font-size: 1.3rem; color: green;");
console.log(mergesort(arr));
