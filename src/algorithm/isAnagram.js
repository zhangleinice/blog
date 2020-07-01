/**
 * leetcode 242: 判断是否为异或词
 *
 * @method 1: 排序
 * @method 2: hashMap
 * 
 * @param {string} s
 * @param {string} t
 * @returns {boolean}
 */
function isAnagram(s, t) {
    if(s.length !== t.length) {
        return false
    }
    return s.split('').sort().join() === t.split('').sort().join()
}


function isAnagram2(s, t) {
    if(s.length !== t.length) return false
    const map = new Map()
    for(let i = 0; i < s.length; i++) {
        const getMap = map.get(s[i])
        if(getMap){
            map.set(s[i], getMap + 1)
        }else{
            map.set(s[i], 1)
        }
    }
    for(let i = 0; i < t.length; i++) {
        const getMap = map.get(t[i])
        if(getMap === 1){
            map.delete(t[i])
        }else if(getMap > 1){
            map.set(t[i], getMap - 1)
        }else{
            map.set(t[i], 1)
        }
    }
    if(map.size) {
        return false
    }
    return true
}
  