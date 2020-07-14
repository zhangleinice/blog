/**
 * @param {number[]} nums
 * @return {number[]} 
 */
var threeSum = function(nums) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            let idx = nums.indexOf(-(nums[i] + nums[j]))
            if(nums.includes(-(nums[i] + nums[j])) && idx !== i && idx !== j) {
                return [i, j, idx]
            }
        }
    }
};


export const threeSum2 = nums => {
    debugger
    nums = nums.sort((a, b) => a - b)
    let len = nums.length
    if(nums[0] > 0 && nums[len - 1] < 0) return []
    const result = []
    for(let i = 0; i < len - 2; i++) {
        let start = i + 1
        let end = len - 1
        let a = nums[i]
        while(start < end){
            if(nums[start] + nums[end] > -a) {
                console.log('右移');
                end--
            }else if(nums[start] + nums[end] < -a) {
                console.log('左移');
                start++
            }else{
                console.log('匹配');
                result.push([a, nums[start], nums[end]])
                start++
            }
        }
    }
    return result
}