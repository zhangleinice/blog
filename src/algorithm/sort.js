function quickSort(arr) {
    if(arr.length <= 1) return arr
    let center = arr.shift()
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i ++) {
        if(arr[i] < center) {
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return [...quickSort(left), center, ...quickSort(right)]
}

let arr = [1, 3, 2, 7, 5]
console.log(quickSort(arr))