
/**
 * leetcode 1： sum of two numbers
 * @method 1: 暴力二重循环
 * @method 2: 一重循环
 *
 * @param {Array} nums
 * @param {Number} target
 * @returns {Array}
 */
function twoSum(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j ++) {
            if(nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
}

export const twoSum2 = (arr, target) => {
    let i, len = arr.length;
    for(i = 0; i < len; i++){
        // 不等于自身
        if(arr.indexOf(target - arr[i]) > -1 && arr.indexOf(target - arr[i]) !== i){
            return [i, arr.indexOf(target - arr[i])]
        }
    }
}