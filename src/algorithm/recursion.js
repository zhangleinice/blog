
/**
 * n的阶乘
 * 1. 普通递归，会造成栈溢出
 * 2. 尾递归，不会造成栈溢出，每次执行调用栈只有一项，节约内存
 * @param {Number} n
 * @returns
 */
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
  
  factorial(5) // 120

function factorial2(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}
  
let x = factorial2(5, 1) // 120

/**
 * 斐波拉契数列 1，1，2，3，5，8，13 ...
 * 1.普通递归
 * 2.尾递归，严格模式
 * 3.记忆函数
 * @param {Number} n
 * @returns
 */
function fibonacci(n) {
    if(n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}

function fibonacci2(n, x = 1, y = 1) {
    if(n <= 1) return y
    return fibonacci(n - 1, y, x + y)
}
let y =  fibonacci2(10)


function memozi(fn) {
    let map = {}
    if(map[n] === null){
        map[n] = fn(n)
    }else{
        
    }
}