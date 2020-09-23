export const binarySearch = (arr, key) => {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    // Math.floor 向下取整
    let mid = Math.floor(low + high / 2);
    if (key == arr[mid]) {
      return mid;
    } else if (key > arr[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  // 没有找到
  return 'key is not found!';
};

export default {
  binarySearch,
};
