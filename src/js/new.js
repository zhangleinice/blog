function objectFactory() {
    var obj = new Object();
    var Constructor = [].shift.call( arguments );
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply( obj, arguments );
    return typeof ret === 'object' ? ret : obj;
};

// 因为 new 是关键字，所以无法像 bind 函数一样直接覆盖，所以我们写一个函数，命名为 objectFactory，来模拟 new 的效果。
// 1. 用new Object() 的方式新建了一个对象 obj
// 2. 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
// 3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
// 4. 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
// 5. 我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。


//  Array.prototype.shift.call(arguments);  
// 将  arguments内数组转化成数组，去除arguments第一个参数，this指向arguments所在数组