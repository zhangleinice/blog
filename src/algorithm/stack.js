
/**
 * leetcode 20: 判断括号是否有效
 * @param {string} s 
 * @param {boolean}
 */
export const isValid = function(s) {
    let left = ['(', '{', '[']
    let right = [')', '}', ']']
    let arr = s.split('')
    let stack = []
    let flag = true
    let len = arr.length
    for(let i = 0; i < len; i ++) {
        if(left.includes(arr[i])){
            stack.push(arr[i])
        }else{
            let index = right.indexOf(arr[i])
            // 栈顶元素匹配
            if(stack[stack.length - 1] === left[index]){
                stack.pop()
            }else{
                flag = false
            }
        }   
    }
    return flag && !stack.length
};

/**
 * @param {string} s
 * @return {boolean}
 * 
 * @优化
 * 1. 字符串可以直接遍历
 * 2. if(len % 2) return false 减少不必要的计算
 */
export const isValid2 = function(s) {
    debugger
    let len = s.length
    //  减少不必要的计算
    if(len % 2) return false
    let stack = []
    for(let i = 0; i < len; i ++) {
        switch(s[i]){
            case '[':
            case '(':
            case '{':
                stack.push(s[i])
                break;
            case ']':
                if(stack.pop() !== '[') return false
                break;
            case ')':
                if(stack.pop() !== '(') return false
                break;
            case '}':
                if(stack.pop() !== '{') return false
                break;                                
        }
    }
    return !stack.length
};

