# 设计模式
1. 很多设计模式在js中可以用高阶函数来实现

### 动态语言
1. 优点：编写代码少，简洁，更多精力放在业务逻辑上面。
2. 缺点：无法保证变量类型，运行时可能报错
3. 静态语言：编译时就能发现类型不匹配的错误

### 鸭子类型
1. 如果它走起来像鸭子，叫起来也像鸭子，那么它就是鸭子。
2. 只关心对象行为不关注对象本身
3. 一个对象若有pop和push方法，他就可以当做栈来使用，一个对象有length属性（最好还有slice和splice等方法），这个对象就可以当做数组来使用

### 多态
1. 背后的思想：将‘做什么’和‘谁去做以及怎样做’分开，也就是将‘不变的’和‘可变的’分离开来
2. 使用继承得到多态的效果，是让对象表现多态的常用手段

### 封装变化
1. 把系统中稳定不变的和容易变化的部分隔离出来
2. 在迭代过程中，只需替换那些容易变化的部分
3. 可以最大程度的保证程序的稳定性和可拓展性

### 原型模式

1. 就像吸血鬼的故事里面必然有一个吸血鬼祖先一样，每个对象都是由其他对象克隆来的，必然有一个根对象。js 中根对象为 Object.prototype
2. 原型编程基本规则
   - 所有数据都是对象
   - 要得到一个对象不是通过实例类，而是找到一个对象作为原型并克隆它
   - 对象会记住他的原型
   - 对象无法响应某个请求，他会把这个请求委托给自己的原型
3. new

```js
var objectFactory = function() {
  var obj = new Object(), // 从Object.prototype 上克隆一个空的对象
    // [].slice.call( arguments )，Array.prototype.slice.call(arguments)将arguments类数组转化成数组
    // [].shift.call( arguments )将arguments类数组转化成数组，去除第一个参数
    // 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
    Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是Person
  obj.__proto__ = Constructor.prototype; // 指向正确的原型
  var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给obj 设置属性
  return typeof ret === "object" ? ret : obj; // 确保构造器总是会返回一个对象,构造函数默返回了一个this对象
};
```

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

2. apply，call,bind
   - call()方法的作用和 apply() 方法类似，区别就是 call()方法接受的是参数列表，而 apply()方法接受的是一个参数数组
   - func.call(null, 1, 2, 3) 函数内的this是window

### 闭包（closure）

1. 变量的作用域
   - 局部变量：函数内用 var 声明的变量
   - 全局变量：函数内没有用 var 声明的变量和函数外声明的变量
2. 变量的声明周期
   - 全局变量的生命周期是永久的，除非主动销毁
   - 局部变量的生命周期随着函数调用的结束而被销毁
3. 闭包的应用（非常广泛）
   - 封装变量
   - 延长局部变量的生命周期
4. 闭包与内存管理
   - 把变量放在闭包中和放在全局，对内存方面的影响是一致的
   - 如果闭包的作用域链中保存着一些 DOM 节点，这时候可能造成内存泄漏，但这并非闭包的问题，也非 js 的问题。在 IE 浏览器，BOM，DOM 对象是使用 C++的 COM 对象方式实现的，COM 对象的垃圾回收机制采用的是引用计数策略
   - 销毁变量：将变量指向 null

### 高阶函数（hof）
1. 至少满足下列条件之一的函数
   - 函数作为参数被传递
   - 函数作为返回值输出
2. 函数作为参数传递
   - 把变化的参数放在函数参数中，分离业务中的变化与不变的部分。如 Array.prototype.sort
   - 回调函数。如异步请求
3. 函数作为输出值返回
   - 判断数据类型——可以根据鸭子类型的概念来判断，比如是否具有 length 属性，有没有 sort，slice 方法；更好的方式是通过 Object.prototype.toString 来判断
4. AOP 面向切面编程。把一些核心业务逻辑无关的功能抽离出来，如日志打印，安全控制，异常处理等。这种 AOP 的方式，也是 js 中非常特别和巧妙的装饰者模式的实现
5. hof 的其他应用
   - 函数柯里化（function currying）
   - uncurrying
   - 函数节流（函数被频繁触发）
   - 函数防抖
   - 分时函数
   - 惰性加载函数

### Single (单例)
1. 不直接new Singleton（）创建实例，而是调用函数，在函数中做缓存只实例化一次。
2. 有一些对象，我们往往只需要一个，比如线程池，全局缓存，window对象等
3. 惰性单例：在合适的时候才创建对象，并且只创建一个
4. 项目中引入第三方库时，重复多次加载库文件时，全局只会实例化一个库对象，如 jQuery，lodash，moment ..., 其实它们的实现理念也是单例模式应用的一种
5. vuex和redux中的store

### 策略模式
1. 定义一系列的算法，业务规则，把它们一个个封装起来，并且使他们相互替换
2. 表单校验
3. 可以有效避免多重条件选择语句

