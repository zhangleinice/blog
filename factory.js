class jQuery {  //工厂
    constructor(selector) {
        super(selector)
    }
    //  ....过程
}
window.$ = function(selector) {
    return new jQuery(selector)   //结果
}





class Vnode(tag, attrs, children) {  //工厂
    //...过程
}
React.createElement = (tag, attrs, children) => {
    return new Vnode(tag, attrs, children)   //结果
}