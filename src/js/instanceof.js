function instanceofa(A, B) {
    let x = A.__proto__
    let y = B.prototype
    if(x === y) {
        return true
    }
    return false
}