### Proxy
1. 保护代理
2. 缓存代理
3. es6, proxy
4. 事件代理

### 设计原则
1. S - 单一职责：一个程序只做好一件事，相互调用，组合
2. O - 开放封闭：对扩展开放，对修改封闭
3. L - 李氏置换
4. I - 接口独立
5. D - 依赖倒置：面向接口编程

## 创建型设计模式

### Factory（工厂）

- 不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂,**只关心结果，不关心过程**， 外部不许关心内部构造器是怎么生成的，只需调用一个工厂方法生成一个实例即可；**通过工厂模式我们得到的都是对象实例或者抽象工厂**。

### Builder（建造者）

- **更关心创建对象的整个过程，甚至于创建对象的每一个细节**。将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。**客户端不必知道产品内部组成的细节，将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象**。

### Prototype

1. js 是基于原型链实现对象之间的继承，是基于对象属性或方法的**共享**，而不是对对象属性的复制。创建一个基类时，不必将每个属性和方法都放在构造函数 constructor 里面，为了提高性能，放在原型上共享。**将可复用，可共享，耗时大的从基类中提取出来放到原型中**。
2. 在 prototype 上浏览器天生给它加了一个属性：constructor（构造函数），属性值是当前函数（类）本身；
3. ES6 的 class 可以看作只是一个语法糖


### Adapte

- 适配器往往适用于两个接口不兼容的问题；

1. 在 js 中，适配两个代码库，适配前后端数据等，window.A = A = jQuery
2. 比如连接不同数据库的情况，你需要包装现有的模块接口，从而使之适配数据库

### Decorator

1. 在不改变原有类，原有接口的情况下表现的更好
   - 水可以直接喝，加上果汁更好喝
   - 手机贴不贴膜可以用，有些人就喜欢加个外壳防摔
2. es7 Decorator
   - 参数同 Object.defineProperty 参数一致
3. ES7 的 decorator，作用就是返回一个新的 descriptor，并把这个新返回的 descriptor 应用到目标方法上
4. 作用在方法上的 decorator 接收的第一个参数（target ）是类的 prototype
5. 如果把一个 decorator 作用到类上，则它的第一个参数 target 是 类本身。

### Observer
1. 观察者模式又称发布-订阅模式或消息机制，定义了一种依赖关系，解决了主题对象与观察者之间功能的耦合
2. 事件绑定
3. promise
4. nodejs 自定义事件
5. vue，react 的生命周期
6. vue wacth
7. 主题与观察者分离，不是主动触发，而是被动监听，两者解耦
8. 广泛用于异步编程中
9. mvc，mvvm都少不了观察者模式

### State

```js
if (type === "a") {
  return <A />;
}
if (type === "b") {
  return <B />;
}
if (type === "c") {
  return <C />;
}
// 多if或switch，改写成对象的形式
let obj = {
  a: <A />,
  b: <B />,
  c: <C />
};
```

### Iterator

1. 为各种数据结构提供统一的遍历接口，如 Array，Map，Set，argument，nodeList 等；
2. 必须为有序集合，object 不是
3. for...of 循环，内部实际上是调用有序集合的 Symbol.iterator 的属性方法；
4. typeof Symbol.iterator === 'function'，可遍历，调用 Symbol.iterator 可生成一个迭代器

```js
// 生成一个迭代器
let iterator = data[Symbol.iterator]();
```

### CMD（服务器）

1. Node 服务环境下，使用 commonjs 规范

```js
    var math = require(‘math‘);
　　math.add(2,3); // 5
```

2. 第二行 math.add(2, 3)，在第一行 require(‘math‘)之后运行，因此必须等 math.js 加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。 这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是 AMD 规范诞生的背景。

### AMD（浏览器）

1. 异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
2. AMD 也采用 require()语句加载模块，但是不同于 CommonJS，它要求两个参数：require([module], callback);

```js
    require([‘math‘], function (math) {
　　　　math.add(2, 3);
　　});//这里是否意味着可以有多个require异步执行，谁先加载完成就先执行自身回调？
```

3. math.add()与 math 模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD 比较适合浏览器环境

### ES6 模块

1. ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
2. ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
3. ES6 模块之中，顶层的 this 指向 undefined，即不应该在顶层代码使用 this（use strict 规定）。
4. ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性

```js
// CommonJS模块
let { stat, exists, readFile } = require("fs");

// 等同于
let _fs = require("fs");
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

5. 由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

```js
// ES6模块
// 解析时立刻读取foo.js里面的代码格式正不正确
import foo from "./foo.js";
import { stat, exists, readFile } from "fs";
/*
 * 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，* 效率要比 CommonJS 模块的加载方式高。
 */
```

6. 因为 JavaScript 是没有编译动作的，这里的"编译时"，可以称为"解析时"，相对于"运行时"而言的
