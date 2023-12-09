export function duplicateArrayExceptFirstAndLast(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || i === arr.length - 1) {
      result.push(arr[i]);
    } else {
      result.push(arr[i], arr[i]);
    }
  }

  return result;
}
