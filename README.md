# js 基础

- [new 原理](https://github.com/zhangleinice/blog/blob/master/src/md/js/new.md)
- [解读 this](https://github.com/zhangleinice/blog/blob/master/src/md/js/this.md)
- [call 和 apply](https://github.com/zhangleinice/blog/blob/master/src/md/js/call.md)
- [bind](https://github.com/zhangleinice/blog/blob/master/src/md/js/bind.md)
- [防抖 debounce](https://github.com/zhangleinice/blog/blob/master/src/md/js/debounce.md)
- [节流 throttle](https://github.com/zhangleinice/blog/blob/master/src/md/js/throttle.md)
- [闭包](https://github.com/zhangleinice/blog/blob/master/src/md/js/closeure.md)
- [高阶函数](https://github.com/zhangleinice/blog/blob/master/src/md/js/hof.md)

# js 设计模式

- [js 中的设计模式](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattrn/composite.md)
- [单例模式](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattrn/single.md)
- [观察者模式](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattrn/observer.md)
- [组合模式](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattrn/composite.md)
- [策略模式](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattrn/strategy.md)

### Proxy

1. 保护代理
2. 缓存代理
3. es6, proxy
4. 事件代理

### Command 命令模式

1. 发送者 ==> 命令对象 ==> 接收者
2. 发布者和执行者分离，解耦
3. 宏命令：一次执行一批命令（遍历数组）
4. 撤销命令：记录上一次的值

### 模板方法模式

1. 一种基于继承的设计模式
2. 两部分组成
   - 抽象父类
   - 具体的实现子类
3. 抽象类
   - 为它的子类定义公共接口
   - 当子类继承这个抽象类时，必须重写父类的抽象方法
4. js 中没有抽象类的缺点和解决方案
   - 我们没办法保证子类会重写父类中的“抽象方法”
   - 在 java 中编译器会保证子类重写父类的抽象方法，js 却不能
   - 1，利用鸭子类型来模拟接口检查，确保子类中确实重写了父类中的方法（复杂）
   - 2，如果没有重写，则在父类抽象方法中抛出异常（简单）
5. 使用场景
   - 常被架构师用于搭建项目的框架，如 java 中 httpServlet
   - web 开发中：构建一系列的 ui 组件（1）初始化一个 div；（2）ajax 请求；（3）数据渲染到 div；（4）通知用户渲然完毕。这四步都可以抽象到父类中
6. 好莱坞原则
   - 不要来找我，我会给你打电话
   - 别调用我们，我们会调用你
   - 当我们使用模板方法时，意味着子类放弃对自己的控制权，而是改为父类通知子类，哪些方法应该在什么时候调用
   - 发布订阅；回调函数
7. 真的需要‘继承’吗？ js 是灵活的

### 享元模式（flyweight）

1. 是一种用于性能优化的模式
2. 共享内存；共享数据；在 js 中应用比较少
3. 案例
   - 事件代理

### 职责链模式

1. 概念
   - 把一系列可能会处理请求的对象被连接成一条链
   - 请求在这些对象之间依次传递，知道遇到一个可以处理他的对象
   - 这些对象成为链中的节点
2. 灵活可拆分的职责链节点
   - 自由灵活的增加，移除和修改链中的节点
   - 从性能方面考虑，要避免过长的职责链
3. 用 AOP 实现职责链（简单，巧妙）
4. 应用
   - 作用域链；原型链；事件冒泡

### 设计原则

1. S - 单一职责：一个程序只做好一件事，相互调用，组合
   - 何时分离？根据需求灵活运用
2. O - 开放封闭：对扩展开放，对修改封闭
   - 让程序一开始就遵循开放-封闭原则，并不是一件容易的事情
   - 需求排期并不是无限的，不遵循 OCP，假设变化永远不会发生，更有利于我们快速完成需求
   - 当变化发生且对我们接下来的工作造成影响时，可以再回头来封装这些变化
3. L - 李氏置换
4. I - 接口独立
5. [D - 依赖倒置：面向接口编程](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattern/接口和面向接口编程.md)

### [代码重构](https://github.com/zhangleinice/blog/blob/master/src/md/design-pattern/代码重构.md)

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
