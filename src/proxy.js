// 对象代理

// es3，闭包
{

var Person = function() {
  var data = {
    name: 'es3',
    sex: 'male',
    age: 15
  }
  this.get = function(key){
    return data[key]
  }
  this.set = function(key, value) {
    if(key !== 'sex'){
      data[key] = value
    }
  }
}

var person = new Person()
// 读取
console.table({name: person.get('name'), sex: person.get('sex'), age: person.get('age')});
// 设置
person.set('sex', 'female');
console.table({name: person.get('name'), sex: person.get('sex'), age: person.get('age')});

person.set('age', 16);
console.table({name: person.get('name'), sex: person.get('sex'), age: person.get('age')});

}
// es5,definedProperty
{

var Person = {
  name: 'es5',
  sex: 'male',
  age: 18
}
Object.defineProperty(Person, 'sex', {
  writable: false,
  value: 'male'
})
// 读取
console.table({name: Person.name, sex: Person.sex, age: Person.age});
// 设置
Person.sex = 'female';
console.table({name: Person.name, sex: Person.sex, age: Person.age});
Person.age = 20;
console.table({name: Person.name, sex: Person.sex, age: Person.age});

}

// es6, Proxy
{

let Person = {
  name: 'es6',
  sex: 'male',
  age: 20
}
let proxy = new Proxy(Person, {
  get: (target, key) => target[key],
  set(target, key, value) {
    if(key !== 'sex'){
      target[key] = value
    }
  }
})
// 读取
console.table({name: proxy.name, sex: proxy.sex, age: proxy.age});
// 设置
proxy.sex = 'female';
console.table({name: proxy.name, sex: proxy.sex, age: proxy.age});
proxy.age = 22;
console.table({name: proxy.name, sex: proxy.sex, age: proxy.age});

}





















var multAdd = function() {
    console.log(arguments);
	var res = 0;
	for (var i = 0, l = arguments.length; i < l; i++) {
		res = res + arguments[i]
	}
	return res;
};

var proxyAdd = (function() {
    var cache = {};
    console.log(arguments);
	return function() {
        var args = Array.prototype.join.call(arguments, ',');
        console.log(args);
		if(args in cache) {
			return cache[args];
        }
        console.log(arguments);
		return caches[args] = multAdd.apply(this, arguments);
	}
})();

// proxyAdd(1, 2, 3); // 6
// proxyAdd(1, 2, 3); // 6


var handler = {
    get: function(target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
  
    apply: function(target, thisBinding, args) {
      return args[0];
    },
  
    construct: function(target, args) {
      return {value: args[1]};
    }
  };
  
  var fproxy = new Proxy(function(x, y) {
    return x + y;
  }, handler);
  
  // fproxy(1, 2) // 1
//   new fproxy(1, 2) // {value: 2}
//   fproxy.prototype === Object.prototype // true
//   fproxy.foo === "Hello, foo" // true
