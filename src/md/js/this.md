### this

1. this 指向
   - 作为对象的方法调用（this 指向该对象）
   - 作为普通函数调用 （this 指向全局 windows）
   - 作为构造器使用 （构造器默认 return this 对象）
   - call，apply 调用。（几乎每次函数式语言风格都离不开 call 和 apply）

```js
window.name = "globalName";

var myObject = {
  name: "sven",
  getName: function() {
    return this.name;
  }
};

var getName = myObject.getName;
console.log(getName()); // globalName ,此时是普通函数的调用
console.log(myObject.getName()); // sven ,   此时是对象方法的调用
```
