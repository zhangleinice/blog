/**
 * leetcode 703.数据流中第K大的元素
 * @method 1: 排序
 * @method 2: 小顶堆
 * 
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.k = k
    this.nums = nums
    this.minHeap = this.nums.slice(0, this.k)
    const lastArray = this.nums.slice(this.k)
    this.kMax = this.min(this.minHeap)
    for(let i = 0; i < lastArray.length; i++) {
        this.add(lastArray[i])
    }
};

KthLargest.prototype.add = function(val) {
    if(this.k > this.minHeap.length) {
        this.minHeap.push(val)
        this.kMax = this.min(this.minHeap)
        console.log(this.kMax);
        return this.kMax
    }
    if(val < this.kMax){
        console.log(this.kMax);
        return this.kMax
    }
    // 删除minHeap中最小值，并添加val 
    this.minHeap.splice(this.minHeap.indexOf(this.kMax), 1, val)
    this.kMax = this.min(this.minHeap)
    console.log(this.kMax);
    return this.kMax
};

KthLargest.prototype.min = function(nums) {
    let min = nums[0]
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] < min){
            min = nums[i]
        }
    }
    return min
}

// const arr = [4, 5, 8, 2]
// const instance = new KthLargest(3, arr)
// instance.add(3);   // returns 4
// instance.add(5);   // returns 5
// instance.add(10);  // returns 5
// instance.add(9);   // returns 8
// instance.add(4);   // returns 8

const arr = [0]
const instance = new KthLargest(2, arr)
instance.add(-1);   // returns -1
instance.add(1);    // returns 0
instance.add(-2);   // returns 0
instance.add(-4);   // returns 0
instance.add(3);    // returns 1
