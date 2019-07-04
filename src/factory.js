/* eslint-disable */

class jQuery {  //工厂
    constructor(selector) {
        super(selector)
    }
    //  ....过程
}
window.$ = function(selector) {
    return new jQuery(selector)   //结果
}





class Vnode  {  //工厂
    constructor(params) {
        super(params)
    }
    //...过程
}
React.createElement = (tag, attrs, children) => {
    return new Vnode(tag, attrs, children)   //结果
}